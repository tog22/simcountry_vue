//
// export default class {
// 	add(building_type, locale) {
// 		console.log(building_type);
// 	} 
// }

var bldgs = (function() {
	let publicly_returned_bits = {};
	let private_bits = {};
	let w = window.world;
	
	publicly_returned_bits.add = function(building_type, locale) {
		console.log(building_type);
	}
	
	return publicly_returned_bits;
})();

export default bldgs;