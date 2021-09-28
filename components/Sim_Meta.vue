<template>
	<div id="sim_meta_debug" class="window">
		<p>running = {{running}}</p>
		<p>test = {{test}}</p>
		<p @click="alert_vals">show latest</p>
	</div>
</template>

<script>
export default {
	name: 'simm',
	data() {
		return {
			running: false,
			test: 'initial string'
		}
	},
	methods: {
		alert_vals() {
			let show = 'running='+this.running+' test='+this.test;
			alert(show) 
		}
	}
}
</script>