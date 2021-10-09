<template>
	<div id="window">
		<Control_Bar/>
		<World_Viewer :locale="0"/>
		<Info_Zone/>
	</div>
</template>

<script>
	import '@/graphics/ui.css';
	import '@/graphics/map.css';
	
	import w from './model/World.js'
	
	import Control_Bar from './components/Control_Bar.vue'
	import World_Viewer from './components/World_Viewer.vue'
	import Info_Zone from './components/Info_Zone.vue'
	
	import Locale from './model/Locale.js'
	import Building from './model/Building.js'
	import Building_Type from './model/Building_Type.js'
	
	export default {
		name: 'App',
		components: {
			World_Viewer,
			Control_Bar,
			Info_Zone
		},
		created() {
			
			/**************************
			***************************
			**						 **
			**  LOAD STARTING WORLD  **
			**						 **
			***************************
			**************************/
			
			// Create a locale
			
			w.objects[w.next] = new Locale();
			w.cll = w.latest; // currently loading locale - for businesses etc. within it
			w.objects[w.latest].custom_name = 'Murwood Forest';
			w.objects[w.latest].resources['Trees'] = 2000000;
			w.objects[w.latest].aspects['soil quality'] = 2; 
			// ↑ 2 above = displayed quality of 100 = (x-1)*100 = (2-1)*100
			
			// Create building types
			
			w.btypes['lumber_mill'] = new Building_Type('lumber_mill');
			w.btypes['lumber_mill'].lc_name = 'lumber mill';
			w.btypes['lumber_mill'].cap_name = 'Lumber Mill';
			w.btypes['lumber_mill'].inputs['Food'] = 1;
			w.btypes['lumber_mill'].inputs['Trees'] = 1;
			w.btypes['lumber_mill'].outputs['Lumber'] = 1;
			
			w.btypes['farm'] = new Building_Type('farm');
			w.btypes['farm'].lc_name = 'farm';
			w.btypes['farm'].cap_name = 'Farm';
			w.btypes['farm'].inputs['Food'] = 1;
			w.btypes['farm'].outputs['Food'] = 2;
			w.btypes['farm'].build_requirements['Lumber'] = 20;
			w.btypes['farm'].resource_multipliers['soil quality'] = 1;
			
			// Create a building
			
			w.objects[w.next] = new Building(w.cll,'lumber_mill');
			w.objects[w.cll].buildings.push(w.latest);
			w.objects[w.latest].custom_name = "Joseph's Lumber Mill";
			w.objects[w.latest].inventory["Food"] = 60; 
			// ↑ For starting lumber mill only
			
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

<style>

</style>
