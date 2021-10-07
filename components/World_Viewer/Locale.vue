<template>
<div id="locale_shown">
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
	<div id="shown_locale_info">
		<!--
		<div class="window">
			<h2>
				Resources 
			</h2>
			<div class="s_content">
				<p>
					🌲 {{locale.resources['trees']}}
				</p>
			</div>
		</div>
		-->
	</div>
</div>
</template>

<script>
import w from '@/model/World.js'

import Building from './Building.vue'

export default {
	name: 'Locale',
	components: {
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
	created() {
		let locale_c = w.objects[this.locale_id];
		
		const building_ids = locale_c.children;
		this.building_ids = building_ids; // or = this.building_ids.concat(building_ids);
		
		
		
		/*
		let array1 = [1,2];
		
		
		let w = this.$parent.$parent;
		const building_ids_src = w.objects[this.locale].children;
		this.building_ids = building_ids_src;
		console.log("array1 = ");
		console.log(array1);
		console.log("const building_ids_src =");
		console.log(building_ids_src);
		console.log("this.bi = ");
		console.log(this.building_ids);
		*/
	}, 
	methods: {
		log(to_log) {
			console.log('___ Manual console log ___')
			console.log(to_log);
		}
	}
}
</script>