<template>
	<div>
		<div class="page-container">
			<div class="page-header" @click="logIn">
				<div class="page_outbox">
					<div class="page-header_img"><img src="https://img.youpin.mi-img.com/shopcenter/415b0fd8150f58ee2b85caa2ee9cef8f.png"></div>
					<div class="page-header_name">
						<span v-text="userName" v-show="isLogin"></span>
						<span v-text="notLogin" v-show="!isLogin"></span>
					</div>
					<div class="page_sign"><img src="https://m.xiaomiyoupin.com/youpin/static/m/res/images/icons/icon_arrow_right_darkgray.png">
					</div>
				</div>
			</div>
			<div class="page-content">
				<div class="space"></div>
				<div>
					<div class="order_box">
						<a >
							<p>我的订单</p>
							<div class="page_sign"><img src="https://m.xiaomiyoupin.com/youpin/static/m/res/images/icons/icon_arrow_right_darkgray.png">
							</div>
						</a>
					</div>
					<div class="service_box">
						<div class="payment">
							<a href="">
								<img src="https://img.youpin.mi-img.com/shopcenter/1su4kcv21eg_22212270231600948691418.png">
								<span>待付款</span>
							</a>

						</div>
						<div class="goods">
							<a href="">
								<img src="https://img.youpin.mi-img.com/shopcenter/2rsi345c8a_22212270231600948691450.png">
								<span>待收货</span>
							</a>
						</div>
						<div class="evaluation">
							<a href="">
								<img src="https://img.youpin.mi-img.com/shopcenter/n9q7tuhs6ao_22212270231600948691455.png">
								<span>评价</span>
							</a>
						</div>
						<div class="after-sales">
							<a >
								<img src="https://img.youpin.mi-img.com/shopcenter/q69ib1u9teg_22212270231600948691439.png">
								<span>退款/售后</span>
							</a>
						</div>
					</div>
				</div>
				<div class="space"></div>
				<div>
					<div class="box">
						<a href="">
							<img src="https://m.xiaomiyoupin.com/youpin/static/m/res/images/ucenter/ucenter_icon_assets.png">
							<p>我的资产</p>
							<div class="page_sign"><img src="https://m.xiaomiyoupin.com/youpin/static/m/res/images/icons/icon_arrow_right_darkgray.png">
							</div>
						</a>

					</div>
					<div class="box">
						<a href="">
							<img src="https://m.xiaomiyoupin.com/youpin/static/m/res/images/ucenter/ucenter_icon_collection.png">
							<p>我的收藏</p>
							<div class="page_sign"><img src="https://m.xiaomiyoupin.com/youpin/static/m/res/images/icons/icon_arrow_right_darkgray.png">
							</div>
						</a>
					</div>
					<div class="address  box">
						<router-link to="/address">
							<img src="https://m.xiaomiyoupin.com/youpin/static/m/res/images/ucenter/ucenter_icon_address.png">
							<p>地址管理</p>
							<div class="page_sign"><img src="https://m.xiaomiyoupin.com/youpin/static/m/res/images/icons/icon_arrow_right_darkgray.png">
							</div>
						</router-link>
					</div>
					<div class="space"></div>
					<div class="box">
						<a href="">
							<img src="https://m.xiaomiyoupin.com/youpin/static/m/res/images/ucenter/ucenter_icon_qualifi.png">
							<p>资质证照</p>
							<div class="page_sign"><img src="https://m.xiaomiyoupin.com/youpin/static/m/res/images/icons/icon_arrow_right_darkgray.png">
							</div>
						</a>
					</div>
					<div class="box">
						<a href="">
							<img src="https://m.xiaomiyoupin.com/youpin/static/m/res/images/ucenter/ucenter_icon_protocol.png">
							<p>协议规则</p>
							<div class="page_sign"><img src="https://m.xiaomiyoupin.com/youpin/static/m/res/images/icons/icon_arrow_right_darkgray.png">
							</div>
						</a>
					</div>
					<div class="box">
						<a href="">
							<img src="https://m.xiaomiyoupin.com/youpin/static/m/res/images/ucenter/ucenter_icon_feedback.png">
							<p>帮助与反馈</p>
							<div class="page_sign"><img src="https://m.xiaomiyoupin.com/youpin/static/m/res/images/icons/icon_arrow_right_darkgray.png">
							</div>
						</a>
					</div>
				</div>
			</div>
			<div class="page-footer">
				<mi-nav></mi-nav>
			</div>
			<!-- <div class="agree">
				<div class="agree-content">
					<div class="agree-content_header">
						<div>声明与政策</div>
					</div>
					<div class="agree-content_main">
						<p>欢迎您来到小米有品！</p>
						<div>
							我们依据最新法律法规要求，制定并更新了<span>《隐私政策》</span> 、<span>《小米有品用户协议》</span>以及<span>《小米账号使用协议》</a> 。
						</div>
						<p>您需阅读并同意相关政策条款方可进行登录。</p>
					</div>
					<div class="agree-content_footer">
						<div class="agree-content_footer_left">不同意</div>
						<div class="agree-content_footer_right">同意</div>
					</div>
				</div>
			</div> -->
		</div>



	</div>
