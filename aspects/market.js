const Market = {
	test_if_is_accessible: 'Market object is accessible',
	
	quantity_is_0: function (bids_or_asks) {
		
		for (var entry of bids_or_asks) {
			if (entry.quantity > 0) {
				return false
			}
		}
		
		// Otherwise…
		return true
	}
}

export default Market;