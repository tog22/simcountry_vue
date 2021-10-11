<template>
	<div id="control_bar">
		<div class="s_info">
			{{name}} (Population {{population}})
		</div>
		<div class="controls">
			<div class="time_control no_day_shown control first" @click="play_or_pause">
				<span id="play_pause" class="btn"
					v-html="play_pause_icon">
				</span>
				<!--
				<span class="label">
					<span id="timer">
						Day {{day}}
					</span>
				</span>
				-->
			</div>
			<div class="add_control control w_dropdown s_right">
				<div class="dropdown">
					<div class="s_item" @click="add('lumber mill')">
							Lumber Mill
					</div>
					<div class="s_item" @click="add('farm')">
						Farm
					</div>
				</div>
				<span class="btn">
					⤵️
				</span>
				
				<span class="label">
					Add
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	import w from '@/model/World'
	import a from '@/model/Actions'
	import ds from '@/aspects/store'
	
	import Building from '@/model/Building'
	
	import { bus } from '@/main'
	
	import bldgs from '@/actions/buildings.js'
	
	export default {
		name: 'Control_Bar',
		props: {
			locale_id: {
				required: true,
				type: Number
			}
		},
		computed: {
			play_pause_icon: function() {
				if (!ds.meta.running) {
					return '▶️'
				} else {
					return '⏸'
				}
			},
			day: function() {
				return w.day
			},
			population: function() {
				return w.objects[this.locale_id].population
			},
			name: function() {
				return w.objects[this.locale_id].name
			}
		},
		methods: {
			play_or_pause() {
				ds.meta.running = !ds.meta.running;
			},
			add(type) {
				let btype =  w.btypes[type]
				let build_requirements = btype.build_requirements;
				let reqt = 'Lumber'
				let reqnum = build_requirements['Lumber']
				if (a.get_resources(reqt,reqnum)) {
					w.objects[w.next] = new Building(0, type, 2);
				}
			},	
		},
		data() {
			return {
			  menus: [
				{
				  label: 'Add',
				  visible: true,
				  children: [
					{
					label: 'Lumber Mill',
					children: []
				    },
					{
					label: 'Farm',
					children: []
					}
			  	  ]
				  // . . .
				}
				/*
				,
			    {
				  label: 'Menu 2',
				  visible: true,
				  children: [
					{
					label: 'Item 1',
					children: []
					},
					{
					label: 'Item 2',
					children: []
					}
					]
				  // . . .
				}
				*/
			  ]
			}
		}
	}
</script>

<style>
	#menus_mml,
	#menus_mml #v-menu-multi-level.container {
		display: inline-block !important;
		display: none !important;
		/* Other styles in ui.css */
	}
</style>