</template>




<script type="text/ecmascript-6">
	import MiNav from "../../components/mi-nav";
	export default {
		name: "Profile",
		components: {
		        "mi-nav": MiNav,
		},
                data: function() {
                        return {
                                isLogin: true,
                                userName: "",
                                notLogin: "请登录",
	                        a:""
                        };
                },
                methods: {
                        logIn() {
                                this.$router.replace({path: "/login", query: {to: this.$route}} );
                        }
                },
                created(){
                        if(sessionStorage.getItem('token')){
                                this.userName = sessionStorage.getItem('user');
                                this.isLogin = true;
                        }else{
                                this.isLogin = false;
                                this.userName = "请登录";
                        }
                }
	};
</script>




<style scoped>
	a{
		display: inline-block;
		color: #666666;
	}
	.page-header a{
		color: #E0E0E0;
	}
	.page-container {
		position: absolute;
		height: 100%;
		display: flex;
		flex-direction: column;
	}


	.page-header{
		height: 100px;
		flex-shrink: 0;
		background: url(https://m.xiaomiyoupin.com/youpin/static/m/res/images/ucenter/ucenter_bg_top.png);
		background-size: cover;
	}
	.page-content{
		flex-grow: 1;
		color: #666666;
		background-color: #EEEEEE;
	}
	.page-footer{
		height: 50px;
		flex-shrink: 0;
	}
	.page_outbox{
		height: 100%;
		padding-right: 20px;
		display: flex;
		justify-content: center;
		align-items: center;

	}
	.page_outbox>div{
		box-sizing: border-box;
		padding-left: 25px;
	}
	.page-header_img{
		width: 80px;
	}
	.page-header_name{
		width: 255px;
		color: #fff;
		font-size: 14px;
	}
	.page_outbox .page_sign{
		width: 20px;
		padding: 0;
	}
	.page-header_img img{width: 60px;height: 60px;}
	.page_sign img{width: 18px;height: 18px;}

	.space{
		height: 5px;
	}
	.page-content p{
		flex-grow: 1;
		font-size: 14px;
	}
	.order_box{
		padding-right: 10px;
		padding-left: 20px;

		background-color: #fff;

	}

	.order_box a{
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.service_box{
		width: 100%;
		height: 70px;
		display: flex;
		background-color: #fff;
		justify-content: center;
		align-items: center;
		border-top: 1px solid #E0E0E0;
	}
	.service_box div{
		width: 25%;
	}
	.service_box div a{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.service_box img{
		width: 40px;
		height: 40px;
	}
	.order_box .page_sign img{
		width: 15px;
		height: 15px;
	}
	.box{
		padding:0 10px 0 20px;

		background-color: #FFFFFF;
		border-top: 1px solid #E0E0E0;
	}
	.box a{
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.box img{
		width: 38px;
		height: 38px;
	}
	.box .page_sign img{
		width: 15px;
		height: 15px;
	}
	.box:nth-child(1){
		border: none;
	}
	.box:nth-child(5){
		border: none;
	}
	.agree{
		width: 100%;
		height: 100%;
		background: rgb(000, 000, 000,0.5) ;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 50;
		display: flex;
		justify-content: center;
		align-items: center;
		display: none;
	}

	.agree-content{
		width: 315px;
		height: 241px;
		border-radius: 10px;
		background-color: #fff;
		display: flex;
		flex-direction: column;
	}
	.agree-content_header{
		height: 40px;
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}
	.agree-content_main{
		flex-grow: 1;
		font: 13px/21px font-family;
		color: #666;
		padding: 20px 20px;
	}
	.agree-content_footer{
		height: 50px;
		display: flex;
	}
	.agree-content_footer div{
		width: 50%;
		height: 100%;
		text-align: center;
		line-height: 50px;
		border-top: 1px solid #E0E0E0;
		border-left: 1px solid #E0E0E0 ;
	}
	.agree-content_footer .agree-content_footer_left{border-left: none;}
</style>
