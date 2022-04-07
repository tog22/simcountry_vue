import jQuery from 'jquery'
import w from '@/model/World'
import index from '@/worlds/index'
// import vw from '@/model/VanillaWorld'

export default class Item {
	name
	type
	icon
	quantities = []
	/* ↑ Example:
		[
			{
				above: 1,
				adjective: 'Sparse'
			},
			{
				above: 100,
				adjective: 'A copse of'
			}
		]
	*/
	
	properties = {}
	
	constructor(name, type = 'generic', icon = null)
	{
		
		this.name = name;
		this.type = type;
		
		// Old debugging:
		// console.log(w)
		// console.log('< wubba world || vw >')
		// console.log(vw)
		
		let type_properties = w.types[type].properties
		
		for (var name_of_prop in type_properties) {
			this.properties[name_of_prop] = null
		}
		
		// Set icon
		
		if (!icon) {
			this.icon = '<span class="icon s_emoji">*️⃣</span>'
		} else if (icon.includes('.')) {
			this.icon = '<span class="icon s_image"><img src="graphics/items/'+icon+'" /></span>';
		} else if (icon) {
			this.icon = '<span class="icon s_emoji">*️⃣</span>'
		}
		
		// Create indexes, for things that need them
		
		switch (type) {
			case 'food':
				index.food[name] = true
				break;
			default:
				break;
		}
		
	}
}