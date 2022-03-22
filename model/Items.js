import jQuery from 'jquery'

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
	
	luxury_levels = {}
	/* ↑ Example:
		{
			1: 'Coarse clothing',
			2: 'Comfortable clothing',
			3: 'Ornate clothing'
		}
	*/
	
	properties = {}
	
	constructor(name, type = 'generic', icon = null)
	{
		this.name = name;
		this.type = type;
		if (!icon) {
			this.icon = '<span class="icon s_emoji">*️⃣</span>'
		} else if (icon.includes('.')) {
			this.icon = '<span class="icon s_image"><img src="graphics/items/'+icon+'" /></span>';
		} else if (icon) {
			this.icon = '<span class="icon s_emoji">*️⃣</span>'
		}
	}
}