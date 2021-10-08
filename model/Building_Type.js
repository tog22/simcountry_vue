import w from '../model/World.js'

export default class Building_Type {
	name
	inputs = []
	outputs = []
	build_requirements = []
	lc_name
	cap_name
	
	constructor(name)
	{
		this.name = name;
	}
}