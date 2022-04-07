// Create building types

import w from '@/model/World'
import Building_Type from '@/model/Building_Type'

export default function import_building_types() {
	
	/**************************************
	**
	**    🪵  WOOD-BASED 
	**
	**************************************/
	
	let lumber_mill = w.btypes['Lumber Mill'] = new Building_Type('Lumber Mill');
	{
		lumber_mill.name = 'Lumber Mill'
		lumber_mill.graphic = 'SawMill.png'
		lumber_mill.resource_inputs['Trees'] = 1;
		lumber_mill.outputs['Lumber'] = 1;
		// No build requirements
	}
	
	/**************************************
	**
	**    🌾  AGRICULTURAL 
	**
	**************************************/
	
	let farm = w.btypes['Farm'] = new Building_Type('Farm');
	{
		farm.name = 'Farm'
		farm.graphic = 'farm.png'
		farm.outputs['Oats'] = 4;
		farm.food_is_output = true;
		farm.build_requirements['Lumber'] = 20;
		farm.resource_multipliers.locale_aspects = {}
		farm.resource_multipliers.locale_aspects['soil quality'] = 1; // todo: implement this
	}
	
	/**************************************
	**
	**    STONE-BASED
	**
	**************************************/
	
	let quarry = w.btypes['Quarry'] = new Building_Type('Quarry');
	{
		w.btypes['Quarry'].name = 'Quarry'
		w.btypes['Quarry'].graphic = 'StoneMine.png'
		w.btypes['Quarry'].outputs['Stone'] = 1;
		w.btypes['Quarry'].build_requirements['Lumber'] = 20;
	}
	
	let stone_toolmaker = w.btypes['Stone Toolmaker'] = new Building_Type('Stone Toolmaker');
	{
		w.btypes['Stone Toolmaker'].name = 'Stone Toolmaker'
		w.btypes['Stone Toolmaker'].graphic = 'cottage_generic.png'
		w.btypes['Stone Toolmaker'].labelled = true
		w.btypes['Stone Toolmaker'].inputs['Stone'] = 1;
		w.btypes['Stone Toolmaker'].outputs['Stone Tools'] = 1;
		w.btypes['Stone Toolmaker'].build_requirements['Lumber'] = 20;
	}
}