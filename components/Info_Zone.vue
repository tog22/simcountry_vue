<template>
	<div id="info_zone_global">
		<Building_Info :id="0" />
	</div>
</template>

<script>
	import Building_Info from './Info_Zone/Building'
	
	import Vue from 'vue'
	import { bus } from '../main'
	
	export default {
		name: 'Info_Zone',
		created (){
			bus.$on('iz', (e) => {
				var Building_Info_Class = Vue.extend(Building_Info)
				var bulding_info_instance = new Building_Info_Class()
				bulding_info_instance.$mount()
				this.$el.appendChild(bulding_info_instance.$el)
			})
		},
		components: {
			Building_Info
		}
	}
</script>

<style>
	#info_zone_global {		
		flex-grow: 1;
		
		/* border-top: 1px solid white; */
		background: #7c98b3;
		padding: 20px; /* var */
	}
</style>