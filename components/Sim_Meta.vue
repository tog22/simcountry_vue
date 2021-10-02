<template>
	<div id="sim_meta_debug" class="window">
		<p>Test = {{test}}</p>
		<p>Test (computed) = {{test_computed}}</p>
		<p @click="update_state">UPDATE STATE</P>
		<p @click="alert_vals">SHOW STATE</p>
		<p>Running = {{running}}</p>
	</div>
</template>

<script>
import ds from '../supplements/store.js'

export default {
	name: 'simm',
	data() {
		return {
			running: false,
			test: 'pre-loading state'
		}
	},
	computed: {
		test_computed: function() {
			return ds.test
		},
		running: function() {
			return ds.meta.running
		}
	},
	created() {
		this.test = ds.test
	},
	updated() {
		this.test = ds.test 
		// This works, but only because the computed property's change triggers updated()
	},
	methods: {
		alert_vals() {
			let show = "State's version of test: "+ds.test+"\n\nSim_Meta component's version of test:"+this.test;
			alert(show) 
		},
		update_state() {
			ds.test = "Updated state val"
		}
	}
}
</script>