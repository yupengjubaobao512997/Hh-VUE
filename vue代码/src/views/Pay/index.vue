<template>
	<div class="page-container">
		<div class="page-header">
			<div class="page-header-container">
				<div class="page-header-left">
					<i class="iconfont iconback"></i>
				</div>
				<div class="page-header-text">
					有品收银台
				</div>
			</div>
		</div>
		<div class="page-content">
			<div class="content-container">
				<div class="content-top">
					<div class="totalMoney">
						￥
						<span class="money-num" v-text="totalPrice">

						</span>
						.00
					</div>
				</div>
				<div class="content-botton">
					<div class="Alipay">
						<div class="Alipay-img">
							<img src="https://trade.m.xiaomiyoupin.com/youpin/static/m/res/images/pay/pay_alipay.png"/>
						</div>
						<div class="Alipay-text">
							支付宝
						</div>
						<div class="Alipay-btn">
							<div><i class="iconfont iconduihao"></i></div>
						</div>
					</div>
					<div class="mi-wallet">
						<div class="mi-wallet-img">
							<img src="https://trade.m.xiaomiyoupin.com/youpin/static/m/res/images/pay/pay_mipay.png"/>
						</div>
						<div class="mi-wallet-text">
							小米钱包
						</div>
						<div class="mi-wallet-btn">
							<div class="show"><i class="iconfont iconduihao"></i></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="page-footer">
			<div class="payment-btn" @click="pay">确认支付<span>￥<span class="amount-Num"
			                                                       v-text="totalPrice"></span></span></div>
		</div>
	</div>
</template>


<script type="text/ecmascript-6">
        export default {
                name: "Pay",
                data(){
                        return {
                                str: this.$route.query.str,
                                totalPrice: "",
                        }
                },
                created(){
                        console.log(this.str);
                        this.$http({
                                url: `/order/account/${this.str}`,
                        })
                                .then(data =>{
                                        this.totalPrice = data
                                });
                },
                methods: {
                        pay(){
                                let Str = this.str;
                                this.$http({
                                        url: "/order/pay/" + Str
                                })
                                        .then(data =>{
                                                this.$router.push({path: "/order", query: ""});
                                        });
                        }
                }
        }
</script>


<style scoped>
	.page-container {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #e0e0e0;
	}

	.page-header {
		height: 11.7vw;
		flex-shrink: 0;
	}

	.page-content {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.page-header-left {
		width: 5vw;
		height: 11.7vw;
		position: absolute;
		left: 4vw;
		line-height: 11.7vw;
	}

	.page-header-text {
		width: 100%;
		height: 100%;
		font-size: 4.7vw;
		text-align: center;
		line-height: 11.7vw;
	}

	.content-top {
		height: 20vw;
		padding: 4vw;
		color: #BF1111;
	}

	.content-botton {
		background-color: #fff;
		margin-top: 3vw;
		padding: 0 2vw;
	}

	.totalMoney, .timeRemaining {
		text-align: center;
	}

	.totalMoney {
		font-size: 4vw;

	}

	.money-num {
		padding: 2vw 0;
		font-size: 7.466666vw;
	}

	.timeRemaining {
		padding: 1vw 0;
		font-size: 3.2vw;
	}

	.Alipay-img img, .mi-wallet-img img {
		width: 8vw;
		height: 8vw;
	}

	.Alipay, .mi-wallet {
		display: flex;
	}

	.mi-wallet-img, .Alipay-img {
		width: 8vw;
		height: 8vw;
		padding: 4vw 0;
	}

	.mi-wallet-text, .Alipay-text {
		width: 80vw;
		height: 16vw;
		line-height: 16vw;
		padding-left: 3vw;

	}

	.mi-wallet-text {
		border-top: 1px solid #F4F4F4;
	}

	.mi-wallet-btn, .Alipay-btn {
		width: 4.266666vw;
		height: 4vw;
		padding: 6vw 0;
	}

	.mi-wallet-btn div, .Alipay-btn div {
		background-color: #fff;
		width: 4vw;
		height: 4vw;
		line-height: 4vw;
		text-align: center;
		border-radius: 50%;
		border: 1px solid #fa0;
	}

	.mi-wallet-btn div.show, .Alipay-btn div.show {
		background-color: #ffaa00;
	}

	.iconduihao {
		font-size: 4vw;
		color: #FFFFFF;
	}

	.page-footer {
		height: 15vw;
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		background-color: #fff;
	}

	.payment-btn {
		width: 90vw;
		height: 10vw;
		border-radius: 5vw;
		background-color: #B85C00;
		color: #fff;
		line-height: 10vw;
		text-align: center;
	}

</style>