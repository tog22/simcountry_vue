<template>
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
				{{clog(building_ids)}}
				<div class="building_container" v-for="building_id in building_ids" :key={building_id}>
					<Building :id="building_id" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Building from './Building.vue'

	export default {
		name: 'Locale',
		components: {
			Building
		},
		props: {
			locale: {
				required: true,
				type: Number
			}
		},
		data() {
			return {
				building_ids: []
			}
		},
		created() {
			let w = this.$parent.$parent;
			const building_ids = w.objects[this.locale].children;
			this.building_ids = this.building_ids.concat(building_ids);
		}, 
		methods: {
			clog(to_log) {
				console.log('___ Manual console log ___')
				console.log(to_log);
			}
		}
	}
</script>