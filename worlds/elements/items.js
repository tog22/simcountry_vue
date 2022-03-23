// Create item/resource types

import w from '@/model/World'
import Item from '@/model/Items'

export default function import_items() {

	
	w.items['Trees'] = new Item('Trees', 'resource', '🌲')
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
	
	let stone = w.items['Stone'] = new Item('Stone', 'resource', 'stone.png')
	{
		stone.quantities = [] // ie just show numbers
	}
	
	let oats = w.items['Oats'] = new Item('Oats', 'food', '🌾');
	{
		oats.nutrition = 2
		oats.luxury = 1
	}
	
	let apples = w.items['Apples'] = new Item('Apples', 'food', '🍎')
	{
		apples.nutrition = 4
		apples.luxury = 3
	}
	
	let grapes = w.items['Grapes'] = new Item('Grapes', 'food', '🍇')
	{
		grapes.nutrition = 2
		grapes.luxury = 6
	}
	
	// 🍷
	//w.items['Wine'] = new Item('Wine', 'drink')
	
	/**********************************************
	// 🍞 Bread (& wheat)
	
	let wheat = w.items['Wheat'] = new Item('Wheat', 'food intermediate',  '🌾') ***TODO: create food intermediate type
	w.items['Bread'] = new Item('Bread', 'food', '🍞')
	
	**********************************************/
	
	let corn = w.items['Corn'] = new Item('Corn', 'food', '🌽')
}

let l = function (to_log) { 
	console.log(to_log) 
}

let lo = l
