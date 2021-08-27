<template>
	<World_Viewer/>
</template>

<script>
	import World_Viewer from './ui/World_Viewer.vue'
	
	export default {
		name: 'World',
		components: {
			World_Viewer
		},
		data() {
			return {
				objects: [
					// Locales, buildings et al get loaded here
				],
				next: 0,	// Next object id
				c: -1,		// Current object id
				cll: null,	// Currently loading locale
				names: {
					people: {
						m: [
							'Joseph',
							'Joe',
							'Frank',
							'Stewart',
							'Frederick',
							'Andrew',
							'The Donk'
						]
					}
				}
			}
		},
		mounted() {
			this.objects[this.next] = 'Specification of first locale';
		}
	}
</script>