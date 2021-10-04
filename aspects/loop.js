// !• The core loop

// !•• Update, draw, then loop

import w from '../model/World.js'
import ds from '../aspects/store.js'

export default function loop() {
	update();
	setTimeout(loop, 2000);
}

function update() {
	if (!ds.meta.running) {
		return;
	}
	w.day++;
	for (var i in w.objects) 
	{
		w.objects[i].update(); 
	}
}