<template>
	<div class="loading">
		<p>Loading...</p>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
	        name: "IsLoading",

	}
</script>

<style scoped>
	.loading{
		position: fixed;
		left:0;
		top:0;
		width:100%;
		height:100%;
		z-index:1000;
		background-color: rgba(255,255,255,0.9);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.loading p{
		color: #999;
	}
</style>