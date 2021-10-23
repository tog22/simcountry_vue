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
			return {
				b: b
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
				return 'building t '+this.b.type
			},
			b_image: function() {
				let ret = 'graphics/Buildings/';
				switch (this.b.type) {
					case 'Lumber Mill':
						ret += 'SawMill.png'
						break
					case 'Farm':
						ret += 'farm.png'
						break
					case 'Stone Mine':
					case 'Iron Mine':
						ret += 'StoneMine.png'
						break
					default:
						ret += 'cottage_generic.png'
						break
				}
				return ret;
			},
			b_label: function() {
				switch (this.b.type) {
					case 'Lumber Mill':
					case 'Farm':
						return ''
					case 'Stone Mine':
						return 'Stone Mine'
					case 'Iron Mine':
						return 'Iron Mine'
					default:
						return this.b.type
				}
			}
		},
	}
</script>