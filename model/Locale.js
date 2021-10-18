import w from '@/model/World'

import Market from '@/aspects/market'
import A from '@/aspects/auction'
import Person from '@/model/Person'

let l = function (to_log) { 
	console.log(to_log) 
}

export default class Locale {
	oid
	name
	
	resources = {}
	aspects = {}
	
	buildings = []
	dwellings = []
	people = []
	bids = {}
	offers = {}
	unmet_bids = {}
	unmet_offers = {}
	price = {}
	price_history = {}
	
	population
	active_population
	
	constructor() { 
		this.oid = w.next;
		w.next++;
		w.latest++;
		
		this.population = 0
		this.active_population = 0
	}
	
	update() {
		this.operate()
	}
	
	operate() {
		// Reset bids & offers
		this.unmet_bids = {...this.bids}
		this.unmet_offers = {...this.offers}
		this.bids = {}
		this.offers = {}
		
		for (var building_id of this.buildings) {
			let building = w.objects[building_id]
			building.operate()
		}
		for (var person of this.people) {
			person.seek_food()
		}
		this.resolve_bids()
		for (var person of this.people) {
			person.eat_food()
		}
	}
	
	seek(good, quantity, max_bid, buyer) {
		// TODO - add labour as a special case
		if (this.bids[good] === undefined) {
			this.bids[good] = []
		}
		// l('seek max_bid arg = '+max_bid+'; results in:')
		this.bids[good].push({
			quantity: 	quantity, 
			max_bid: 	max_bid,
			buyer: 		buyer,
			filled:		false
		});
		// l(this.bids[good][(this.bids[good].length - 1)])
	}
	
	offer(good, quantity, min_asking_price, seller) {
		if (this.offers[good] === undefined) {
			this.offers[good] = []
		}
		this.offers[good].push({
			quantity: 			quantity, 
			min_asking_price: 	min_asking_price,
			seller: 			seller
		});
	}
	
	resolve_bids() {
		
		for (var good_name in this.offers) {
			this.offers[good_name].sort(this.rank_offers)
			// l(this.offers[good_name])
			this.correct_offer_quantity(good_name)
			// l(this.offers[good_name])
			// l('fDFFDFF')
		}
		
		
		for (var good_name in this.bids) {
			this.bids[good_name].sort(this.rank_bids)
			let Auction = new A(good_name, this)
			Auction.auction_good()
		}
		
	}
	
	correct_offer_quantity(good_name) {
		
		/* PERFORMED BEFORE THE FIRST BIDDING ROUND ON THIS OFFER:
		   
		   Adjust the offer quantity down to match the building's inventory, in case its gone down since the offer, eg. from a farmer eating his own food
		↓  */
		
		for (var i in this.offers[good_name]) {
			if (this.offers[good_name][i].seller.inventory[good_name] < this.offers[good_name][i].quantity) {
				this.offers[good_name][i].quantity = this.offers[good_name][i].seller.inventory[good_name]
			}
		}
		
	}
	
