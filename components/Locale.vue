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
				
				<div class="biz lumber_mill t" id="v1">
					<img src="graphics/Buildings/SawMill.png">
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Locale',
	props: {
		locale: {
			required: true,
			type: Number
		}
	},
	components: {
	}
}
</script>