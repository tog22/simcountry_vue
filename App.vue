<template>
	<div id="viewport">
		<World_Viewer :locale="0"/>
	</div>
</template>

<script>
	import '@/graphics/ui.css';
	import '@/graphics/map.css';
	
	import ui from './aspects/ui'
	
	import w from '@/model/World'
	
	import World_Viewer from './components/World_Viewer.vue'
	import Info_Zone from './components/Info_Zone.vue'
	
	import Locale from '@/model/Locale'
	import Item from '@/model/Items'
	import Building from '@/model/Building'
	import Building_Type from '@/model/Building_Type'
	import Person from '@/model/Person'
	
	import create_world from '@/worlds/murwood'
	
	export default {
		name: 'App',
		components: {
			World_Viewer
		},
		created() {
			create_world()
			window.addEventListener('keyup', ui.keypress_handler);
			/*
			let example_key_action2 = function() { alert('Example')}
			ui.add_key('a', example_key_action2)
			*/
		},
		destroyed() {
			window.removeEventListener('keyup', ui.keypress_handler);
		},
	}
</script>

<style>

</style>
