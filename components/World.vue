<template>
	<World_Viewer :locale="0"/>
</template>

<script>
	import World_Viewer from './World_Viewer.vue'
	
	import Locale from '../model/Locale.js'
	import Building from '../model/Building.js'
	import Building_Type from '../model/Building_Type.js'
	
	import { bus } from '../main'
	
	export default {
		name: 'World',
		components: {
			World_Viewer
		},
		data() {
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
		created() {
			
			/**************************
			***************************
			**						 **
			**  LOAD STARTING WORLD  **
			**						 **
			***************************
			**************************/
			
			// Create a way to refer to the world everywhere without passing it into functions
			
			window.world = this;
			let w = this;
			
			// Create a locale
			
			w.objects[w.next] = new Locale();
			w.cll = w.latest; // currently loading locale - for businesses etc. within it
			w.objects[w.latest].custom_name = 'Murwood Forest';
			w.objects[w.latest].resources['trees'] = 2000;
			w.objects[w.latest].aspects['soil_quality'] = 100;
			
			// Create building types
			
			w.btypes['lumber_mill'] = new Building_Type('lumber_mill');
			w.btypes['lumber_mill'].lc_name = 'lumber mill';
			w.btypes['lumber_mill'].cap_name = 'Lumber Mill';
			w.btypes['lumber_mill'].inputs['trees'] = 1;
			w.btypes['lumber_mill'].outputs['lumber'] = 1;
			
			w.btypes['farm'] = new Building_Type('farm');
			w.btypes['farm'].lc_name = 'farm';
			w.btypes['farm'].cap_name = 'Farm';
			w.btypes['farm'].outputs['food'] = 1;
			
			// Create a building
			
			w.objects[w.next] = new Building(w.cll,'lumber_mill');
			w.objects[w.cll].buildings.push(w.latest);
			w.objects[w.latest].custom_name = "Joseph's Lumber Mill";
			
			/*************************
			**************************
			**						**
			**  ADD MENU FUNCTIONS  **
			**						**
			**************************
			*************************/
			
			// bus.$on(
			// 	'add',
			// 	(data) => {
			// 	  console.log(data);
			// 	}
			// );
		}, 
		methods: {
			log(to_log) {
				console.log('___ Manual console log ___')
				console.log(to_log);
			}
		}
	}
</script>