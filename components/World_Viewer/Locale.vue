<template>
	<div id="locale_shown">
		<Control_Bar  :locale_id="locale_id"/>
		<div id="visual">
			<div class="temp">
				<div class="locale grassland" id="v0">
					<div class="resources forest t">
						<img src="graphics/nature/tree.png">
						<img src="graphics/nature/tree.png">
						<img src="graphics/nature/tree.png">
						<img src="graphics/nature/tree.png">
						<img src="graphics/nature/tree.png">
						<img src="graphics/nature/tree.png">
					</div>
					<div 
						v-for="building_id in building_ids"
						:key="'index_world_viewer_l'+locale_id+'b'+building_id"
						class="building_container t"
					>
						<Building :id="building_id" />
					</div>
					<div class="rhs t">
						<!-- Spare space on the right hand side -->
					</div>
				</div>
			</div>
		</div>
		<div id="shown_locale_info" class="info_zone">
			<div class="s_flex">
				<div class="c_window">
					<div class="window">
						<h2>
							People 
						</h2>
						<div class="s_content">
							<div v-html="people_info" class="line_list">
							</div>
						</div>
					</div>
				</div>
				<!--
				<div class="c_window">
					<div class="window">
						<h2>
							Resources 
						</h2>
						<div class="s_content">
							<div v-html="resource_info" class="line_list">
							</div>
						</div>
					</div>
				</div>
				-->
			</div>
		</div>
	</div>
</template>

<script>
import w from '@/model/World.js'

import Control_Bar from './Locale/Control_Bar.vue'
import Building from './Locale/Building.vue'


export default {
	name: 'Locale',
	components: {
		Control_Bar,
		Building
	},
	props: {
		locale_id: {
			required: true,
			type: Number
		}
	},
	data() {
		return {
			building_ids: [],
			locale: w.objects[this.locale_id]
		}
	},
	computed: {
		people_info: function() {
			let ret = ''
			let locale_c = w.objects[this.locale_id]
			for (var person of locale_c.people) {
				if (person.days_inactive >= 10) {
					continue // Eventually it'd be better to delete all references to the person (currently just locale.people and building.owner)
				}
				ret += '<div><span class="icon_in_text">👤</span> '+person.name;
				if (!person.active) {
					ret += ' (emigrating)</div>'
				} else {
					ret += ', '+person.inventory["Food"]+' food, '+person.coins+' coins</div>'
				}
				
			}
			return ret
		},
		resource_info: function() {
			let ret = ''
			let locale_c = w.objects[this.locale_id]
			for (var resource_name in locale_c.resources) {
				
				ret += '<div>'
				
				let item_type = w.items[resource_name]
				if (item_type.icon) {
					ret += '<span class="icon_in_text">'+item_type.icon+'</span> '
				} else {
					ret += item_type.name+': '
				}
				
				ret += locale_c.resources[resource_name]
				
				ret += '</div>'
			}
			return ret
			
		}
	},
	created() {
		let locale_c = w.objects[this.locale_id];
		
		const building_ids = locale_c.buildings;
		this.building_ids = building_ids;
	}
}
</script>