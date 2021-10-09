import w from '@/model/World'

export default class Person {
	name
	coins
	building_owned
	
	constructor(name = null, building_to_own = null) { 
		w.objects[w.cl].people.push(this)
		
		if (name) {
			this.name = name;
		} else {
			this.name = 'Josiah'
		}
		
		this.coins = 10
		
		if (building_to_own) {
			this.building_owned = building_to_own
		}
	}
	
	operate() {
		
	}
}