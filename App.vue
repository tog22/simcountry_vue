<template>
	<div id="window">
		<Control_Bar/>
		<World/>
		<Info_Zone/>
	</div>
</template>

<script>
	import '@/assets/ui.css';
	import '@/assets/map.css';
	
	import World from './components/World.vue'
	
	import Control_Bar from './components/Control_Bar.vue'
	import Info_Zone from './components/Info_Zone.vue'
	
	export default {
		name: 'App',
		components: {
			World,
			Control_Bar,
			Info_Zone
		}
	}
</script>

<style>

</style>
