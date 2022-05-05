<template>
	<div id="info_zone_global" class="info_zone">
		<div 
			v-for="id in open_buildings"
			:key="'info_zone_b'+id"
			class="info_for_buildings"
		>
			<Building_Info :id="id" />
		</div>
	</div>
</template>

<script>
	import Building_Info from './Info_Zone/Building'
	
	import Vue from 'vue'
	import { bus } from '../main'
	
	export default {
		name: 'Info_Zone',
		data() {
			return {
				open_buildings: []	
			}
		},
		created (){
			bus.$on('iz', (e) => {
				alert ('bus iz event caught')
				switch(e.do) {
					case 'Show building':
						if (!this.open_buildings.includes(e.id)) {
							this.open_buildings.push(e.id)
						} else {
							// To do, low priority
							// Pulse the open window
						}
						/*
						** Another way to add components, 
						** kept for reference
						**
						var Building_Info_Class = Vue.extend(Building_Info)
						var bulding_info_instance 
							= new Building_Info_Class({
								propsData: {id: 1}
							});
						bulding_info_instance.$mount()
						this.$el.appendChild(bulding_info_instance.$el)
						*/
						break;
					case 'Close window': {
						const index = this.open_buildings.indexOf(e.id);
						if (index > -1) {
							this.open_buildings.splice(index, 1);
						}
						break;
					}
					default:
						console.log("Unknown e.do")
						break;
				}
				
			})
		},
		components: {
			Building_Info
		}
	}
</script>

<style>
</style>