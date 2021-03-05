<template>

		<div class="page-container">
			<div class="detail-page-header">
				<div class="page-header_box">
					<div class="page-header_back-btn">
						<i class="iconfont iconback"></i>
					</div>
					<div class="page-header_option">
						<ul class="page-header_option-list">
							<li>
								<a href=""><span>商品</span></a>
							</li>
							<li>
								<a href=""><span>评价</span></a>
							</li>
							<li>
								<a href=""><span>详情</span></a>
							</li>
							<li>
								<a href=""><span>推荐</span></a>
							</li>
						</ul>
					</div>
					<div class="page-header_list-btn">
						<div></div>
						<div>
							<div class="conceal"><i class="iconfont iconconceal"></i></div>
							<div class="sign"></div>
							<ul class="conceal_list">
								<li><span><i class="iconfont iconhome"></i></span>
									<span>首页</span></li>
								<li class="favorite">
								<span>
									<i class="iconfont iconstar1 "></i>
									<i class="iconfont iconstar show"></i>
								</span>
									<span>收藏</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="page-content">
				<div class="hide-scrool">
					<div class="page-content_banner" ref="scroll">
						<ul class="scroll-content" ref="scrollContent">
							<li>
								<img :src="banner[banner.length - 1]" alt=""/>
							</li>
							<li v-for="(item, i) in banner" :key="i">
								<img :src="item" alt=""/>
							</li>
							<li>
								<img :src="banner[0]" alt=""/>
							</li>
						</ul>
					</div>
					<div class="seckill">
					</div>
					<div class="page-content_op">
						<ul class="page-content_op-list">
							<li class="page-content_op-list-item">
								<div class="item_price">
									<div class="price">￥<span
										v-text="goodsDetails.price"></span>
									</div>
									<div class="favorite">
										<span><i
											class="iconfont iconstar1 "></i></span>
										<span><i
											class="iconfont iconstar show"></i></span>
										<span>收藏</span>
									</div>
								</div>
							</li>
							<li class="page-content_op-list-item">
								<div class="item_introduce">
									<h3 class="prodocut-name">
										<span><img
											src="https://m.xiaomiyoupin.com/youpin/static/m/res/images/common/tag_self.png"
											alt=""></span>
										<span v-text="goodsDetails.name"></span>
									</h3>
									<p class="prodocut-introduce"
									   v-text="goodsDetails.brief"></p>
								</div>
							</li>
							<li class="blank"></li>
							<li class="page-content_op-list-item">
								<div class="item_installment">
									<div class="item-title" @click="">分期</div>
									<div class="item_right">
										<div class="item_right_left">可选3/6/12期
										</div>
										<div>
											<i class="iconfont iconprevpage"></i>
										</div>
									</div>
								</div>
							</li>
							<li class="blank"></li>
							<li class="page-content_op-list-item">
								<div class="item_quantity">
									<div class="item-title" @click="">已选</div>
									<div class="item_right">
										<div class="item_right_left">
											<span>1</span>件
										</div>
										<div>
											<i class="iconfont iconprevpage"></i>
										</div>
									</div>
								</div>
								<div class="item_address item_addresses">
									<div class="item-title">送至</div>
									<div class="item_right">
										<div class="item_right_left">
											<div class="address">
												<input type="text"
												       class="regions-picker input"/>
												<div class="inventory">
													有货
												</div>
											</div>
										</div>
										<div>
											<i class="iconfont iconprevpage"></i>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div class="productDetails" v-for="item in images">
						<div><img :src="item"></div>
					</div>
				</div>
			</div>
			<div class="page-footer">
				<div class="page-footer-content">
					<div class="page-footer-content_left">
						<div class="logo-btn">
							<router-link to="/home">
								<span><img src="https://m.xiaomiyoupin.com/youpin/static/m/res/images/product/mi_shop_icon.png"alt=""></span>
								<span>小米</span>
							</router-link>
						</div>
						<div class="cart-btn">
							<router-link to="/cart">
								<span class="count"></span>
								<span><i class="iconfont iconcart"></i></span>
								<span class="cartText">购物车</span>
							</router-link>
						</div>
					</div>
					<div class="page-footer-content_right">
						<div class="addCart-btn" @click="addCart">
							<span>加入购物车</span>
						</div>
						<div class="immediatelyBuy-btn">
							<span>立即购买</span>
						</div>
					</div>
				</div>
			</div>
			<!--<mi-alert :show.sync="show" text="" :class="align">-->
				<!--<mi-dialog>-->
					<!--<div class="addCart-content">-->
						<!--<div class="content_top">-->
							<!--<div class="content_top-img">-->

							<!--</div>-->
							<!--<div class="content_top_right">-->

							<!--</div>-->
							<!--<div class="content_top_close">-->
								<!--<span><i class="iconfont icondelete2"></i></span>-->
							<!--</div>-->
						<!--</div>-->
						<!--<div class="content_bottom">-->
							<!--<div class="content-amount">-->
								<!--<div class="content-amount-title">数量</div>-->
								<!--<mi-count></mi-count>-->
							<!--</div>-->
							<!--<div class="content_footer">-->
								<!--<div class="content_footer-btn">-->
									<!--<div class="footer-addCart-btn">加入购物车</div>-->
									<!--<div class="footer-immediatelyBuy-btn">立即购买</div>-->
								<!--</div>-->
							<!--</div>-->
						<!--</div>-->
					<!--</div>-->
				<!--</mi-dialog>-->
			<!--</mi-alert>-->
		</div>


