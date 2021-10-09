import w from '@/model/World.js'

const a = {
	get_resources: function (resource, quantity, dest = null) {
		let succeeded = false
		for (let src of w.objects) {
			
			// Search for sufficient resources, by exclusion
			
			if (!src.constructor.name === 'Building') {
				continue
			}
			if (src.inventory === undefined) {
				continue
			}
			if (src.inventory[resource] === undefined) {
				continue
			}
			if (src.inventory[resource] < quantity) {
				continue
			}
			
			// Steps to take if & when sufficient resources have been found
			
			succeeded = true
			src.inventory[resource] -= quantity
			if (dest) {
				dest.inventory[resource] += quantity
			}
			break
		}
		
		if (succeeded) {
			return true
		} else {
			alert ("There's not enough "+resource)
			return false
		}
	}
}

export default a;