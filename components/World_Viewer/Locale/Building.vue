<template>
	<div :class="b_class" @click="building_click">
		<div class="s_graphic">
			<img :src="b_image">
		</div>
		<div class="s_label">
			<span v-html="b_label"></span>
		</div>	
	</div>
</template>

<script>
	import w from '@/model/World.js'
	import { bus } from '@/main'
	
	export default {
		name: 'Building',
		props: {
			id: {
				required: true,
				type: Number
			}
		},
		data() {
			let b = w.objects[this.id]
			let btype = w.btypes[b.type]
			return {
				b:			b,
				btype:		btype
			}	
		},
		methods: {
			building_click: function () {
				let event = {
					do:			'Show building',
					id:			this.id,
					prompt:		'A click on a building in world viewer',
				}
				bus.$emit('iz', event)
			}
		},
		computed: {
			b_class: function() {
				let ret = 'building t '+this.btype.name
				
				if (this.btype.labelled) {
					ret += ' show_label'
				} else {
					ret += ' hide_label '
				}
				
				return ret
			},
			b_image: function() {
				let ret = 'graphics/Buildings/';
				ret += this.btype.graphic
				return ret;
			},
			b_label: function() {
				return this.btype.name
			}
		},
	}
</script>