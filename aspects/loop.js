// !• The core loop

// !•• Update, draw, then loop

import w from '../model/World.js'
import ds from '../aspects/store.js'
import testing_values from '@/worlds/testing_values'

export default function start_loop() {
	setTimeout(loop, testing_values.day_speed);
}

export function loop() {
	update();
	setTimeout(loop, testing_values.day_speed);
}

function update() {
	if (!ds.meta.running) {
		return;
	}
	w.day++;
	w.objects[0].update();
	// for (var i in w.objects) 
	// {
	// 	w.objects[i].update(); 
	// }
}