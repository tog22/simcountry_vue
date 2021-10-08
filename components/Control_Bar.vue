<template>
	<div id="control_bar">
		<div class="s_info">
			Murwood Forest
		</div>
		<div class="controls">
			<div class="time_control control first" @click="play_or_pause">
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
			<div class="add_control control w_dropdown">
				<div class="dropdown">
					<div class="s_item" sc-action="add_lumber_mill" accesskey="f">
							Lumber Mill
					</div>
					<div class="s_item" sc-action="add_farm">
						Farm
					</div>
				</div>
				<span class="btn">
					⤵️
				</span>
				<!-- 
				<div class="btn_ol_and_bg">
					<img class="btn_bg" src="graphics/ui/button.png">
					<div class="btn_ol">
						+
					</div>
				</div>
				-->
				<span class="label" @click="test_add_lm">
					Add
				</span>
			</div>
			<!--
			<div id="menus_mml">
				<v-menu-multi-level :nodes="menus" @click-item="menu_item_clicked">
				</v-menu-multi-level>
			</div>
			-->
		</div>
	</div>
</template>

<script>
	import w from '../model/World.js'
	import ds from '../aspects/store.js'
	
	// import VMenuMultiLevel from 'v-menu-multi-level'
	// import 'v-menu-multi-level/dist/v-menu-multi-level.css'
	
	import Building from '../model/Building.js'
	
	import { bus } from '../main'
	
	import bldgs from '../actions/buildings.js'
	
	export default {
		name: 'Control_Bar',
		components: {
			//VMenuMultiLevel,
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
			}
		},
		methods: {
			play_or_pause() {
				ds.meta.running = !ds.meta.running;
			},
			test_add_lm() {
				w.objects[w.next] = new Building(0, 'lumber_mill');
				w.objects[0].buildings.push(w.latest);
			},
			menu_item_clicked(event,data) {
				
				switch (data.label) {
					case 'Lumber Mill':
						// bus.$emit('add', 'lumber_mill_emitted');
						
						//bldgs.add('lumber_mill', 0);
						
						w.objects[w.next] = new Building(0, 'lumber_mill');
						w.objects[0].buildings.push(w.latest);
						// ↑ TO DO: Change 0 in bldgs.add() from being hardcorded to being w.cvl, once I make the Currently Visible Locale get set 
						alert('end')
						break;
					case 'Farm':
						break;
				}
			}	
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
