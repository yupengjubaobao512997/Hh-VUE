<template>
	<div class="container">
		<div class="top" @click="gototop" v-show="rocketShow"><i class="iconfont icontop"></i></div>
		<div class="page-header">
			<div class="page-header-box">
				<div class="back-btn">
					<router-link to="/category">
						<i class="iconfont iconback back"></i>
					</router-link>
				</div>
				<div class="search">
					<div class="tag">
						<input type="text" class="search_input" @change="search" v-model="name">
					</div>
				</div>
				<div class="model">
					<i class="iconfont iconList " v-show="showMode"
					   @click="showMode = !showMode"></i>
					<i class="iconfont iconcate" v-show="!showMode"
					   @click="showMode = !showMode"></i>
				</div>
			</div>
		</div>
		<div class="page-content">
			<div class="page-content_top">
				<ul class="page-content-options">
					<li class="sort">
						<div>
							<span class="asc appear" v-show="orderDir === 'asc'"
							      @click="changeOrderDir('desc') ">
								升序
								<i class="iconfont iconascending"></i>
							</span>
							<span class="desc" v-show="orderDir ==='desc'"
							      @click="changeOrderDir('asc')">
								降序
								<i class="iconfont icondescending"></i>
							</span>
						</div>
					</li>
					<li class="prices " :class="{active: orderCol === 'price'}"
					    @click="changeOrderCol('price')">
						<span>价格</span>
					</li>
					<li class="comments" :class="{active: orderCol === 'rate'}"
					    @click="changeOrderCol('rate')">
						<span>好评</span>
					</li>
					<li class="saleVolume" :class="{active: orderCol === 'sale'}"
					    @click="changeOrderCol('sale')">
						<span>销量</span>
					</li>
				</ul>
			</div>
			<div class="page-content-under hide-scrool" ref="scroll">
				<div class="scroll-content">
					<ul class="page-content-list" :class="{listCate:showMode }">
						<li v-for="item in list">
							<router-link :to="`/detail/${item.id}`">
								<div class="page-content-list_left">
									<img :src="`${item.avatar}`"></div>
								<div class="page-content-list_right">
									<h3 class="productName"
									    v-text="item.name"></h3>
									<div class="brief"
									     v-text="item.brief"></div>
									<div class="features"></div>
									<div class="price">￥<span
										v-text="item.price"></span></div>
									<div class="sale">销量：<span
										v-text="item.sale"></span></div>
									<div class="comment">好评：<span
										v-text="item.rate"></span></div>
								</div>
							</router-link>
						</li>
					</ul>
					<p class="info" v-text="info">

					</p>
				</div>
			</div>
		</div>
	</div>

</template>


<script type="text/ecmascript-6">
        import IScroll from "iscroll/build/iscroll-probe";
        import imagesLoaded from 'imagesloaded';

        export default {
                name: "List",
                data(){
                        return {
                                list: [],
                                name: "",                                                       //用户输入的查询条件
                                cid: parseInt(this.$route.params.cid),            //上一个页面传过来的商品种类cid
                                orderDir: "asc",                                                //排序的方向
                                orderCol: "price",                                          //排序的键名
                                pageSize: 6,                                                    //每次请求数据的数量
                                rocketShow: false,
                                showMode: false,                                         //标识当前商品列表显示模式
                                isTriggerLoadMore: false,
                                isLoading: false,                                               //标识当前是否有ajax请求未完成，处于加载状态
                                hasMore: true,
                        };
                },
                created(){
                        this.getData();
                },
                methods: {
                        search(){               //搜索， 请求数据
                                this.getData();
                        },
                        getData(isLoadMore = false){
                                if(!isLoadMore){
                                        this.list = [];
                                        this.rocketShow = false;
                                } ;
                                this.isLoading = true;                  //进入加载状态
	                        this.$http({
                                        method: "post",
                                        url: "/product/list",
                                        data: {
                                                name: this.name,
                                                cid: `${this.cid}`,
                                                orderCol: this.orderCol,
                                                orderDir: this.orderDir,
                                                begin: isLoadMore?this.list.length:0,
                                                pageSize: this.pageSize,
                                        }
	                        })
		                        .then(data => {
                                                this.list = this.list.concat(data);
                                                this.isLoading = false;                //退出加载状态
                                                this.hasMore = data.length === this.pageSize;
		                        });

                        },
                        changeOrderDir(dir){
                                if(this.isLoading){
                                        alert("亲，您的操作太频繁了");
                                        return;
                                }
                                this.orderDir = dir;
                                this.getData();
                        },
                        changeOrderCol(col){
                                if(this.isLoading){
//                                        alert("亲，您的操作太频繁了");
	                                this.$notice("亲，您的操作太频繁了");
                                        return;
                                }
                                this.orderCol = col;
                                this.getData();
                        },
                        initOrRefrechScroll(){
                                this.$nextTick(() =>{                           //保证list变化导致dom更新完毕
                                        imagesLoaded(this.$refs.scroll, () =>{               //保证滚动区内的所有的图片加载完毕
                                                this.$nextTick(() =>{          //保证滚动区域内的所有图片渲染完毕
                                                        if(!this.scroll){
                                                                this.scroll = new IScroll(this.$refs.scroll, {
                                                                        click: true,                                //开启iscroll的点击事件
                                                                        deceleration: 0.003,                 //设置iscroll滚动的阻尼系数
                                                                        bounce: false,                           //关闭iscroll的边界回弹效果
                                                                        probeType: 2                               //开启监听滚动
                                                                });
                                                                this.scroll.on('scroll', () =>{
                                                                        this.rocketShow = Math.abs(this.scroll.y)>=180;
                                                                        if(this.isLoading || !this.hasMore) return;
                                                                        this.isTriggerLoadingMore = this.scroll.y === this.scroll.maxScrollY
                                                                });
                                                                this.scroll.on("scrollEnd", () =>{
                                                                        if(this.isTriggerLoadingMore){
                                                                                this.isTriggerLoadingMore = false;
                                                                                this.getData(true);
                                                                        }
                                                                })
                                                        }else{
                                                                this.scroll.refresh()
                                                        }
                                                });
                                        });
                                });
                        },
						gototop(){
							this.scroll.scrollTo(0,0,500);
						}

                },
				computed: {
					info(){
					if(this.isLoading) return "加载中..";
					else if (this.isTriggerLoadMore) return '放手立即加载..';
                                else if (this.hasMore) return '上拉加载更多..';
                                else if (this.list.length === 0) return '暂无相关商品，敬请期待..';
                                else return '已到达底部...'
					}
				},
				watch: {     //监听指定数据的的变化，做一系列你想做的事情
							showMode(){
									this.initOrRefrechScroll()
							},
							list(){
                                this.initOrRefrechScroll()
							}
					},
				beforeDestroy(){
                                //页面销毁前，释放iscroll实例（instance）对象占用的内存
                        this.scroll.destroy();
                        this.scroll = null;
				}
        };
