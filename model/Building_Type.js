export default class Building_Type {
	name
	lc_name
	outputs = []
	inputs = []
	resource_inputs = []
	resource_multipliers = []
	build_requirements = []
	lc_name
	cap_name
	graphic
	labelled
	
	constructor(name)
	{
		this.name = name;
		this.lc_name = name.toLowerCase()
		this.graphic = 'cottage_generic.png'
		this.labelled = false
	}
}