import w from '../model/World.js'

export default class Locale {
	oid
	custom_name
	children = []
	resources = {}
	aspects = {}
	buildings = []
	dwellings = []
	
	constructor() { 
		this.oid = w.next;
		w.next++;
		w.latest++;
	}
	
	update() {
		// nothing needed yet
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