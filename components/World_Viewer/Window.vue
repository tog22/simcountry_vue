<template>
	<div class="c_window">
		<div class="window">
			<h2>
				{{window}}
			</h2>
			<template v-if="window == 'People'">
				<div class="s_content">
					<div v-html="people_info" class="line_list">
					</div>
				</div>
			</template>
			<template v-else-if="window == 'Resources'">
				<div class="s_content">
					<div v-html="resource_info" class="line_list">
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
import w from '@/model/World.js'

export default {
	name: 'Window',
	components: {
	},
	props: {
		window: {
			required: true,
			type: String
		},
		locale_id: {
			required: false,
			type: Number
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
				// if (item_type.icon) {
				// 	ret += '<span class="icon_in_text">'+item_type.icon+'</span> '
				// } else {
				// 	ret += item_type.name+': '
				// }
				
				ret += locale_c.resources[resource_name]
				
				ret += ' '+item_type.name.toLowerCase()
				
				ret += '</div>'
			}
			return ret
			
		}
	},
}
</script>