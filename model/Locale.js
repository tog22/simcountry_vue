import w from '@/model/World'

import Market from '@/aspects/market'
import A from '@/aspects/auction'
import Person from '@/model/Person'

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
	trend_population
	
	constructor() { 
		this.oid = w.next;
		w.next++;
		w.latest++;
		
		this.population = 0
		this.active_population = 0
		this.trend_population = 0
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
		this.bids[good].push({
			quantity: 	quantity, 
			max_bid: 	max_bid,
			buyer: 		buyer,
			filled:		false
		});
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
		}
		
		for (var good_name in this.bids) {
			this.bids[good_name].sort(this.rank_bids)
			let Auction = new A(good_name, this)
			Auction.auction_good()
			
		}
		
		// Old, archived approach:
		// this.old_style_auction()
		
		console.log('=== Bids resolved ===')
	}
	
	old_style_auction() {
		
		console.log('In disabled_old_style_auction')
		
		for (var good_name in this.bids) {
			
			this.bids[good_name].sort(this.rank_bids)
			
			let auction_tracker = {
				
				do_new_round: 							true,
				increase_highest_bid:					false,
				do_new_bidding_round: 					true,
				do_price_premium_round: 				false,
				done_price_premium_round:				false,
				do_purchasing_round: 					false,
				bid_price_has_fallen_below_offer_price:	false,
				original_offers_to_keep_quantities:		[...this.offers[good_name]],
				highest_bid_so_far:	
									this.offers[good_name][0].min_asking_price,
			}
			
			// ↓ Check that there are both bids and offers
			if (this.offers[good_name] === undefined) {
				continue // …to the next good
			}
			if (
				Market.quantity_is_0(this.bids[good_name]) 
				|| 
				Market.quantity_is_0(this.offers[good_name])
			) {
				continue
			}
			
			console.log('→L1→→→→→ A LOOP THROUGH GOODS BEING BID ON')
			let auction_round = 1
			
			// ↓ Repeat while (auction_tracker.do_new_round && auction_round < 20)
			do { // L2 ////////
				
				// ↓ Presume there's no new bidding round after this one, unless we find that one is needed
				auction_tracker.do_new_bidding_round = false;
				
				console.log('→→L2→→→→ AN INSTANCE OF DO LOOP THROUGH AN AUCTION ROUND')
				// ↓ This auction round's loop through bidders 
				for (var bid of this.bids[good_name]) { // L3 ////////
					/* ↑ We loop through bids until either:
							1) They fall below asking prices
								(in which case we _end_ the bidding for loop)
							OR
							2) There's insufficient quantity to fill them 
								(in which case we _restart_ the bidding for loop, via auction_tracker.do_new_bidding_round=true)
								*/
					
					console.log('→→→L3→→→ A LOOP THROUGH BIDS')
					console.log("…this loop's bidder being "+bid.buyer.name+', details below:')
					console.log(bid.buyer)
					
					
					if (bid.quantity === 0) {
						continue // …to the next bid
					}
					
					
					
					/***********************************
					**								  **
					**  THE DIFFERENT TYPES OF ROUND  **
					**								  **
					***********************************/
					
					// ↓ This bidder's loop through offers, in this auction round
					for (var offer of this.offers[good_name]) { // L4 ////////
						
						console.log('____L4__ LOOP THROUGH OFFERS')
						console.log('BUG POSSIBILITY - Bid may have been filtered out, here it is:')
						console.log(bid)
						
						if (auction_round === 1) {
							this.correct_offer_quantity(offer, good_name)
						}
						
						if (auction_tracker.do_new_bidding_round) {
							
							this.person_bids_on_current_offer(bid, offer, good_name, auction_tracker)
						}
						
						if (auction_tracker.do_price_premium_round) {
							this.person_offers_price_premium(bid, offer, good_name, auction_tracker)
						}
						
						if (auction_tracker.do_purchasing_round) {
							this.person_purchases_winning_bids(bid, offer, good_name, auction_tracker)
						}
						
						
					} // END L4 for(offer) loop for a single bidder
					console.log ('END L4 loop through offers on this bid')
					
					/**********************************/
					
					
					
					/* ↓ Increase bid if appropriate
							(I.e. if, after this bidders's gone through all offers, they didn't find inventory left over after earlier bidders' purchases at the current highest bid */
					if (auction_tracker.increase_highest_bid) {
						
						auction_tracker.do_new_bidding_round = true
						auction_tracker.increase_highest_bid = false
						// ↑ Reset, not actually needed in current logic, there in case logic changes
						
						console.log('CONFIRMED potential increase in bid, will get set after all bidders have finished this round')
						
					}
				} // END L3 for(bid), going through 1 bidder in 1 auction round
				console.log ('END 1 L3 loop through  1 bidder in 1 auction round')
				
				
				// ↓ Work out which round to do next
				if (auction_tracker.do_new_bidding_round) {
					auction_tracker.highest_bid_so_far += 1
					/* ↑ If it's a new bidding round, up the bid by just 1, to give everyone the chance to match it 
						(Including early bidders, so they consistently get first dibs in case of equal bids.) */
				} else if (!auction_tracker.done_price_premium_round) {
					auction_tracker.do_price_premium_round = true
				} else {
					auction_tracker.do_purchasing_round
				}
				
				// ↓ Record whether doing a next round
				if (auction_tracker.do_new_bidding_round || auction_tracker.do_price_premium_round || auction_tracker.do_purchasing_round) {
					auction_tracker.do_new_round = true;
				} else {
					auction_tracker.do_new_round = false;
				}
				
				auction_round++
				if (auction_round === 20) {
					alert('Temporary measure to avoid infinite while loop triggered, by auction hitting a 20 round limit')
				}
				
			} while (auction_tracker.do_new_round && auction_round < 20);
			console.log ('END L2 do() loop through all loops through bids on this good (ie END AUCTION); auction_round ='+auction_round)
			
			// TODO: do `locale.price_history[good_name] = []` when creating the first building that outputs this good
			// this.price_history[good_name].push({
			// 	day:	w.day,
			// 	price:	auction_tracker.highest_bid_so_far
			// })
			
		}
	}
	
	correct_offer_quantity(offer, good_name) {
		
		/* PERFORMED BEFORE THE FIRST BIDDING ROUND ON THIS OFFER:
		   
		   Adjust the offer quantity down to match the building's inventory, in case its gone down since the offer, eg. from a farmer eating his own food
		↓  */
		
		if (offer.seller.inventory[good_name] < offer.quantity) {
			offer.seller.inventory[good_name] = offer.quantity
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
				console.log('(NB: logic MAY need change) Highest_bid_so_far upped to offer.min_asking_price of '+ offer.min_asking_price)
				auction_tracker.highest_bid_so_far = offer.min_asking_price
			}
			
			if (offer.quantity <= 0) {
				console.log('_____ SKIP THIS LOOP (as this offer has no quantity available) _____')
				return // …out of person_bids_on_current_offer(); the same person then bids on the next offer.
			}
			
			var amount_to_buy = (offer.quantity < bid.quantity) ? offer.quantity : bid.quantity;
			
			//////////////////////////////////
			console.log('_____ START LOOP ______')
			console.log('Farm starts loop with '+offer.seller.inventory[good_name] )
			console.log('Bidder starts loop with '+bid.buyer.coins)
			console.log('The farm has an offer to sell '+offer.quantity+' food, of which the buyer wants to buy '+amount_to_buy+', bid & offer deets below')
			console.log(bid)
			console.log(offer)
			//////////////////////////////////
			
			/* ↓ Only match the last bid if buyer can afford the whole order
					(It _might_ make sense to change this later - pos TODO ) */
			if ((amount_to_buy * auction_tracker.highest_bid_so_far) > bid.buyer.coins) {
				
				console.log(bid.buyer.name+" can't afford to keep bidding, pruning them")
				
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
					
					console.log('POTENTIAL increase in bid')
					auction_tracker.increase_highest_bid = true
					// ↑ This is provisional because it gets reset to false if we're buying sufficient offer quantity from a later offer in the loop, then checked after the whole loop through all offers.
					// ↓
				}
			} else {
				console.log('CANCEL potential increase in bid')
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
			// console.log('***Purchase made')
			// console.log('offer quant reduced by '+amount_to_buy,' leaving offer as follows:')
			// console.log(offer)
			// console.log(bid.buyer.name+' pays '+offer.min_asking_price+' coins, leaving him with '+bid.buyer.coins)
			// if (bid.buyer.coins < 0) {
			// 	console.log("!!!!!! ERROR: negative money")
			// }
			// console.log('Farm now has '+offer.seller.inventory[good_name] )
			// console.log('_____ END LOOP ______')
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
		console.log('offering price premium if they can')
		auction_tracker.done_price_premium_round = true
		// ↑ This is duplicated by every bidder in the round, but that's OK because it's only checked at the end of the round, at which point the do_purchasing_round flag is set for the start of the next round
	}
	
	person_purchases_winning_bids (bid, offer, good_name, auction_tracker) {
		console.log('making purchases')
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