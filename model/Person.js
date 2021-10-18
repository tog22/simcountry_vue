import w from '@/model/World'

export default class Person {
	name
	locale
	
	coins
	inventory = {}
	speed_auction_inventory = {}
	can_eat
	
	building_owned
	
	constructor(locale, name = null, building_to_own = null) { 
		w.objects[w.cl].people.push(this)
		
		if (name) {
			this.name = name;
		} else {
			this.name = 'Josiah'
		}
		
		this.locale = locale
		locale.population += 1
		
		this.coins = 10
		this.inventory["Food"] = 10
		this.can_eat = true
				
		if (building_to_own) {
			this.building_owned = building_to_own
		}
	}
	
	seek_food() {
		
		// 1) Try getting food from the building they own
		// 		(TODO - work out some adjustment, like seeing if market price is cheaper, and somehow letting this drive up agricultural wages and thus prices()
		
		// // console.log(this.name+" has "+this.coins+' coins')
		
		if (this.building_owned !== undefined && this.building_owned.inventory["Food"] !== undefined) {
			if (this.building_owned.inventory["Food"] > 0) {
				
				// console.log(this.building_owned.inventory["Food"])
				this.inventory["Food"] += 1
				if (this.building_owned.inventory["Food"] > 0) {
					this.building_owned.inventory["Food"] -= 1
				}
				// console.log(this.name+" eats food from his building's stockpile")
				
				if (this.building_owned.type === 'farm') {
					this.coins -= this.building_owned.salary
					this.building_owned.coins += this.building_owned.salary
					// console.log('...paying 1 coin from his farm salary')
					// console.log(this.building_owned.inventory["Food"])
				}
				
				return true
			}
		}
		 
		// 2) Otherwise, go to market with a maximum bid for food
		this.locale.seek('Food', 1, this.coins, this)
		if (this.name === 'Donkbert') {
			// console.log(this.name+' has '+this.coins+' coins, so bids this');
		}
	}
	
	eat_food() {
		if (this.inventory["Food"] > 0) {
			this.inventory["Food"] -= 1
			this.can_eat = true
		} else {
			this.can_eat = false
		}
	}
}