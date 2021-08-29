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
				<Building />
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
		mounted() {
			let w = this.$parent.$parent;
			const building_ids = w.objects[this.locale].children;
			for (const building_id of building_ids) {
				let building = w.objects[building_id];
				console.log(building)
			}
		}
	}
</script>