import Market from '@/aspects/market'

import _ from 'lodash'


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
				quantity: 	bids[i].quantity, 
				max_bid: 	bids[i].max_bid,
				buyer: 		bids[i].buyer,
				filled:		false
			});
		}
		
	}
	
	auction_good () {
	
		// console.log('*** AUCTION ROUND ***')
		
		if (this.invalid_auction_check()) {
			return
		}
		
		this.correct_offer_quantities()
		this.find_price_to_pay()
		this.make_purchases()
		
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
	
	
	/*  PERFORMED BEFORE WE START PROCESSING OFFERS:
	** 
	**  Adjust the offer quantity down to match the
	**  building's inventory, in case its gone down
	**  since the offer, eg. from a farmer eating his
	**  own food.
	*/
	correct_offer_quantities() {
		let good = this.good
		let good_name = good
		let bids = this.locale.bids[good]
		let offers = this.locale.offers[good]
		
		for (var bid of bids) {
			
			if (bid.quantity === 0) {
				continue // …to the next bid
			}
			
			for (var offer of offers) {
				if (offer.seller.inventory[good] < offer.quantity) {
					offer.seller.inventory[good] = offer.quantity
				}
			}
			
		}
	}
	
	find_price_to_pay() {
		
		let l = function (tolog) { console.log(tolog) }
		
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
			// l(bids[i].buyer.name+"'s bid "+i+' evaluated to find price =')
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
				if ((amount_to_buy * offer.min_asking_price) < bids[i].buyer.coins) {
					
					// Simulate buying by reducing the quantities in the clones of bids & offers
					bids[i].buyer.coins -= (amount_to_buy * offer.min_asking_price)
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
			// console.log('bid '+i)
			// l(bids[i])
			if (!bids[i].filled) {
				
				// console.log('!bids[i].filled, for bid '+i)
				this.unfilled_bid = i
				
				if (i === 0) {
					// console.log('nof')
					this.no_offers_filled = true
				}
				
				break // Stop at the first incomplete bid
				
			}
			
		}
		
		if (this.unfilled_bid && !this.no_offers_filled) {
			
			this.price_to_pay = bids[this.unfilled_bid].max_bid
			// console.log('beaten max bid was:')
			// console.log(this.price_to_pay)
			
			/* TODO - ideally, check whether the last filled bid can afford to go 1 over the unfilled_bid's max_bid. But this seems like complicated maths, probably.
			let cheapest_filled_bid = bids[(this.unfilled_bid - 1)]
			if (cheapest_filled_bid.buyer.coins >= (formula to work out)) {}
			*/
			
		}
	}
	
	make_purchases() {
		
		let l = function (to_log) { console.log(to_log) }
		
		let good = this.good
		let good_name = good
		let bids = this.locale.bids[this.good]
		let offers = this.locale.offers[this.good]
		
		for (var i in bids) {
			
			let bid = bids[i]
			// l(bid.buyer.name+' - seeing IF to purchase for bid '+i)
			// l(bid)
			
			if (this.unfilled_bid && i === this.unfilled_bid) {
				// console.log('not making purchase for bid '+i)
				break // The below process would find there's no inventory anyway
			} else {
				bid.filled = true // may not be true until a later offer, but will be eventually
				// l('YES, purchase for bid '+i)
				// l(bid)
			}
			
			
			
			for (var offer of offers) {
				
				if (bid.quantity <= 0) {
					break // …out of considering offers
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
				// console.log('***Purchase made')
				// console.log('offer quant reduced by '+amount_to_buy,' leaving offer as follows:')
				// console.log(offer)
				// console.log(bid.buyer.name+' pays '+this.price_to_pay+' coins, leaving him with '+bid.buyer.coins)
				if (bid.buyer.coins < 0) {
					// console.log("!!!!!! ERROR: negative money")
				}
				// console.log('Farm now has '+offer.seller.inventory[good_name] )
				// console.log('_____ END PURCHASE ______')
				
				// // l('bid & offer after A purchase')
				// // l(bid)
				// // l(offer)
				
			}
			
		}
	}
}
