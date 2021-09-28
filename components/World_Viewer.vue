<template>
	<Locale :locale_id="locale" />
</template>

<script>
	import Locale from './Locale'
	
	export default {
		name: 'World_Viewer',
		props: {
			locale: {
				required: true,
				type: Number
			}
		},
		components: {
			Locale
		}
	}
</script>