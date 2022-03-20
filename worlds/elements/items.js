// Create item/resource types

import w from '@/model/World'
import Item from '@/model/Items'

export default function import_items() {
	
	w.items['Trees'] = new Item('Trees','🌲')
	w.items['Trees'].quantities = [
		{
			above: 1,
			adjective: 'Sparse'
		},
		{
			above: 100,
			adjective: 'Copse'
		},
		{
			above: 5000,
			adjective: 'Small forest'
		},
		{
			above: 50000,
			adjective: 'Significant forest'
		},
		{
			above: 500000,
			adjective: 'Vast forest'
		}
	]
	
	w.items['Stone'] = new Item('Stone')
	w.items['Stone'].quantities = [] // ie just show numbers
	
}
