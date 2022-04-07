/**************************
***************************
**						 **
**  LOAD STARTING WORLD  **
**						 **
***************************
**************************/

import w from '@/model/World'
import Locale from '@/model/Locale'
import Building from '@/model/Building'
import Building_Type from '@/model/Building_Type'
import Person from '@/model/Person'

import import_items from '@/worlds/elements/items'
import import_item_types from '@/worlds/elements/item_types'
import import_building_types from '@/worlds/elements/buildings'

import testing_values from '@/worlds/testing_values'

export default function create_world() {
	
	import_item_types()
	import_items()
	import_building_types()
	
	w.objects[w.next] = new Locale();
	w.cl = w.cvl = w.cll = w.latest; // currently loading locale - for businesses etc. within it
	let locale = w.objects[w.cl];
	locale.name = 'Murwood Forest';
	locale.resources['Trees'] = 2000000;
	locale.resources['Stone'] = 100;
	locale.aspects['soil quality'] = 2; 
	// ↑ 2 above = displayed quality of 100 = (x-1)*100 = (2-1)*100
	
	
	/**************************************
	**
	**    Create starting buildings  
	**
	**************************************/
	
	var building
	
	// Lumber Mills
	
	let pioneer_lumberjacks = w.objects[w.next] = new Building(w.cll, 'Lumber Mill', 2, 'Donkbert');
	pioneer_lumberjacks.inventory['Food'] = {};
	pioneer_lumberjacks.inventory["Food"]['Oats'] = 2; 
	// ↑ For starting Lumber Mill only
	
	if (testing_values.lumberjack_overload) {
		w.objects[w.next] = new Building(w.cll, 'Lumber Mill', 14, 'Lavish Joe');
		w.objects[w.next] = new Building(w.cll, 'Lumber Mill', 10, 'Rich Albert');
		w.objects[w.next] = new Building(w.cll, 'Lumber Mill', 6, 'Comfortable Joshbert');
	}
	
	w.objects[w.next] = new Building(w.cll, 'Farm', 1, 'Frank');
	w.objects[w.next] = new Building(w.cll, 'Quarry', 2, 'Martin');
	
}