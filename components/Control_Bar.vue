<template>
	<div id="control_bar">
		<div class="time_control control first">
			<span id="play_pause" class="btn">
				▶️ <!-- ⏸ -->
			</span>
			<span class="label">
				<span id="timer">
					Day <span id="day">1</span>
				</span>
			</span>
		</div>
		<div class="add_control control w_dropdown">
			<div class="dropdown">
				<div class="s_item" sc-action="add_lumber_mill" accesskey="f">
						Lumber Mill
				</div>
				<div class="s_item" sc-action="add_farm">
					Farm
				</div>
			</div>
			<span class="btn">
				⤵️
			</span>
			<!-- 
			<div class="btn_ol_and_bg">
				<img class="btn_bg" src="graphics/ui/button.png">
				<div class="btn_ol">
					+
				</div>
			</div>
			-->
			<span class="label">
				Add
			</span>
		</div>		
	</div>
</template>

<script>
	export default {
		name: 'Control_Bar',
		components: {
		}
	}
</script>

<style>

</style>
