export default class Item {
	name
	icon
	quantities = []
	/* ↑ Example:
			{
				above: 1,
				adjective: 'Sparse'
			},
			{
				above: 100,
				adjective: 'A copse of'
			}
	*/
	
	desired = [
		{
			luxury_level: 'example', // minimal, basic, moderate, high
			quantity: 1,	// 1 item…
			frequency: 10	// …every 10 days
		}
	]
	levels = [
		{
			luxury_level: 'example', // minimal, basic, moderate, high
			name: 'Coarse clothing'
		}
	]
	
	constructor(name, icon = null)
	{
		this.name = name;
		if (icon) this.icon = icon;
	}
}