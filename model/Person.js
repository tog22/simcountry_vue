import w from '@/model/World'

let l = function (to_log) { 
	console.log(to_log) 
}

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
		this.inventory["Food"] = {}
		this.inventory["Food"]['Oats'] = 10
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
		
		if (this.building_owned !== undefined && this.building_owned.inventory["Food"] !== undefined) {
			
			this.inventory["Food"]['Oats'] += 1
			this.building_owned.inventory["Food"]['Oats'] -= 1
			this.coins -= this.building_owned.salary
			
			
			/**************************************
			
				TEMPORARILIY DISABLE FOR HARDCODED OATS
				
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
				
				return
			}
			*/
			
		}
		 
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