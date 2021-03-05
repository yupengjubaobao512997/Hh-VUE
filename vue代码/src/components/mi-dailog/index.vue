<template>
	<div class="mi-dialog" @click.self="close" v-show="show">
		<div class="mi-dialog-content" :class="align">
			<slot></slot>
		</div>
	</div>
</template>


<script type="text/ecmascript-6">
	export default {
                name:"MiDialog",
                props: {
                        show: {
                                type: Boolean,
                                required: true
                        },
                        align: {
                                type: String,
                                default: "center"
                        }
                },
                methods: {
                        close() {
                                this.$emit("close");
                                this.$emit("update:show", false);
                        }
                }
	};
</script>


<style scoped>
	.mi-dialog{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgb(0,0,0,0.5);
	}
	.mi-dialog-content{
		position: absolute;
		background-color: #fff;
	}
	.mi-dialog-content.center{
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		min-width: 60%;
		max-width: 85%;
	}
	.mi-dialog-content.bottom{
		left: 0;
		bottom: 0;
		width: 100%;
	}
</style>