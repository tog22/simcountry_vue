// !• The core loop

// !•• Update, draw, then loop

import w from '../model/World.js'
import ds from '../aspects/store.js'

export default function start_loop() {
	setTimeout(loop, 2000);
}

export function loop() {
	update();
	setTimeout(loop, 500);
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