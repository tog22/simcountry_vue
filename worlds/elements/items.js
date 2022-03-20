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
	
	w.items['Wheat'] = new Item('Wheat')
	w.items['Wheat'].type = 'food'
	w.items['Bread'] = new Item('Bread')
	w.items['Bread'].type = 'food'
	w.items['Apples'] = new Item('Apples')
	w.items['Apples'].type = 'food'
	w.items['Grapes'] = new Item('Grapes')
	w.items['Grapes'].type = 'food'
	w.items['Wine'] = new Item('Wine')
	w.items['Wine'].type = 'food'
	w.items['Corn'] = new Item('Corn')
	w.items['Corn'].type = 'food'
}
