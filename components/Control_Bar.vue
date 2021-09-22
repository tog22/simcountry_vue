<template>
	<div id="control_bar">
		<div class="time_control control first">
			<span id="play_pause" class="btn">
				▶️ <!-- ⏸ -->
			</span>
			<span class="label">
				<span id="timer">
					Day <span id="day">1</span>
				</span>
			</span>
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
			<span class="label">
				Add
			</span>
		</div>
		<div id="menus_mml">
			<v-menu-multi-level :nodes="menus" @click-item="menu_item_clicked">
			</v-menu-multi-level>
		</div>
	</div>
</template>

<script>
	import VMenuMultiLevel from 'v-menu-multi-level'
	import 'v-menu-multi-level/dist/v-menu-multi-level.css'
	
	import { bus } from '../main'
	
	import bldgs from '../actions/buildings.js'
	
	export default {
		name: 'Control_Bar',
		components: {
			VMenuMultiLevel
		},
		methods: {
			menu_item_clicked(event,data) {
				switch (data.label) {
					case 'Lumber Mill':
						// bus.$emit('add', 'lumber_mill_emitted');
						
						bldgs.add('lumber_mill', 0);
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
		/* Other styles in ui.css */
	}
</style>
