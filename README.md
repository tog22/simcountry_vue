SimCountry
==========

See and shape the economy of a growing country (or settlement, or colony, or region, or world, or any other community)

## Installation

SimCountry is built on Vue 2.

`package.json` in the directory 'Outside src' may or may not be up to date. Here are some key packages to install:

	npm install -save jquery
	
These ones aren't used as of writing, but may be helpful additions:

* v-menu-multi-level
* @innologica/vue-dropdown-menu
* lodash

## Files not in this repository, to recreate 

You'll need to recreate these files.

### worlds/testing_values.js

````
let testing_values = {
	start_paused:			false,
	lumberjack_overload:	true
}

export default testing_values
````