<template>
	<div id="window">
		<World_Viewer :locale="0"/>
		<Info_Zone/>
	</div>
</template>

<script>
	import '@/graphics/ui.css';
	import '@/graphics/map.css';
	
	import w from '@/model/World'
	
	import World_Viewer from './components/World_Viewer.vue'
	import Info_Zone from './components/Info_Zone.vue'
	
	import Locale from '@/model/Locale'
	import Building from '@/model/Building'
	import Building_Type from '@/model/Building_Type'
	import Person from '@/model/Person'
	
	export default {
		name: 'App',
		components: {
			World_Viewer,
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
			w.cl = w.cvl = w.cll = w.latest; // currently loading locale - for businesses etc. within it
			let locale = w.objects[w.cl];
			locale.name = 'Murwood Forest';
			locale.resources['Trees'] = 2000000;
			locale.aspects['soil quality'] = 2; 
			// ↑ 2 above = displayed quality of 100 = (x-1)*100 = (2-1)*100
			
			// Create building types
			
			w.btypes['Lumber Mill'] = new Building_Type('Lumber Mill');
			w.btypes['Lumber Mill'].cap_name = 'Lumber Mill';
			w.btypes['Lumber Mill'].lc_name = 'Lumber Mill';
			w.btypes['Lumber Mill'].resource_inputs['Trees'] = 1;
			w.btypes['Lumber Mill'].outputs['Lumber'] = 1;
			
			w.btypes['Farm'] = new Building_Type('Farm');
			w.btypes['Farm'].cap_name = 'Farm';
			w.btypes['Farm'].lc_name = 'Farm';
			w.btypes['Farm'].outputs['Food'] = 4;
			w.btypes['Farm'].build_requirements['Lumber'] = 20;
			w.btypes['Farm'].resource_multipliers['soil quality'] = 1;
			
			// Create buildings
			
			var building
			
			// Lumber Mill
			
			// w.objects[w.next] = new Building(w.cll, 'Lumber Mill', 14, 'Lavish Joe');
			// w.objects[w.next] = new Building(w.cll, 'Lumber Mill', 10, 'Rich Albert');
			// w.objects[w.next] = new Building(w.cll, 'Lumber Mill', 6, 'Comfortable Joshbert');
			
			w.objects[w.next] = new Building(w.cll, 'Lumber Mill', 2, 'Donkbert');
			// building = w.objects[w.latest]
			// building.inventory["Food"] = 2; 
			// ↑ For starting Lumber Mill only
			
			// Farm
			w.objects[w.next] = new Building(w.cll, 'Farm', 1, 'Frank');
			
		}
	}
</script>

<style>

</style>
