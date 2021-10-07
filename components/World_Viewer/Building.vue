<template>
	<div class="biz lumber_mill t" id="v1" @click="building_click">
		<img src="graphics/Buildings/SawMill.png">
	</div>
</template>

<script>
	import { bus } from '@/main'
	
	export default {
		name: 'Building',
		props: {
			id: {
				required: true,
				type: Number
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
		}
	}
</script>