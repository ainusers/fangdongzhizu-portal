<style lang="scss">
@import "@/style/chat/style.scss"; 
.send .btn{
	background: linear-gradient(to right, #129ef1, #2c93eb) !important;
}
.userImage{
	.avatar{
		width:80upx;
		height:80upx
	}
}
</style>

<template>
	
</template>

<script>
import {connectSocket} from '@/utils/scoket.js'

export default {
	data() {
		return {
			
		};
	},
	methods: {
		
	},
	mounted() {
		connectSocket();
	}
}

</script>