import w from '@/model/World'

export default class Person {
	name
	locale
	
	coins
	health
	
	building_owned
	
	constructor(locale, name = null, building_to_own = null) { 
		w.objects[w.cl].people.push(this)
		
		if (name) {
			this.name = name;
		} else {
			this.name = 'Josiah'
		}
		
		this.coins = 10
		this.health = 10
		this.locale = locale
		locale.population += 1
		
		if (building_to_own) {
			this.building_owned = building_to_own
		}
	}
	
	operate() {
		//console.log(this.name+" goes about their day")
		this.feed_or_adjust_health()
	}
	
	feed() {
		
		// 1) Try getting food from the building they own
		// 		(TODO - work out some adjustment, like seeing if market price is cheaper, and somehow letting this drive up agricultural wages and thus prices()
		
		if (this.building_owned.inventory["Food"] !== undefined) {
			if (this.building_owned.inventory["Food"] > 0) {
				this.coins -= 1
				this.building_owned.coins += 1
				this.building_owned.inventory["Food"] -= 1
				return true
			}
		}
		 
		// 2) Otherwise, go to market with a maximum bid for food
		return this.locale.buy('Food', 1, this.coins, this)
	}
	
	feed_or_adjust_health() {
		let was_fed = this.feed()
		if (!was_fed) {
			if (this.health > 0) {
				this.health -= 1
			} else {
				this.locale.active_population -= 1
			}
			
		}
	}
}