class SimCountryUI {
	
	keypress_handler(e) {
		lo('kh')
		console.log(e)
		key_action[e.key]()
		/*if (
			typeof e !== 'undefined' 
			&&
			'key' in e
		) {*/
			alert('e.key = '+e.key+' // String.fromCharCode(e.keyCode) = '+String.fromCharCode(e.keyCode))
		/*
		}
		*/
	}
	
	add_key(key, action) {
		key_action[key] = function() { action() }
	}
	
}

let key_action = {
	'a': function() { example_key_action_var() }
}

let example_key_action_var = function example_key_action_function() {
	alert('About SimCountry: to come')
}

let l = function (to_log) { 
	console.log(to_log) 
}

let lo = l

var ui = new SimCountryUI()

export default ui