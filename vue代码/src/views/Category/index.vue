<template>
	<div class="category">
		<div class="category-page-container">
			<div class="category-page-header"></div>
			<div class="category-page-content">
				<div class="category-page_left">
					<ul class="list-main">
						<li v-for="item in listMain" :key="item.id"
						    :class="{active: item.id === activeId}" @click="toggleId(item.id)">
							<span v-text="item.name"></span>
						</li>
					</ul>
				</div>
				<div class="category-page_right">
					<img :src="`${avatar}`" alt="" class="avatar">
					<div class="category-page_right-box">
						<ul class="list-sub" v-if="listSub.length">
							<li v-for="item in listSub" :key="item.id">
								<router-link :to="`/list/${item.id}`">
									<img :src="`${item.avatar}`"
									     alt=""/>
									<span v-text="item.name"></span>
								</router-link>
							</li>
						</ul>
						<p v-else></p>
					</div>
				</div>
			</div>
			<div class="category-page-footer">
				<mi-nav></mi-nav>
			</div>
		</div>
	</div>
</template>


<script type="text/ecmascript-6">
	import MiNav from "../../components/mi-nav";
	export  default {
	        name: "Category",
		components: {
	                "mi-nav": MiNav,
		},
                data: function(){
                        return {
                                listMain: [],
                                activeId: 0,   //记录当前激活的一级分类
                                avatar: "",
                                listSub: []
                        };
                },
                methods: {
                        toggleId: function (id) {
                                if (this.activeId === id) return;
                                this.activeId = id;
                                this.avatar = this.listMain.find(item => item.id === id).avatar;
                                this.$http({url: "/category/list/" + id})
	                                .then(data => this.listSub = data);
                        }
                },
                created: function () {
                        //使用axios发送ajax请求一级分类的数据
	                this.$http({url: "/category/list/0"})
		                .then(data => {
                                        this.listMain = data;
                                        this.toggleId(this.listMain[0].id);
		                });
                }
	};
</script>


<style scoped>
	
	.active{
		color:#f00;
	}
	.category{
		height: 100%;
	}
	.category-page-container{
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.category-page-header{
		height: 45px;
		flex-shrink: 0;
	}
	.category-page-content{
		flex-grow: 1;
		display: flex;
		border-top: 1px solid #e0e0e0;
		border-bottom: 1px solid #e0e0e0;
		overflow: hidden;
	}
	.category-page-footer{
		height: 50px;
		flex-shrink: 0;
	}
	.category-page_left{
		width: 100px;
		flex-shrink: 0;
		overflow: auto;
	}
	.category-page_right{
		flex-grow: 1;
		border-left: 1px solid #E0E0E0;
		background-color: #eee;
		overflow: auto;
	}
	.category ul.list-main {
		display: flex;
		flex-direction: column;
	}

	.category ul.list-main li {
		padding: 13px 0;
		font-size: 13px;
		color: #666666;
		text-align: center;
	}

	.category ul.list-main span {
		padding: 2px 10px;
		border-radius: 10px;
	}

	.category ul.list-main li.active span{
		background-color: #b85c00;
		color: #EEEEEE;
	}

	.category img.avatar{
		width: 262px;
		height: 132px;
		margin: 5px;
		border-radius: 10px;
	}

	.category .page-content_right-box{
		background-color: #fff;
		border-radius: 10px;
		margin: 5px;

	}
	.category .title{height: 30px;padding: 5px 0 0 10px;line-height: 30px;}
	.category ul.list-sub{
		text-align: center;
		padding: 10px 0;

	}
	.category ul.list-sub>li{
		float: left;
		width: 80px;
		margin-left: 6px;
	}
	.category ul.list-sub>li img{
		width: 76px;
		height: 76px;
	}
	.category ul.list-sub>li a{color: #666;font-size: 11px;}
</style>