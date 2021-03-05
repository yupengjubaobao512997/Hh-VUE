<template>
	<div class="page-container">
		<div class="page-header">
			<div class="page-header-container">
				<div class="page-header-left">
					<i class="iconfont iconback"></i>
				</div>
				<div class="page-header-text">
					我的订单
				</div>
			</div>
		</div>
		<div class="page-content hide-scrool">
			<div class="btn-container">
				<ul class="btn-list">
					<li class="btn-list-item"  @click="changes('all')"><span class=""  :class="{show: active === 'all' }">全部</span></li>
					<li class="btn-list-item" @click="changes('obligation')"><span class=""  :class="{show: active === 'obligation' }" >待付款</span></li>
					<li class="btn-list-item" @click="changes('accountPaid')"><span class=""  :class="{show: active === 'accountPaid' }" >待收货</span></li>
					<li class="btn-list-item"  @click="changes('')"><span class="">退款订单</span></li>
					<li class="btn-list-item"   @click="changes('')"><span class="">已收货</span></li>
				</ul>
			</div>
			<div class="order-container ">
				<ul class="order-list hide-scrool">
					<li class="order-list-item" v-for="item in order" :key="" v-show="show ==='all'">
						<div class="item-title">
							<div class="item-title-text">小米有品</div>
							<div class="status">
								<div class="status-box payment show">待付款</div>
								<div class="status-box receiving">已付款</div>
							</div>
						</div>
						<div class="item-content">
							<div class="order-info">
								<div class="order-per-pro" v-for="items in item.details" >
									<div class="product-img">
										<img :src="items.avatar">
									</div>
									<div class="productInfo">
										<div class="product-text">
											<div class="product-name" v-text="items.name"></div>
											<div class="product-model"></div>
										</div>
										<div class="price-num">
											<div>￥<span class="prePrice" v-text="items.price"></span></div>
											<div>*<span class="num" v-text="items.count"></span></div>
										</div>
									</div>
								</div>
								<div class="order-price">
									<span>共<span class="" v-text="item.details.length"></span>种商品，</span>
									<span>总金额</span>
									<span class="total-price">
								￥
								<span v-text="item.account"></span>
								<span>.00</span>
							</span>
								</div>
							</div>
						</div>
						<div class="item-footer">
							<div class="delete-btn" data-orderNumber="${item.orderId}">删除订单</div>
							<div class="buy-btn" >
								<div class="againBuy-btn" data-orderNumbers="${item.orderId}">再次购买</div>
								<div class="pay-btn show" data-orderNumbers="${item.orderId}">去支付</div>
							</div>
						</div>
					</li>
				</ul>

			</div>

		</div>
	</div>

</template>


<script type="text/ecmascript-6">
	export default {
	        name: "Order",
		data() {
	                return {
				order: [],
		                active: "all",
		                show: "all"
	                }
		},
		created() {
                        this.$http({
                                url: "/order/list_all",
                        })
	                        .then(data => {
                                        this.order = data;
                                        console.log(data)
	                        })
		},
		methods: {
                        changes(str) {
                                console.log(str)
                                this.active = str;
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

	.page-header-container {
		display: flex;
		height: 100%;
		padding: 0 4vw;
		position: relative;
	}

	.page-header-left {
		width: 5vw;
		height: 100%;
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

	.btn-container {
		height: 10vw;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;

	}

	ul.btn-list {
		display: flex;
		width: 100%;
		height: 5.866666vw;
	}

	ul.btn-list li {
		width: 20%;
		height: 100%;
		font-size: 3.466666vw;
		line-height: 5.866666vw;
		text-align: center;
	}

	ul.btn-list li > span {
		padding: 1vw 2vw;
		border-radius: 4vw;
		color: #666;
	}
	ul.btn-list li > span.show {
		color: #fff;
		background-color: #DFB556;
	}

	.order-container {
		margin-top: 1vw;
		flex-grow: 1;
		overflow: auto;
	}

	ul.order-list {
		height: 100%;
		padding: 0 4vw;
		overflow: auto;
	}

	ul.order-list > li {
		border-radius: 4vw;
		margin-bottom: 3vw;
		background-color: #fff;
	}

	li.order-list-item > div {
		padding: 0 3vw;
	}

	.preOrder {

	}

	.item-title {
		height: 11.733333vw;
		line-height: 11.733333vw;
		position: relative;
	}

	.item-content {

	}

	.item-footer {
		height: 12.8vw;
		line-height: 12.8vw;
	}

	.status {
		position: absolute;
		right: 5.333333vw;
		top: 0;
	}

	.receiving.show, .payment.show {
		display: block;
	}

	.receiving, .payment {
		display: none;
		color: #666;
		font-size: 4vw;
	}

	.order-price {
		flex-shrink: 0;
		height: 10.666666vw;
		text-align: right;
		line-height: 10.666666vw;
	}

	.order-info {
		display: flex;
		flex-direction: column;
	}

	.order-per-pro {
		flex-grow: 1;
		display: flex;
	}

	.product-img {
		flex-shrink: 0;
	}

	.product-img img {
		width: 24vw;
		height: 24vw;
	}

	.productInfo {
		flex-grow: 1;
		padding: 0 0 0 3vw;
		display: flex;
	}

	.product-text {
		flex-grow: 1;
	}

	.product-name {
		font-size: 4vw;
		color: #333;
	}

	.product-model {
		font-size: 3.2vw;
		color: #777;
		margin-top: 2vw;
	}

	.price-num {
		width: 14vw;
		flex-shrink: 0;
		color: #777;
		font-size: 3.2vw;
		padding-left: 2vw;
		text-align: end;
	}

	.order-price {
		font-size: 3.2vw;
	}

	.total-price {
		color: #B85C00;
	}

	.delete-btn {
		float: left;
		color: #666;
	}

	.buy-btn {
		float: right;
	}

	.againBuy-btn, .pay-btn {
		margin-top: 1vw;
		display: none;
		padding: 2vw 3vw;
		border-radius: 4.5vw;
		color: #B85C00;
		height: 4.5vw;
		text-align: center;
		line-height: 4.5vw;
		border: 1px solid #B85C00;
	}

	.againBuy-btn.show, .pay-btn.show {
		display: block;
	}


</style>