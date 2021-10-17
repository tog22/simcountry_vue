// Move auction functions here

export default class Auction {
	auction_round							= 1
	do_new_round 							= true
	do_new_bidding_round 					= true
	increase_highest_bid					= false
	do_purchasing_round 					= false
	do_price_premium_round 					= false
	bid_price_has_fallen_below_offer_price	= false
	done_price_premium_round 				= false
	original_offers_to_keep_quantities
	highest_bid_so_far
						
	constructor (offers) {
		this.original_offers_to_keep_quantities = [...offers[good_name]]
		this.highest_bid_so_far	= offers[good_name][0].min_asking_price
	}
	
	auction_a_good (bids, offers) {
		
	}
}