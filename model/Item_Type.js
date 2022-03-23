export default class Item_Type {
	
	name
	properties
	luxury_levels = {}
	/* ↑ Example:
		{
			1: 'Coarse clothing',
			2: 'Comfortable clothing',
			3: 'Ornate clothing'
		}
	*/
	
	constructor(name, properties = {})
	{
		this.name = name
		this.properties = properties
		/* The following is in individal Item constructors:
		for (var name_of_prop in properties) {
			this[name_of_prop] = null
		}
		*/
	}
	
}