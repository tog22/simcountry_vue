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
			next: 0,	// Next object id
			latest: -1,		// Latest object id
			cll: null,	// Currently loading locale
			cvl: null,	// Current visible locale
			day: 1,
			names: {
				people: {
					m: [
						'Joseph',
						'Joe',
						'Frank',
						'Stewart',
						'Frederick',
						'Andrew',
						'The Donk'
					]
				}
			}
		}
	},
});

export default world;