</template>


<script type="text/ecmascript-6">
        import imagesLoaded from "imagesloaded";
        import IScroll from "iscroll";


        export default {
                name: "Detail",
                data: function(){
                        return {
                                goodsDetails: {},
                                id: parseInt(this.$route.params.id),
                                images: [],
                                banner: [],
                        };
                },
                watch: {
                        banner(){
                                this.$refs.scrollContent.style.width = (this.banner.length + 2) + "00%";
                                this.$nextTick(() =>{
                                        imagesLoaded(this.$refs.scrollContent, () =>{
                                                this.$nextTick(() =>{

                                                        this.scroll = new IScroll(this.$refs.scroll, {
                                                                scrollY: false,                 //关闭默纵向滚动
                                                                scrollX: true,                  //开启横向滚动
                                                                snap: true,                      //开启轮播图模式滚动
                                                                momentum: false,          //关闭惯性滚动
                                                        });
                                                        this.scroll.on("scrollStart", () => clearTimeout(this.timer));
                                                        this.scroll.on('scrollEnd', () =>{
                                                                this.scroll.disable();
                                                                if(this.scroll.currentPage.pageX === 0)
                                                                        this.scroll.goToPage(this.banner.length, 0, 0);

                                                                else if(this.scroll.currentPage.pageX === this.banner.length + 1)
                                                                        this.scroll.goToPage(1, 0, 0);
                                                                else{
                                                                }
                                                                this.scroll.enable();
                                                                this.timer = setTimeout(() =>{
                                                                        this.scroll.next()
                                                                }, 5000)
                                                        })
                                                        // 因为做了无缝所以默认显示最后一张，我们要初始化滚到第二张
                                                        this.scroll.goToPage(1, 0, 0);
                                                        this.timer = setTimeout(() => this.scroll.next(), 5000);
                                                });
                                        });
                                });
                        }
                },
                methods: {
//                        quantity(){
//
//                        },
                        addCart() {
                                if(!sessionStorage.getItem("token")) {
                                        this.$notice("添加购物车失败，请登录后再进行操作")
	                                        .then()
                                }else{
                                        this.$http({
                                                method: "post",
                                                url:"/cart/add",
                                                data: {
                                                        pid: this.id,
                                                        count: 1,
                                                },
                                        })
                                                .then(data => {
                                                        this.$notice("添加购物车成功")
                                                })
                                }




                        }

                },
                created: function(){
                        console.log(this.id)
                        this.$http({url: "/product/model/" + this.id})
                                .then(product =>{
                                        this.goodsDetails = product;
                                        console.log(this.goodsDetails);
                                        this.banner = this.goodsDetails.bannerImgs.split(','),
                                                this.images = this.goodsDetails.otherImgs.split(",")
                                })

                }
        }
</script>


