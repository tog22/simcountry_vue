import w from '@/model/World'
import Market from '@/aspects/market'

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
		this.bids[good].push({
			quantity: quantity, 
			max_bid: max_bid,
			buyer: buyer
		});
	}
	
	offer(good, quantity, min_asking_price, seller) {
		if (this.offers[good] === undefined) {
			this.offers[good] = []
		}
		this.offers[good].push({
			quantity: quantity, 
			min_asking_price: min_asking_price,
			seller: seller
		});
	}
	
	resolve_bids() {
		old_buggy_resolve_bids()
	}
	
	 {
		for (var good_name in this.offers) {
			this.offers[good_name].sort(this.rank_offers)
		}
		
		for (var good_name in this.bids) {
			
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
			
			this.bids[good_name].sort(this.rank_bids)
			
			// ↓ The 3 lines below keep track as the auction price gets bid up, bid-by-bid (in the bids for loop below)
			let do_new_round_of_bids = false
			let highest_bid_so_far = this.offers[good_name][0].min_asking_price;
			let original_offers_to_keep_quantities = [...this.offers[good_name]]
			
			let while_loop_count = 1
			
			// ↓ Repeat while (do_new_round_of_bids && while_loop_count < 20)
			do {
				
				while_loop_count++
				if (while_loop_count === 20) {
					alert('Temporary measure to avoid infinite while loop triggered, by auction hitting a 20 round limit')
				}
				
				for (var bid of this.bids[good_name]) {
					/* ↑ We loop through bids until either:
							1) They fall below asking prices
								(in which case we _end_ the bidding for loop)
							OR
							2) There's insufficient quantity to fill them 
								(in which case we _restart_ the bidding for loop, via do_new_round_of_bids=true)
								*/
					
					let bid_price_has_fallen_below_offer_price = false;
					
					if (bid.quantity === 0) {
						continue // …to the next bid
					}
					
					for (var offer of this.offers[good_name]) {
						
						// ↓ ASIDE: Adjust the offer quantity down to match the building's inventory, in case its gone down since the offer, eg. from a farmer eating his own food
						if (offer.seller.inventory[good_name] < offer.quantity) {
							offer.seller.inventory[good_name] = offer.quantity
						}
						
						if (offer.min_asking_price <= bid.max_bid) {
							
							if (highest_bid_so_far < offer.min_asking_price) {
								highest_bid_so_far = offer.min_asking_price
							}
							
							var amount_to_buy = (offer.quantity < bid.quantity) ? offer.quantity : bid.quantity;
							
							//////////////////////////////////
							// console.log('_____ START LOOP ______')
							// console.log('Farm starts loop with '+offer.seller.inventory[good_name] )
							// console.log('Bidder starts loop with '+bid.buyer.coins)
							// console.log('The farm has an offer to sell '+offer.quantity+', amount to buy is '+amount_to_buy+', bid & offer deets below')
							// console.log(bid)
							// console.log(offer)
							//////////////////////////////////
							
							/* ↓ Only try buying if buyer can afford the whole order
									(It _might_ make sense to change this later) */
							if ((amount_to_buy * highest_bid_so_far) > bid.buyer.coins) {
								
								console.log(this.bid.buyer.name+" can't afford to keep bidding")
								// ↓ Stop trying to fill this bid, move onto the next one
								break // the loop through offers on this bid (continue parent loop through other bids)
							}
							
							
							/************************************
							**  Buy, as all checks have passed **
							************************************/
							
							// If it 
							if (offer.quantity < bid.quantity) {
								
								console.log('POTENTIAL increase in bid')
								do_new_round_of_bids = true
								// ↑ Because it seems like there _might_ be insufficient offer quantity.
								//
								// But it gets set to false if we're buying sufficient offer quantity from a later offer in the loop, then checked after the whole loop through all offers.
								
							} else {
								
								console.log('CANCEL potential increase in bid')
								do_new_round_of_bids = false
								
							}
							
							offer.quantity -= amount_to_buy
							bid.quantity -= amount_to_buy
							offer.seller.inventory[good_name] -= amount_to_buy
							bid.buyer.inventory[good_name] += amount_to_buy
							bid.buyer.coins -= offer.min_asking_price
							////////
							console.log('***Purchase made')
							console.log('offer quant reduced by '+amount_to_buy,' leaving offer as follows:')
							console.log(offer)
							console.log(bid.buyer.name+' pays '+offer.min_asking_price+' coins, leaving him with '+bid.buyer.coins)
							if (bid.buyer.coins < 0) {
								console.log("!!!!!! ERROR: negative money")
							}
							console.log('Farm now has '+offer.seller.inventory[good_name] )
							// console.log('_____ END LOOP ______')
							/////////
							if (bid.quantity <= 0) {
								
								// ↓ Stop trying to fill this bid, but move onto the next bid
								break // the loop through offers on this bid (continue parent loop through other bids)
								
							}
							
						} else {
							
							// ↓ Stop trying to fill bids altogether
							bid_price_has_fallen_below_offer_price = true
							
							break  // the loop through offers on this bid 
						}
						
					}
					console.log ('END loop through offers on this bid')
					
					if (do_new_round_of_bids) {
						
						highest_bid_so_far += 1
						
						console.log('CONFIRMED potential increase in bid')
						console.log('Increase in bid to '+highest_bid_so_far+', from the following offer on the following bid');
						console.log(offer)
						console.log(bid)
						
					}
					
					if (bid_price_has_fallen_below_offer_price) {
						break  // the loop through _all_ bids
					}
				}
				console.log ('END 1 loop through bids on this good')
				
			} while (do_new_round_of_bids && while_loop_count < 20);
			console.log ('END all loops through bids on this good; while_loop_count ='+while_loop_count)
			
			// TODO: do `locale.price_history[good_name] = []` when creating the first building that outputs this good
			// this.price_history[good_name].push({
			// 	day:	w.day,
			// 	price:	highest_bid_so_far
			// })
		}
		
		console.log('=== Bids resolved ===')
	}
	
	rank_bids(a, b) {
		if ( a.max_bid > b.max_bid ){
			return 1;
		}
		if ( a.max_bid < b.max_bid ){
			return -1;
		}
		return 0;
	}
	
	rank_offers(a, b) {
		if ( a.min_asking_price < b.min_asking_price ){
			return 1;
		}
		if ( a.min_asking_price > b.min_asking_price ){
			return -1;
		}
		return 0;
	}
}