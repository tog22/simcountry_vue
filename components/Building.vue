<template>
	<div class="biz lumber_mill t" id="v1">
		<img src="graphics/Buildings/SawMill.png">
	</div>
</template>

<script>
	export default {
		name: 'Building',
		props: {
			id: {
				required: true,
				type: Number
			}
		}
	}
</script>