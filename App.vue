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
			
			w.btypes['lumber_mill'] = new Building_Type('lumber_mill');
			w.btypes['lumber_mill'].cap_name = 'Lumber Mill';
			w.btypes['lumber_mill'].lc_name = 'lumber mill';
			w.btypes['lumber_mill'].resource_inputs['Trees'] = 1;
			w.btypes['lumber_mill'].outputs['Lumber'] = 1;
			
			w.btypes['farm'] = new Building_Type('farm');
			w.btypes['farm'].cap_name = 'Farm';
			w.btypes['farm'].lc_name = 'farm';
			w.btypes['farm'].outputs['Food'] = 2;
			w.btypes['farm'].build_requirements['Lumber'] = 20;
			w.btypes['farm'].resource_multipliers['soil quality'] = 1;
			
			// Create buildings
			
			var building
			
			// Lumber mill
			
			w.objects[w.next] = new Building(w.cll, 'lumber_mill', 2, 'Donkbert');
			building = w.objects[w.latest]
			building.inventory["Food"] = 2; 
			// ↑ For starting lumber mill only
			
			// Farm
			w.objects[w.next] = new Building(w.cll, 'farm', 1, 'Frank');
			
			
			
			
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
		}
	}
</script>

<style>

</style>
