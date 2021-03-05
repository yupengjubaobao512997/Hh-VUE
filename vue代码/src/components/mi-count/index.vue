<template>
	<div>
		<button class="dec-btn" :disabled="count === 1" @click.prevent="decreaseHandler">-</button>
		<span class="count-inp" v-text="count"></span>
		<button class="add-btn" :disabled="count === maxCount" @click.prevent="increaseHandler">+</button>
	</div>
</template>



<script type="text/ecmascript-6">
        export default {
                props: {	//props节点用于组件对外公开属性，父组件可以用对外公开属性进行传值
                        count: {
                                type: Number,
                                required: true,
                        },
                        maxCount: {
                                type: Number,
                                default: 5
                        },

                },
                methods: {
                        increaseHandler(){
                                this.$emit("increase");
                                this.$emit("update:count", this.count + 1);
                        },
                        decreaseHandler(){
                                this.$emit("decrease");
                                this.$emit("update:count", this.count - 1);
                        }
                }
        }
</script>



<style scoped>
	.dec-btn,.count-inp,.add-btn{
		border: none;
		outline: none;
		height: 6vw;
		width:6vw;
	}
</style>