<template>
	<div class="window">
		<h2>
			Building info 
		</h2>
	<div class="s_content">
		<p>
			{{id}}
		</p>
	</div>
	</div>
</template>

<script>
export default {
	name: 'Building_Info',
	props: {
		id: {
			required: false,
			type: Number
		}
	},
	components: {
	}
}
</script>