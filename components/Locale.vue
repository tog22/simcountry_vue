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
					<div class="building_container t" v-for="building_id in building_ids" :key={building_id}>
						<!-- ↑ TODO: Change key to fix this error:
							"Avoid using non-primitive value as key, use string/number value instead."
						-->
						<Building :id="building_id" />
					</div>
					<div class="rhs t">
						<!-- Spare space on the right hand side -->
					</div>
				</div>
			</div>
		</div>
		<div id="shown_locale_info">
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
		</div>
	</div>
</template>

<script>
	import w from '../model/World.js'
	
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

<style>
	#locale_shown {
		flex-grow: 1;
		
		display: flex;
		flex-direction: column;
	}
	
	#shown_locale_info {
		flex-grow: 1;
		
		border-top: 1px solid white;
		background: #7c98b3;
		padding: 20px; /* TODO: turn into a var for leftmost content, including the control bar too */
	}
	
	.window {
		border: 4px solid #eee;
		border-radius: 4px;
		padding: 0.5em 1.3em 1.2em;
		max-width: 400px;
		color: #eee;
	}
	
	.window h2 {
		text-transform: uppercase;
		font-weight: bold;
		font-size: 0.8em;
		letter-spacing: 0.05em;
		margin-top: 0.4em;
	}
</style>