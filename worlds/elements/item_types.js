// Create item/resource types

import w from '@/model/World'
import Type from '@/model/Item_Type'

export default function import_item_types() {
	
	w.types['resource'] = new Type(
		'resource', 
		{
			origin: {} // 'natural'/'crafted'
		}
	)
	
	w.types['food'] = new Type(
		'food',
		{
			nutrition: {}, // num
			luxury: {} // num
		}
	)
	
}