<template>
	<div>
		<u-modal v-model="Model" content="加载中..." width='auto' :content-style="{fontSize:'12rpx'}" :show-title="false" :show-confirm-button="false" >
		</u-modal>
	</div>
</template>

<script>
	export default{
		props:['Model']
	}
</script>

<style>
</style>