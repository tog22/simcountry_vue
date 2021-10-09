import w from '../model/World.js'

export default class Building {
	oid
	parent_locale
	type
	custom_name
	inventory = {}
	
	constructor(parent_locale, type)
	{
		this.oid = w.next;
		w.next++;
		w.latest++;
		this.parent_locale = parent_locale;
		w.objects[parent_locale].children.push(this.oid);
		
		this.type = type;
		this.custom_name = "Frank's "+type
		
	}
	
	update() {
		// Convert inputs to outputs
		this.operate();
	}
	
	operate() {
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
		
		// Find inputs to fetch from the locale
		let inputs_to_fetch = w.btypes[this.type].resource_inputs;
		// Check if locale has enough of each resource needed
		let sufficient_inputs_check = true;
		for (var resource_name_index in inputs_to_fetch) {
			let amount_needed = inputs_to_fetch[resource_name_index];
			if (!locale.inputs[resource_name_index]) {
				sufficient_inputs_check = false;
			} else if (locale.inputs[resource_name_index] < amount_needed) {
				sufficient_inputs_check = false;
			}
		}
		if (!sufficient_inputs_check) {
			console.log('insuffic inputs')
		}
		
		/***************
		** FETCH BOTH **
		****************/
		
		// If so, subtract the resources from the locale, and move the inputs to the building
		if (sufficient_resources_check && sufficient_inputs_check) {
			// Subtract the resources from the locale
			for (var resource_name_index in resources_to_fetch) {
				locale.resources[resource_name_index] -= resources_to_fetch[resource_name_index];
			}
			// Add the output resources to the business
			let to_output = w.btypes[this.type].outputs;
			for (var item_name_index in to_output) {
				if (this.inventory[item_name_index]) {
					this.inventory[item_name_index] += to_output[item_name_index];
				} else {
					this.inventory[item_name_index] = to_output[item_name_index];
				}
			}
		}
	}
}