</script>


<style scoped>
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.top {
		width:8vw;
		height:8vw;
		border-radius: 4vw;
		background-color: #e0e0e0;
		position: fixed;
		right: 3vw;
		bottom: 8vw;
		z-index: 20;
		font-size: 5vw;
		text-align: center;
	}
	.page-header {
		height: 12vw;
		flex-shrink: 0;
	}

	.page-content {
		flex-grow: 1;
		display: flex;
		overflow: hidden;
		flex-direction: column;
	}

	.page-header-box {
		height: 100%;
		display: flex;
		align-items: center;
	}

	.page-header-box > div {
		height: 100%;
		display: flex;
		align-items: center;
	}

	.back-btn {
		padding-left: 5vw;
		flex-shrink: 0;
		margin-right: 3vw;
	}

	.page-header-box .iconfont {
		font-size: 6vw;
	}

	.page-header-box .search {
		height: 80%;
		flex-grow: 1;
		background-color: #E0E0E0;
		border-radius: 5vw;
		box-sizing: border-box;
	}

	.model {
		flex-shrink: 0;
	}

	.tag {
		margin-left: 3vw;
		height: 75%;
		border-radius: 4vw;
	}

	.tag > input {
		border: none;
		outline: none;
		height: 100%;
		width: 65vw;
		border-radius: 10vw;
		background-color: #E0E0E0;
	}

	.iconList, .iconcate {
		margin: 0 3vw;
	}

	.page-content_top {
		height: 9.6vw;
		flex-shrink: 0;
	}

	.page-content-under {
		flex-grow: 1;
		overflow: hidden;
		touch-action: pan-y; /*消除iscroll滚动警告 */
		background-color: #F4F4F4;
	}
	p.info{
		height:50px;
		text-align: center;
		line-height: 50px;
		color: #666;
		font-size: 3vw;
	}
	ul.page-content-options {
		display: flex;
		height: 100%;
		align-items: center;
	}

	ul.page-content-options li {
		width: 20%;
		text-align: center;
	}

	ul.page-content-list {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	ul.page-content-list li {
		padding: 2vw;
		font-size: 3vw;
		background-color: #fff;
		display: flex;
	}

	ul.page-content-list > li a {
		color: #666;
		display: flex;
		width: 100%;
	}

	.page-content-list_right {
		flex-grow: 1;
		overflow: hidden;
	}
	.page-content-list_left{
		width: 33.6vw;
	}
	.page-content-list_left img {
		width: 33.6vw;
		height: 33.6vw;
	}

	.brief, .productName {
		display: inline-block;
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.productName {
		font-size: 3.9vw;
		font-weight: 400;
		margin: 1.7vw 0;
		color: #333;
	}

	.brief {
		margin: 1.4vw 0;

	}

	.price {
		color: orangered;
	}

	.price span {
		font-size: 3.5vw;
		margin: 2vw 0 0 0;
		color: orangered;
	}

	.sale {
		margin: 1.4vw 0;
	}

	.comment {
		margin: 1.4vw 0;
	}



	.scroll-content ul.page-content-list.listCate {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	ul.page-content-list.listCate li {
		margin-left: 3vw;
		margin-top: 3vw;
		font-size: 2.666666vw;
		border-radius: 3vw;
		width: 42vw;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	ul.page-content-list.listCate > li a {
		flex-direction: column;
	}

	ul.page-content-list.listCate > li img {
		width: 42vw;
		height: 42vw;
	}

	ul.page-content-list.listCate > li h3, ul.page-content-list.listCate > li > div {
		width: 42vw;
	}

	ul.page-content-list.listCate .sale, ul.page-content-list.listCate .comment {
		display: inline-block;
	}

	li.prices, li.comments, li.saleVolume {
		color: #666;
		font-weight: 400;
	}

	li.prices.active, li.comments.active, li.saleVolume.active {
		color: #ff5500;
		font-weight: 600;
	}
</style>
