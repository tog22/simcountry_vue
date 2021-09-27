// The below doesn't work, use the variable returned by the self-expressing function below instead:
// 
// export default class {
// 	add(building_type, locale) {
// 		console.log(building_type);
// 	} 
// }

import Building from '../model/Building.js'
	
var bldgs = (function() {
	let publicly_returned_bits = {};
	let private_bits = {};
	let w = window.world;
	
	publicly_returned_bits.add = function(building_type, locale) {
		console.log(building_type);
		
		w.objects[w.next] = new Building(locale, building_type);
		w.objects[locale].buildings.push(w.latest);
	}
	
	return publicly_returned_bits;
})();

export default bldgs;