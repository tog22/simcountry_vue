export default class Building {
	oid
	parent_locale
	type
	custom_name
	inventory = {}
	
	constructor(parent_locale, type)
	{
		let w = window.world;
		this.oid = w.next;
		w.next++;
		w.c++;
		
		this.parent_locale = parent_locale;
		this.type = type;
	}
	
	/*
	display() {
		show_info_box(this.oid);
		show_on_map(this.oid);
		this.render();
	}
	
	render() {
		let html = '';
		if (!_.isEmpty(this.inventory)) {
			html += show_hash(this.inventory, 'Inventory');
		}
		$('#o'+this.oid+' .ct').html(html);
	}
	
	update() {
		// Convert inputs to outputs
		this.operate();
		// Finally, render
		this.render();
	}
	
	operate() {
		// Fetch resources
		/* For now, from the locale's base resources. Later, from (a) not-too-far locales (for lumbermills, unless each locale has a woodchopper instead); or (b) other buildings; or (c) - a special case of (b) - trading posts/ports, which record local demand then fetch it. *//*
		// Find locale
		let locale = w.objects[this.parent_locale];
		// Find resources to fetch from the locale
		let to_fetch = w.biztypes[this.type].inputs;
		// Check if locale has enough of each resource needed
		let sufficient_resources_check = true;
		for (var resource_name_index in to_fetch) {
			let amount_needed = to_fetch[resource_name_index];
			if (!locale.resources[resource_name_index]) {
				sufficient_resources_check = false;
			} else if (locale.resources[resource_name_index] < amount_needed) {
				sufficient_resources_check = false;
			}
		}
		// If so, move the resources from the locale to the business
		if (sufficient_resources_check) {
			// Subtract the resources from the locale
			for (var resource_name_index in to_fetch) {
				locale.resources[resource_name_index] -= to_fetch[resource_name_index];
			}
			// Add the output resources to the business
			let to_output = w.biztypes[this.type].outputs;
			for (var item_name_index in to_output) {
				if (this.inventory[item_name_index]) {
					this.inventory[item_name_index] += to_output[item_name_index];
				} else {
					this.inventory[item_name_index] = to_output[item_name_index];
				}
			}
		}
	}
	*/
}