<style scoped>

	.page-content_banner {
		width: 100%;
		overflow: hidden;
		touch-action: pan-x;
	}

	ul.scroll-content {
		white-space: nowrap;
		font-size: 0;
	}

	ul.scroll-content li {
		display: inline-block;
		width: 100vw
	}

	ul.scroll-content li img {
		width: 100%
	}

	.page-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.detail-page-header {
		height: 12vw;
		width: 100%;
		flex-shrink: 0;
		background-color: #fff;
		position: fixed;
		left: 0;
		top: 0;
		/* display: none; */
		z-index: 5000;
		opacity: 0.7;
	}

	.page-content {
		flex-grow: 1;
		background-color: #F8F8F8;
		overflow: hidden;
	}

	.page-footer {
		height: 14.666666vw;
		border-top: 1px solid #999;
		background-color: #fff;
		flex-shrink: 0;
	}

	.swiper-pagination-fraction {
		text-align: right;
		color: #999;
	}

	.page-content > div {
		height: 100%;
		overflow: auto;
	}

	.page-header_box {
		height: 100%;
		box-sizing: border-box;
		padding: 0 3vw;
		display: flex;
		align-items: center;
	}

	.page-header_back-btn {
		margin-right: 15vw;
		flex-shrink: 0;
		line-height: 8vw;
	}

	.page-header_list-btn > div:nth-child(2) {
		border-radius: 50%;
		margin-left: 8vw;
		height: 8vw;
		background-color: rgba(48, 48, 48, 0.5);
		position: relative;
	}

	ul.page-header_option-list {
		display: flex;
	}

	ul.page-header_option-list > li {
		margin-left: 5vw;
	}

	i.iconback {
		font-size: 8vw;
		color: #666;
	}

	.page-header_list-btn > div :nth-child(2) {
		height: 8vw;
		line-height: 8vw;
	}

	.conceal {
		width: 8vw;
		height: 100%;
		line-height: 8vw;
		text-align: center;
	}

	.conceal_list.show {
		display: block;
	}

	i.iconconceal {
		font-size: 5vw;
		color: #fff;
	}

	ul.conceal_list {
		display: none;
		position: absolute;
		left: -29vw;
		top: 10vw;
		background-color: rgb(255, 255, 255);
	}

	ul.conceal_list > li {
		height: 10vw;
		width: 40vw;
	}

	i.iconstar1 {
		color: orangered;
	}

	.page-content_banner {
		width: 100vw;
		height: 100vw;
		overflow: hidden;
	}

	.swiper-container {
		width: 100vw;
		height: 100vw;
	}

	.swiper-slide img {
		width: 100vw;
		height: 100vw;
	}

	ul.page-content_op-list li {
		padding: 0 3vw;
		background-color: #fff
	}

	ul.page-content_op-list .blank {
		background-color: #F8F8F8;
		width: 100%;
		height: 3vw;
	}

	ul.page-content_op-list li > div div {
		display: flex;

	}

	.item_price {
		height: 5vw;
		width: 100%;
		padding: 2vw 0 2vw 0;
	}

	.price {
		float: left;
	}

	.favorite {
		float: right;
	}

	.favorite i {
		font-size: 4vw;
		margin-right: 3vw;
		height: 5vw;
		line-height: 5vw;
	}

	.iconstar, .iconstar1 {
		display: none;
	}

	.iconstar.show, .iconstar1.show {
		display: inline-block;
	}

	.prodocut-name {
		font-weight: 600;
		font-size: 4.533333vw;
		height: 6.4vw;
		line-height: 6.4vw;
	}

	.prodocut-name img {
		height: 5vw;
		vertical-align: middle;
	}

	.prodocut-introduce {
		font-size: 3.4666666vw;
		color: #666;
		margin-top: 2vw;
	}

	.item_quantity, .item_installment, .item_address {
		height: 13.333333vw;
		display: flex;
		font-size: 3.4666666vw;
	}

	.item_addresses {
		height: 21.333333vw;
	}

	.item-title {
		margin: 16px 17px 0 12px;
		font-weight: bold;
	}

	.item_right {
		height: 13.333333vw;
		align-items: center;
	}

	.item_right_left {
		width: 70vw;
	}

	.iconprevpage {
		color: #999;
		font-weight: 100;
	}

	.address {
		flex-wrap: wrap;
		align-items: center;
		height: 21.333333vw;
		box-sizing: border-box;
		padding-top: 17px;
		padding-bottom: 17px;
		width: 100%;
	}

	.inventory {
		height: 6vw;
		line-height: 6vw;
	}

	input.input {
		width: 100%;
		height: 6vw;
		line-height: 6vw;
		border: none;
		outline: none;
		margin-top: 3vw;
	}

	.page-footer-content {
		height: 100%;
		display: flex;
		align-items: center;
		padding: 0 3vw;
	}

	.page-footer-content_left, .page-footer-content_right {
		display: flex;
	}

	.logo-btn a, .cart-btn a {
		width: 10.666666vw;
		height: 100%;
		display: flex;
		font-size: 2.4vw;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.count {
		display: none;
		position: absolute;
		top: -1vw;
		right: -1vw;
		width: 6vw;
		height: 4vw;
		line-height: 4vw;
		text-align: center;
		font-size: 3vw;
		color: #fff;
		border-radius: 2vw;
		background-color: #D91A15;
	}

	.count.show {
		display: inline-block;
	}

	.addCart-btn, .immediatelyBuy-btn {
		width: 33.866666vw;
		height: 10.133333vw;
		text-align: center;
		color: #fff;
		line-height: 10.133333vw;
	}

	.logo-btn img {
		height: 6.666666vw;
		width: 6.666666vw;
	}

	.iconcart {
		position: absolute;
		top: -2vw;
		right: 2.5vw;
		font-weight: 700;
		font-size: 7vw;
		color: black;
	}

	.cartText {
		position: absolute;
		top: 7vw;
		color: black;
	}

	.page-footer-content_right {
		margin-left: 5vw;
		border-radius: 10vw;
		overflow: hidden;
	}

	.addCart-btn {
		background-color: #DFB455;
	}

	.immediatelyBuy-btn {
		background-color: #D91A15;
	}

	.amortize, .addCart {
		display: none;
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 10000;
		background-color: rgba(13, 85, 85, 0.5)
	}

	.amortize.active, .addCart.active {
		display: block;
	}

	.amortize-content, .addCart-content {
		position: absolute;
		bottom: -8vw;
		height: 134.333333vw;
		width: 100%;
		background-color: #fff;
		border-radius: 8vw;
	}

	.content_top {
		height: 102px;
		padding: 5vw;
	}

	.content_top-img {
		float: left;
		width: 102px;
		height: 102px;
	}

	.content_top-img img {
		width: 102px;
		height: 102px;
	}

	.content_top_right {
		float: left;
		margin: 5vw 0 0 5vw;
	}

	.content_top_close {
		float: right;
		width: 5vw;
		height: 5vw;
	}

	.content_bottom {

	}

	.content-amount {
		height: 10vw;
	}

	.content-amount-title {
		float: left;
		margin-left: 5vw;
		line-height: 5vw;
	}

	.modified {
		float: right;
		margin-right: 5vw;
		height: 8vw;
		border-radius: 3vw;
		overflow: hidden;
		border: 1px solid #999;
	}

	.dec-btn, .amount_input, .add-btn {
		height: 100%;
		border: none;
		outline: none;
	}

	.dec-btn, .add-btn {
		width: 8vw;
		font-size: 5vw;
	}

	.dec-btn.active, .add-btn.active {
		color: #999;
	}

	.amount_input {
		width: 8vw;
		text-align: center;
	}

	.content_footer {
		height: 44px;
		width: 100%;
		position: absolute;
		bottom: 8vw;
		margin-bottom: 4vw;

	}

	.content_footer-btn {
		display: flex;
		width: 90%;
		height: 44px;
		margin: 0 auto;
		border-radius: 10vw;
		text-align: center;
		line-height: 44px;
		overflow: hidden;
		color: #fff;
		font-weight: 700;
	}

	.footer-confirm-btn {
		width: 100%;
		background-color: #D91A15;
	}

	.footer-addCart-btn {
		width: 50%;
		background-color: #DFB455;
	}

	.footer-immediatelyBuy-btn {
		width: 50%;
		background-color: #D91A15;
	}

	.productDetails {
		font-size: 0;
	}

	.productDetails img {
		width: 100%;
	}
</style>