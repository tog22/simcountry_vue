export default class Building_Type {
	name
	outputs = []
	inputs = []
	resource_inputs = []
	resource_multipliers = []
	build_requirements = []
	lc_name
	cap_name
	
	constructor(name)
	{
		this.name = name;
	}
}