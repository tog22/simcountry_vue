// Create building types

import w from '@/model/World'
import Building_Type from '@/model/Building_Type'

export default function import_building_types() {
	
	w.btypes['Lumber Mill'] = new Building_Type('Lumber Mill');
	w.btypes['Lumber Mill'].name = 'Lumber Mill'
	w.btypes['Lumber Mill'].graphic = 'SawMill.png'
	w.btypes['Lumber Mill'].resource_inputs['Trees'] = 1;
	w.btypes['Lumber Mill'].outputs['Lumber'] = 1;
	
	w.btypes['Farm'] = new Building_Type('Farm');
	w.btypes['Farm'].name = 'Farm'
	w.btypes['Farm'].graphic = 'farm.png'
	w.btypes['Farm'].outputs['Food'] = 4;
	w.btypes['Farm'].build_requirements['Lumber'] = 20;
	w.btypes['Farm'].resource_multipliers['soil quality'] = 1;
	
	w.btypes['Quarry'] = new Building_Type('Quarry');
	w.btypes['Quarry'].name = 'Quarry'
	w.btypes['Quarry'].graphic = 'StoneMine.png'
	w.btypes['Quarry'].outputs['Stone'] = 1;
	w.btypes['Quarry'].build_requirements['Lumber'] = 20;
	
	w.btypes['Stone Toolmaker'] = new Building_Type('Stone Toolmaker');
	w.btypes['Stone Toolmaker'].name = 'Stone Toolmaker'
	w.btypes['Stone Toolmaker'].graphic = 'cottage_generic.png'
	w.btypes['Stone Toolmaker'].labelled = true
	w.btypes['Stone Toolmaker'].inputs['Stone'] = 1;
	w.btypes['Stone Toolmaker'].outputs['Stone Tools'] = 1;
	w.btypes['Stone Toolmaker'].build_requirements['Lumber'] = 20;
	
}