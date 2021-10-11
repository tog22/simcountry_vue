import w from '../model/World.js'

export default class Locale {
	oid
	name
	
	resources = {}
	aspects = {}
	
	buildings = []
	dwellings = []
	people = []
	bids = {}
	asks = {}
	unmet_bids = {}
	unmet_asks = {}
	
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
		// Reset bids & asks
		this.unmet_bids = {...this.bids}
		this.unmet_asks = {...this.asks}
		this.bids = {}
		this.asks = {}
		
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
	
	offer(good, quantity, min_ask, seller) {
		if (this.asks[good] === undefined) {
			this.asks[good] = []
		}
		this.asks[good].push({
			quantity: quantity, 
			min_ask: min_ask,
			seller: seller
		});
	}
	
	resolve_bids() {
		for (var good_name in this.asks) {
			this.asks[good_name].sort(this.rank_asks)
		}
		
		for (var good_name in this.bids) {
			this.bids[good_name].sort(this.rank_bids)
			if (this.asks[good_name] !== undefined) {
				for (var bid of this.bids[good_name]) {
					let bids_have_fallen_below_asks = false;
					for (var ask of this.asks[good_name]) {
						// Adjust the ask quantity down to match the building's inventory, in case its gone down since the ask, eg. from a farmer eating his own food
						if (ask.seller.inventory[good_name] < ask.quantity) {
							ask.seller.inventory[good_name] = ask.quantity
						}
						if (ask.min_ask <= bid.max_bid) {
							var amount_to_buy = (ask.quantity < bid.quantity) ? ask.quantity : bid.quantity;
							// ↓ TODO - change below to reflect auctioned rather than min ask price
							if ((amount_to_buy * ask.min_ask) > bid.buyer.coins) {
								// Stop trying to fill this bid, but move onto the next bid
								break
							}
							//////
							// console.log('_____ START LOOP ______')
							// console.log('bidders starts loop with '+bid.buyer.coins)
							// console.log('Farm starts loop with '+ask.seller.inventory[good_name] )
							// console.log('The farm has an ask to sell '+ask.quantity+', amount to buy is '+amount_to_buy+', bid & ask deets below')
							// console.log(bid)
							// console.log(ask)
							///////
							ask.quantity -= amount_to_buy
							bid.quantity -= amount_to_buy
							ask.seller.inventory[good_name] -= amount_to_buy
							bid.buyer.inventory[good_name] += amount_to_buy
							bid.buyer.coins -= ask.min_ask
							////////
							// console.log('ask quant reduced by '+amount_to_buy,' leaving ask as follows:')
							// console.log(ask)
							// console.log(bid.buyer.name+' pays '+ask.min_ask+' coins, leaving him with '+bid.buyer.coins)
							// if (bid.buyer.coins < 0) {
							// 	console.log("!!!!!! ERROR: negative money")
							// }
							// console.log('Farm now has '+ask.seller.inventory[good_name] )
							// console.log('_____ END LOOP ______')
							/////////
							if (bid.quantity <= 0) {
								// Stop trying to fill this bid, but move onto the next bid
								break
							}
							
						} else {
							// Stop trying to fill bids altogether
							bids_have_fallen_below_asks = true
							break
						}
						
					}
					if (bids_have_fallen_below_asks) {
						break
					}
				}
			}
		}
		
		/*********************************/
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
	
	rank_asks(a, b) {
		if ( a.min_ask < b.min_ask ){
			return 1;
		}
		if ( a.min_ask > b.min_ask ){
			return -1;
		}
		return 0;
	}
}