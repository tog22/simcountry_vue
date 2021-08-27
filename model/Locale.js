export default class Locale {
	oid
	custom_name
	resources = {}
	aspects = {}
	buildings = []
	dwellings = []
	
	constructor() { 
		let w = window.world;
		this.oid = w.next;
		w.next++;
		w.c++;
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