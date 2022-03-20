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
	
	levels = {}
	/* ↑ Example:
		{
			1: 'Coarse clothing',
			2: 'Comfortable clothing',
			3: 'Ornate clothing'
		}
	*/
	
	constructor(name, icon = null)
	{
		this.name = name;
		if (icon) this.icon = icon;
	}
}