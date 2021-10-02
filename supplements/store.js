/*
** Simple shared data store
** 
** (A lighter weight alternative to using Vuex.)
**
*/

import Vue from 'vue';

const ds = 
new Vue({
	data () {
		return {
			test: "Initial value for the data store's test property",
			meta: {
				running: false
			}
		}
	},
});

export default state;


/* Method from another tutorial, not used:

export default Vue.observable({
	running: false,
	test: 'initial string'
});

*/