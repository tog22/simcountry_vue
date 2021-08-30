<template>
	<Control_Bar/>
	<World/>
</template>

<script>
	import '@/assets/ui.css';
	import '@/assets/map.css';
	
	import World from './components/World.vue'
	import Control_Bar from './components/Control_Bar.vue'
	
	export default {
		name: 'App',
		components: {
			World,
			Control_Bar
		}
	}
</script>

<style>

</style>
