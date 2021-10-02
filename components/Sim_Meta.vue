<template>
	<div id="sim_meta_debug" class="window">
		<p>test = {{test}}</p>
		<p>computed test = {{test_computed}}</p>
		<p @click="update_state">UPDATE STATE</P>
		<p @click="alert_vals">SHOW STATE</p>
	</div>
</template>

<script>
import state from '../supplements/store.js'

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
			return state.test
		}
	},
	created() {
		this.test = state.test
	},
	updated() {
		this.test = state.test 
		// This works, but only because the computed property's change triggers updated()
	},
	methods: {
		alert_vals() {
			let show = "State's version of test: "+state.test+"\n\nSim_Meta component's version of test:"+this.test;
			alert(show) 
		},
		update_state() {
			state.test = "Updated state val"
		}
	}
}
</script>