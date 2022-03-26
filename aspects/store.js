/*
** Simple shared data store
** 
** (A lighter weight alternative to using Vuex.)
**
*/

import Vue from 'vue';

import testing_values from '@/worlds/testing_values'

const ds = 
new Vue({
	data () {
		return {
			test: "Initial value for the data store's test property",
			meta: {
				running: true
			}
		}
	},
});

if (testing_values.start_paused) {
	ds.meta.running = false
}

export default ds;


/* Method from another tutorial, not used:

export default Vue.observable({
	running: false,
	test: 'initial string'
});

*/