	person_bids_on_current_offer(bid, offer, good_name, auction_tracker) {
		
		if (offer.min_asking_price > bid.max_bid) {
			
			// ↓ We currently don't  anything with this
			// TODO low - decide if we want to
			auction_tracker.bid_price_has_fallen_below_offer_price = true
			
			return // …out of person_bids_on_current_offer(); the same person then bids on the next offer.
			
		} else {
			
			if (auction_tracker.highest_bid_so_far < offer.min_asking_price) {
				// !!!!!!!
				// TODO - MAYBE change this logic, cos highest_bid_so_far MAY get set needlessly high by expensive offers later on in the loop
				// l('(NB: logic MAY need change) Highest_bid_so_far upped to offer.min_asking_price of '+ offer.min_asking_price)
				auction_tracker.highest_bid_so_far = offer.min_asking_price
			}
			
			if (offer.quantity <= 0) {
				// l('_____ SKIP THIS LOOP (as this offer has no quantity available) _____')
				return // …out of person_bids_on_current_offer(); the same person then bids on the next offer.
			}
			
			var amount_to_buy = (offer.quantity < bid.quantity) ? offer.quantity : bid.quantity;
			
			//////////////////////////////////
			// l('_____ START LOOP ______')
			// l('Farm starts loop with '+offer.seller.inventory[good_name] )
			// l('Bidder starts loop with '+bid.buyer.coins)
			// l('The farm has an offer to sell '+offer.quantity+' food, of which the buyer wants to buy '+amount_to_buy+', bid & offer deets below')
			// l(bid)
			// l(offer)
			//////////////////////////////////
			
			/* ↓ Only match the last bid if buyer can afford the whole order
					(It _might_ make sense to change this later - pos TODO ) */
			if ((amount_to_buy * auction_tracker.highest_bid_so_far) > bid.buyer.coins) {
				
				// l(bid.buyer.name+" can't afford to keep bidding, pruning them")
				
				// ↓ Remove the bidder from future rounds
				this.bids[good_name] = this.bids[good_name].filter(
					function(bid_to_check) { 
						return bid_to_check.buyer.name != bid.buyer.name; 
					}
				);
				// ↓ Stop trying to fill this bid, move onto the next one
				return // …out of person_bids_on_current_offer(); the same person then bids on the next offer.
			}
			
			
			
			
			// ↓ If it seems like there _might_ be insufficient offer quantity…
			if (offer.quantity < bid.quantity) {
				// …and we could afford to increase the bid…
				if
				(
					(
						amount_to_buy 
						* 
						(auction_tracker.highest_bid_so_far + 1)
					)
					>
					bid.buyer.coins
				) {
					// …then provisionally note to do so
					
					// l('POTENTIAL increase in bid')
					auction_tracker.increase_highest_bid = true
					// ↑ This is provisional because it gets reset to false if we're buying sufficient offer quantity from a later offer in the loop, then checked after the whole loop through all offers.
					// ↓
				}
			} else {
				// l('CANCEL potential increase in bid')
				auction_tracker.increase_highest_bid = false
			}
			
			/************************************
			**  Buy, as all checks have passed **
			************************************/
			
			// offer.quantity -= amount_to_buy
			// bid.quantity -= amount_to_buy
			// offer.seller.inventory[good_name] -= amount_to_buy
			// bid.buyer.inventory[good_name] += amount_to_buy
			// bid.buyer.coins -= offer.min_asking_price
			// ////////
			// // l('***Purchase made')
			// // l('offer quant reduced by '+amount_to_buy,' leaving offer as follows:')
			// // l(offer)
			// // l(bid.buyer.name+' pays '+offer.min_asking_price+' coins, leaving him with '+bid.buyer.coins)
			// if (bid.buyer.coins < 0) {
			// 	// l("!!!!!! ERROR: negative money")
			// }
			// // l('Farm now has '+offer.seller.inventory[good_name] )
			// // l('_____ END LOOP ______')
			/////////
			
			if (bid.quantity <= 0) {
				
				// TODO - [low] Stop trying to fill this bid, but move onto the next bid
				// Optional because even if this bid keeps looping through offers it'll never buy any with bid.quantity 0
				
			}
			
		}
		
		// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// TODO - at very end here, see whether to set
		// auction_tracker.do_new_bidding_round = true
	}
	
	person_offers_price_premium (bid, offer, good_name, auction_tracker) {
		// l('offering price premium if they can')
		auction_tracker.done_price_premium_round = true
		// ↑ This is duplicated by every bidder in the round, but that's OK because it's only checked at the end of the round, at which point the do_purchasing_round flag is set for the start of the next round
	}
	
	person_purchases_winning_bids (bid, offer, good_name, auction_tracker) {
		// l('making purchases')
	}
	
	rank_bids(a, b) {
		if ( a.max_bid > b.max_bid ){
			return -1;
		}
		if ( a.max_bid < b.max_bid ){
			return 1;
		}
		return 0;
	}
	
	rank_offers(a, b) {
		if ( a.min_asking_price < b.min_asking_price ){
			return -1;
		}
		if ( a.min_asking_price > b.min_asking_price ){
			return 1;
		}
		return 0;
	}
}