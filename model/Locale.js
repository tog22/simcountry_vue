import w from '../model/World.js'

export default class Locale {
	oid
	custom_name
	
	resources = {}
	aspects = {}
	
	buildings = []
	dwellings = []
	people = []
	sought = {}
	offered = {}
	
	population
	active_population
	
	constructor() { 
		this.oid = w.next;
		w.next++;
		w.latest++;
	}
	
	update() {
		this.operate()
	}
	
	operate() {
		for (var person of this.people) {
			person.operate()
		}
		// Reset sought & offered
		this.sought = {}
		this.offered = {}
	}
	
	buy(good, quantity, max_bid, buyer) {
		// TODO - add labour as a special case
		if (this.offered[good] !== undefined) {
			console.log('good found')
		}
	}
	
	offer(good, quantity, min_ask, seller) {
		this.offered[good]
	}
	
	// constructor()
	// {
	// 	this.oid = g.next;
	// 	g.next++;
	// 	g.c++;
	// 	
	// 	this.resources['trees'] = 0;
	// 	this.aspects['soil_quality'] = 0;
	// }
	// 
	// display() {
	// 	show_info_box(this.oid);
	// 	this.render();
	// }
	// 
	// render() {
	// 	let html = '';
	// 	html += show_hash(this.resources, 'Resources');
	// 	$('#o'+this.oid+' .ct').html(html);
	// }
	// 
	// update() {
	// 	$('#o'+this.oid+' .ct').html('');
	// 	this.render();
	// }
}