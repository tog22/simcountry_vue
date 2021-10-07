<template>
	<div class="window">
		<div class="close_window" @click="close_window">
			✖︎ <!-- ⨯ -->
		</div>
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
import { bus } from '@/main'

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
	methods: {
		close_window: function() {
			let event = {
				do:			'Close window',
				id:			this.id
			}
			bus.$emit('iz', event)
		}
	},
	components: {
	},
	
}
</script>

<style>
	.close_window {
		float: right;
		margin-right: -1em;
		margin-top: -0.2em;
	}
</style>