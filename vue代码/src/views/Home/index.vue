<template>
	<div>
		<span>1</span>
		<button @click="">按钮</button>
		<span>这是主页</span>
		<mi-nav></mi-nav>
	</div>

</template>


<script type="text/ecmascript-6">
        import MiNav from "../../components/mi-nav";

        export default {
                name: "home",
                components: {
                        "mi-nav": MiNav,
                },
	        data(){
                        return {
                                i:1,
		        }
	        },
//                创建
                beforeCreate(){
                        console.log(11111);
                },
                created(){
                        console.log(222);
        //                        this.$confirm("要下课吗")
        //	                        .then(() =>{this.$alert()})
        },
//        挂载
                beforeMount(){
                        console.log(3333);
                },
                mounted(){
                        console.log(444);

                },
//        更新
                beforeUpdate(){
                        console.log(555);
                },
                updated(){
                        console.log(666);
                },
//        销毁
                beforeDestroy(){
                        console.log(777);
                },
                destroyed(){
                        console.log(77888);
                },
	        methods: {

	        },
        }
</script>


<style scoped>
	span {
		color: blue;
	}
</style>