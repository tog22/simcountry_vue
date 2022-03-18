import Market from '@/aspects/market'

//import l from '@/aspects/debug'
let l = function (to_log) { 
	console.log(to_log) 
}

let log_x_if_y_is_z = function (to_log, y, z) { 
	if (y === z) {
		console.log('For '+z+':')
		console.log(to_log) 
	}
}

export default class A {
	locale
	
	good
	price_to_pay
	no_offers_filled
	
	unfilled_bid							= false
	
	offers_clone							= []
	bids_clone								= []
	auction_round							= 1
	do_new_round 							= true
	do_new_bidding_round 					= true
	increase_highest_bid					= false
	do_purchasing_round 					= false
	do_price_premium_round 					= false
	bid_price_has_fallen_below_offer_price	= false
	done_price_premium_round 				= false
						
	constructor(good, locale) {
		this.good = good
		this.locale = locale
		this.price_to_pay = this.locale.offers[this.good][0].min_asking_price
	}
	
	clone_order_book() {
		
		let offers = this.locale.offers[this.good]
		for (var i = 0; i < offers.length; i++) {
			this.offers_clone.push({
				quantity: 			offers[i].quantity, 
				min_asking_price: 	offers[i].min_asking_price,
				seller: 			offers[i].seller
			});
		}
		
		let bids = this.locale.bids[this.good]
		for (var i = 0; i < bids.length; i++) {
			this.bids_clone.push({
				quantity: 		bids[i].quantity, 
				max_bid: 		bids[i].max_bid,
				buyer_coins: 	bids[i].buyer.coins,
				buyer_name:		bids[i].buyer.name,
				buyer_ref:		bids[i].buyer,
				filled:			false
			});
		}
		
	}
	
	auction_good () {
	
		// l('*** AUCTION ROUND ***')
		if (this.good === 'Food') {
			// l('FOOOOOOOOOOD')
		}
		if (this.invalid_auction_check()) {
			return
		}
		
		this.find_price_to_pay()
		// l('~~~~~~~~ MAKE PURCHASES ~~~~~~~')
		this.make_purchases()
		// l('*********** END AUCTION ROUND ***********')
	}
	
	invalid_auction_check() {
		let l = this.locale
		
		if (l.offers[this.good] === undefined) {
			return true
		} else if (
			Market.quantity_is_0(l.bids[this.good]) 
			|| 
			Market.quantity_is_0(l.offers[this.good])
		) {
			return true
		} else {
			return false
		}
	}
	
	find_price_to_pay() {
		
		
		
		// Set and reset variables
		this.clone_order_book()
		let bids = this.bids_clone
		let offers = this.offers_clone
		let good_name = this.good
		let good = good_name
		var last_offer_filled
		
		// l('=== START FINDING PRICE ===')
		for (var i in bids) {
			// l('______________')
			// l(bids[i].buyer_name+"'s bid "+i+' evaluated to find price =')
			// l(bids[i])
			for (var offer of offers) {
				
				
				// l(offer)
				if (offer.quantity === 0) {
					continue //…to the next offer
				}
				
				if (offer.min_asking_price > bids[i].max_bid) {
					continue
				}
				
				
				// Set amount_to_buy
				let amount_to_buy = (offer.quantity < bids[i].quantity) ? offer.quantity : bids[i].quantity;
				
				/* ↓ Buyer'd only buy if he can afford everything he wants to buy
					(It _might_ make sense to change this later to let a building gain partial input inventory, though probably not. This is the cheapest offer, so there's no way it can get enough inputs.) */ 
				if ((amount_to_buy * offer.min_asking_price) < bids[i].buyer_coins) {
					
					// Simulate buying by reducing the quantities in the clones of bids & offers
					if (bids[i].buyer_name === 'Donkbert') {
						// l('Simulating buy, num coins before = '+bids[i].buyer_coins)
					}
					bids[i].buyer_coins -= (amount_to_buy * offer.min_asking_price)
					bids[i].quantity -= amount_to_buy
					offer.quantity -= amount_to_buy
					
					last_offer_filled = offer
					
					if (bids[i].quantity <= offer.quantity) {
						// l('filled for i = '+i)
						bids[i].filled = true
					}
					
				} 
				
			}
			
		}
		
		// Now, see if we need to increase price_to_pay above the minimum asking price, because there are incomplete orders we need to outbid
		
		this.no_offers_filled = false
		
		for (var i in bids) {
			// l('bid '+i)
			// l(bids[i])
			if (!bids[i].filled) {
				
				// l('!bids[i].filled, for bid '+i)
				this.unfilled_bid = i
				
				if (i === 0) {
					// l('nof')
					this.no_offers_filled = true
				}
				
				break // Stop at the first incomplete bid
				
			}
			
		}
		
		if (this.unfilled_bid && !this.no_offers_filled) {
			
			this.price_to_pay = bids[this.unfilled_bid].max_bid
			// l('beaten max bid was:')
			// l(this.price_to_pay)
			
			/* TODO - ideally, check whether the last filled bid can afford to go 1 over the unfilled_bid's max_bid. But this seems like complicated maths, probably.
			let cheapest_filled_bid = bids[(this.unfilled_bid - 1)]
			if (cheapest_filled_bid.buyer.coins >= (formula to work out)) {}
			*/
			
		}
	}
	
	make_purchases() {
		
		
		
		let good = this.good
		let good_name = good
		let bids = this.locale.bids[this.good]
		let offers = this.locale.offers[this.good]
		
		for (var i in bids) {
			
			let bid = bids[i]
			if (bid.buyer.name === 'Donkbert') {
				// l('{{{{{{{{{ Donkbert makes purchase }}}}}}')
			}
			// l(bid.buyer.name+' - seeing IF to purchase for bid '+i)
			// l(bid)
			
			if (this.unfilled_bid && i === this.unfilled_bid) {
				// l('not making purchase for bid '+i)
				break // The below process would find there's no inventory anyway
			} else {
				bid.filled = true // may not be true until a later offer, but will be eventually
				// l('YES, purchase for bid '+i)
				// l(bid)
			}
			
			
			
			for (var offer of offers) {
				
				if (bid.quantity <= 0) {
					break // …out of // considering offers
				}
				
				if (offer.quantity <= 0) {
					continue // …to next offer
				}
				
				let amount_to_buy = (offer.quantity < bid.quantity) ? offer.quantity : bid.quantity;
				
				offer.quantity -= amount_to_buy
				bid.quantity -= amount_to_buy
				offer.seller.inventory[good_name] -= amount_to_buy
				bid.buyer.inventory[good_name] += amount_to_buy
				bid.buyer.coins -= this.price_to_pay
				////////
				// l('***Purchase made')
				// l('offer quant reduced by '+amount_to_buy,' leaving offer as follows:')
				// l(offer)
				// l(bid.buyer.name+' pays '+this.price_to_pay+' coins, leaving him with '+bid.buyer.coins)
				if (bid.buyer.coins < 0) {
					// l("!!!!!! ERROR: negative money")
				}
				// l('Farm now has '+offer.seller.inventory[good_name] )
				// l('_____ END PURCHASE ______')
				
				// l('bid & offer after A purchase')
				// l(bid)
				// l(offer)
				
			}
			
		}
	}
}