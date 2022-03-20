// Create item/resource types

import w from '@/model/World'
import Item from '@/model/Item_Types'

export default function import_item_types() {
	
	w.item_types['food'] = new Item_Type('food')
	w.item_types['food'].properties = [
		'nutrition_value',
		'luxury_level'
	]
}