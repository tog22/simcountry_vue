import Vue from 'vue';

const world = 
new Vue({
	data () {
		return {
			objects: [
				// Locales, buildings et al get loaded here
			],
			btypes: {
				// Building types go here
			},
			items: {
				// (Particular types of) items go here	
			},
			types: {
				// General types of items go here
			},
			next: 0,	// Next object id
			latest: -1,		// Latest object id
			cl: null,	// Current locale, to supercede cll & cvl
			cll: null,	// Currently loading locale
			cvl: null,	// Current visible locale
			day: 1
		}
	},
});

export default world;