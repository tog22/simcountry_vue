/*
** Simple shared data store
** 
** (A lighter weight alternative to using Vuex.)
**
*/

import Vue from 'vue';

const state = new Vue({
  data () {
	return {
	  test: "state's init val"
	}
  },
});

export default state;
	 
// Method from another tute, not used:
//
// export default Vue.observable({
// 	running: false,
// 	test: 'initial string'
// });