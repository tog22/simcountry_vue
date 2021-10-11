<template>
	<div :class="b_class" @click="building_click">
		<img :src="b_image">
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
				return 'biz t '+this.b.type
			},
			b_image: function() {
				let ret = 'graphics/Buildings/';
				switch (this.b.type) {
					case 'lumber mill':
						ret += 'SawMill.png'
						break
					case 'farm':
						ret += 'farm.png'
						break
					default:
						ret += 'SawMill.png'
						break
				}
				return ret;
			},
		},
	}
</script>