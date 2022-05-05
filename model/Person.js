import w from '@/model/World'
import index from '@/worlds/index'

export default class Person {
	name
	locale
	id
	
	coins
	inventory 		= {}
	manual_auction_inventory = {}
	active 			= true
	days_inactive 	= 0
	
	building_owned
	
	constructor(locale, name = null, building_to_own = null) { 
		//******TEMP******
		index.foods.add('Food')
		w.objects[w.cl].people.push(this)
		
		if (name) {
			this.name = name;
		} else {
			this.name = 'Josiah'
		}
		
		this.locale = locale
		locale.population += 1
		locale.trend_population += 1
		
		this.id = locale.people.length
		
		this.coins = 10
		this.inventory["Food"] = 10
		this.active = true
				
		if (building_to_own) {
			this.building_owned = building_to_own
		}
	}
	
	seek_food() {
		
		if (!this.active) {
			this.days_inactive++
			if (this.days_inactive === 10) {
				this.locale.population -= 1
			}
			return
		}
		
		// 1) Try getting food from the building they own
		// 		(TODO - work out some adjustment, like seeing if market price is cheaper, and somehow letting this drive up agricultural wages and thus prices()
		
		// l(this.name+" has "+this.coins+' coins')
		
		if (this.building_owned !== undefined) {
			
			let own_b_inventory = this.building_owned.inventory
			
			for (let item in own_b_inventory) {
				
				if
				(
					index.foods.has(item) 
					&& 
					own_b_inventory[item] > 0
				)
				{
					
					// 👤 gets the food & forgoes their salary
					
					l(this.name+" eats food from his building's stockpile")
					l('Before own_b_inventory[item] - '+own_b_inventory[item])
					
					own_b_inventory[item] -=1
					this.inventory[item] += 1 
					this.building_owned.coins += this.building_owned.salary
					this.coins -= this.building_owned.salary
					
					
					l('After own_b_inventory[item] - '+own_b_inventory[item])
					l(this)
					
					
					
					return true 
				}
				
			}
			
		}
		
		/******
		** 	old version of (1)
		**
		
		if (this.building_owned !== undefined && this.building_owned.inventory["Food"] !== undefined) {
			if (this.building_owned.inventory["Food"] > 0) {
				
				// l(this.building_owned.inventory["Food"])
				this.inventory["Food"] += 1
				if (this.building_owned.inventory["Food"] > 0) {
					this.building_owned.inventory["Food"] -= 1
				}
				// l(this.name+" eats food from his building's stockpile")
				
				if (this.building_owned.type === 'Farm') {
					this.coins -= this.building_owned.salary
					this.building_owned.coins += this.building_owned.salary
					// l('...paying 1 coin from his farm salary')
					// l(this.building_owned.inventory["Food"])
				}
				
				return true
			}
		}
		
		*************/
		 
		// 2) Otherwise, go to market with a maximum bid for food
		if (this.name === 'Donkbert') {
			// l('Donkbert = ')
			// l(this)
			// l(this.coins)
		}
		this.locale.seek('Food', 1, this.coins, this)
		if (this.name === 'Donkbert') {
			// l(this.name+' has '+this.coins+' coins, so bids this');
			// l(this.locale.bids["Food"][3])
		}
	}
	
	
	eat_food() {
		if (!this.active) {
			return
		}
		
		if (this.inventory["Food"] > 0) {
			this.inventory["Food"] -= 1
			this.active = true
		} else {
			this.active = false
			this.locale.trend_population -= 1
		}
	}
}

let l = function (to_log) { 
	console.log(to_log) 
}

let lo = l