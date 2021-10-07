<template>
	<div class="window">
		<h2>
			{{custom_name}} 
		</h2>
	<div class="s_content">
		<p class="inventory">
			<div
				v-for="(amount, item_name) in inventory"
				:key="'b'+id+'_info_inv_'+item_name"
			>
				{{item_name}}: {{amount}}
			</div>
		</p>
	</div>
	</div>
</template>

<script>
import w from '@/model/World.js'

export default {
	name: 'Building_Info',
	props: {
		id: {
			required: false,
			type: Number
		}
	},
	data() {
		let b = w.objects[this.id]
		return {
			b:				b,
			custom_name:	b.custom_name,
			type: 			b.type
		};
	},
	computed: {
		inventory: function() {
			let update_prompt = w.day
			let b = w.objects[this.id]
			return b.inventory
		}
	},
	components: {
	},
	
}
</script>