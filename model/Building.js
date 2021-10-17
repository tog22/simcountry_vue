import w from '@/model/World'
import Person from '@/model/Person'

export default class Building {
	oid
	parent_locale
	type
	custom_name
	inventory = {}
	speed_auction_inventory = {}
	owner
	salary
	coins
	costs
	
	constructor(parent_locale, type, salary, owner_name = 'Josiah')
	{
		this.oid = w.next
		w.next++
		w.latest++
		
		this.type = type
		this.salary = salary
		this.parent_locale = parent_locale
		let locale = w.objects[parent_locale]
		locale.buildings.push(this.oid)
		
		// Create an owner each time, for now
		// To do: switch to draw from pool of existing people, and create demand for new immigrants if wages are internationally competitive
		let building_owned = this
		this.owner = new Person(locale, owner_name, building_owned)
		
		this.custom_name = owner_name+"'s "+type
		
		this.costs = 1
		
	}
	
	operate() {
		// console.log(this.custom_name+' operating')
		this.pay_people()
		
		/********************
		** RESOURCES CHECK **
		********************/
		
		/* For now, only from the locale's resources. Later, from not-too-far locales (for lumber mills, unless each locale has its own lumber mill (possibly renamed to a woodchopper, which produces 'logs' which a more advanced lumber mill building process into 'lumber'). */
		
		// Find locale
		let locale = w.objects[this.parent_locale];
		// Find resources to fetch from the locale
		let resources_to_fetch = w.btypes[this.type].resource_inputs;
		// Check if locale has enough of each resource needed
		let sufficient_resources_check = true;
		for (var resource_name_index in resources_to_fetch) {
			let amount_needed = resources_to_fetch[resource_name_index];
			if (!locale.resources[resource_name_index]) {
				sufficient_resources_check = false;
			} else if (locale.resources[resource_name_index] < amount_needed) {
				sufficient_resources_check = false;
			}
		}
		if (!sufficient_resources_check) {
			console.log('insuffic resources')
		}
		
		/*****************
		** INPUTS CHECK **
		******************/
		
		/* For now, from other buildings in the locale. Later, from not-too-far locales, or profitably close locales, after accounting for transport costs.This inter-locale trade could be conducted via a special type of buildings, namely trading posts/ports, which record local demand then fetch it. */
		
		let inputs_to_fetch = w.btypes[this.type].inputs;
		let outputs_to_make = w.btypes[this.type].outputs;
		
		// Check if locale has enough of each input needed
		let sufficient_inputs_check = true;
		for (var input_name_index in inputs_to_fetch) {
			let amount_needed = inputs_to_fetch[input_name_index];
			
			if (!locale.inputs[input_name_index]) {
				sufficient_inputs_check = false;
			} else if (locale.inputs[input_name_index] < amount_needed) {
				sufficient_inputs_check = false;
			}
		}
		if (!sufficient_inputs_check) {
			console.log('insuffic inputs')
		}
		
		/***********************************
		** FETCH BOTH & PRODUCE INVENTORY **
		************************************/
		
		// If so, subtract the resources from the locale, and move the inputs to the building
		if (sufficient_resources_check && sufficient_inputs_check) {
			// Subtract the resources from the locale
			for (var resource_name_index in resources_to_fetch) {
				locale.resources[resource_name_index] -= resources_to_fetch[resource_name_index];
			}
			// Add the output resources to the business
			for (var output_name in outputs_to_make) {
				if (this.inventory[output_name]) {
					this.inventory[output_name] += outputs_to_make[output_name];
				} else {
					this.inventory[output_name] = outputs_to_make[output_name];
				}
				////////
				// if (this.type === 'farm') {
				// 	console.log('Farm produces 3? food, inventory is now'+this.inventory[output_name])
				// }
				///////
			}
		}
		
		/*****************************************
		** MAKE OUTPUTS AVAILABLE TO THE MARKET **
		******************************************/
		for (var output_name in outputs_to_make) {
			if (this.inventory[output_name] !== undefined) {
				if (this.inventory[output_name] > 0) {
					locale.offer(output_name, this.inventory[output_name], (this.costs + 1), this)
					////////
					// if (this.type === 'farm') {
					// 	console.log('**** Farm has and offers '+this.inventory[output_name])
					// }
					///////
				}
			}
		}
		
	}
	
	pay_people() {
		this.owner.coins += this.salary
		// console.log(this.owner.name+' paid '+this.salary+' coins')
		
		//  TODO: subtract coins from building when paying people
		// 			(may require making at least lumber mills gain profit, first through a hardcoded profit from nowhere, then through an export market, which gets sold to only once all domestic bids have been gone through)
	}
}