<template>
	<div class="detail">
		<div class="page-container">
			<div class="page-header">
				<div class="page-header-container">
					<div class="page-header-container_left">
						<a @click="$router.back()">
							<i class="iconfont iconback"></i>
						</a>
					</div>
					<div class="page-header-container_conter">
						<div class="page-header-container_conter-title">购物车</div>
					</div>
					<div class="page-header-container_right">
						<button @click="isEdit = !isEdit" v-text="isEdit ? '完成' : '编辑'"
						        class="editor-btn"></button>
					</div>
				</div>
			</div>
			<div class="page-content">
				<div class="page-content-container hide-scrool">
					<div class="container ">
						<ul class="cart-list" v-if="list.length > 0">
							<li class="goods-list-item" data-id="${item.id}"
							    v-for="item in list"
							    :key="item.id">
								<div class="goods-list-item_content">
									<div class="goods-list-item_content-top">
										<div class="check-box content-check">
											<i class="checkbox"
											   :class="{checked: item.checked1}"
											   v-show="!isEdit"
											   @click="item.checked1 = !item.checked1"></i>
											<i class="checkbox"
											   :class="{checked: item.checked2}"
											   v-show="isEdit"
											   @click="item.checked2 = !item.checked2"></i>
										</div>
										<div class="productInformation">
											<div class="productImg">
												<img :src="`${item.avatar}`"/>
											</div>
											<div class="product-text">
												<div class="product-name"
												     v-text="item.name">
													${item.name}
												</div>
												<div class="prodocut-price">
													<div class="price-item">
														<span v-text="`￥${item.price}.00`"></span>
													</div>
													<div class="pro-num">
														<mi-count
															:count="item.count"
															@increase="increaseHandler(item)"
															@decrease="decreaseHandler(item)">
														</mi-count>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</li>
						</ul>
						<p v-else>暂无购物记录..</p>
					</div>

				</div>
			</div>
			<div class="page-footer">
				<div>
					<div v-show="!isEdit">
						<div class="page-footer_left">
							<i class="checkbox" :class="{checked: isAllCheck}"
							   @click="toggleAllCheck"></i>全选
						</div>
						<div class='page-footer_right'>
							<span v-text="`￥${total}.00元`" class="settlement-price"></span>
							<button class="settlement-btn" @click="settlement">结算<span
								v-show="amount"
								v-text="`(${amount})`"></span>
							</button>
						</div>
					</div>
					<div v-show="isEdit">
						<div class="page-footer_left"><i class="checkbox"
						                                 :class="{checked: isAllCheck}"
						                                 @click="toggleAllCheck"></i>全选
						</div>
						<div class="page-footer_right">
							<button class="delete-btn" @click="deletes()">删除<span
								v-show="amount"
								v-text="`(${amount})`"></span></button>
						</div>

					</div>

				</div>

			</div>
		</div>
	</div>
</template>


<script type="text/ecmascript-6">
        import axios from "axios";
        import MiCount from "../../components/mi-count";

        export default {
                name: 'Cart',
                components: {
                        "mi-count": MiCount,
                },
                data: function(){
                        return {
                                list: [],
                                isEdit: false,
                                show: true,
                        };
                },
                computed: {
                        total: function(){
                                let result = 0;
                                this.list.forEach(item =>{
                                        if(item.checked1) result += item.price * item.count;
                                });
                                return result;
                        },
                        amount: function(){
                                let result = 0;
                                this.list.forEach(item =>{
                                        if((!this.isEdit) && item.checked1) result += item.count;
                                        if(this.isEdit && item.checked2) result += item.count;
                                });
                                return result;
                        },
                        isAllCheck: function(){
                                if(this.isEdit){
                                        return this.list.every(item => item.checked2)
                                }else{
                                        return this.list.every(item => item.checked1)
                                }
                        }
                },
                methods: {
                        toggleAllCheck(){
                                let flag = this.isAllCheck;
                                this.list.forEach(item => item[this.isEdit?"checked2":"checked1"] = !flag);
                        },
                        increaseHandler(item){
                                console.log(item.count)
                                this.$http({
                                        method: "post",
                                        url: "/cart/increase/" + item.id,
                                })
                                        .then(response =>{
                                                item.count += 1;
                                        });
                        },
                        decreaseHandler(item){
                                this.$http({
                                        method: "post",
                                        url: "/cart/decrease/" + item.id,

                                })
                                        .then(response =>{
                                                item.count -= 1;
                                        });
                        },
                        deletes: function(){
                                let arrDelete = [];
                                this.list.forEach(item =>{
                                        if(item.checked2){
                                                arrDelete.push(item.id);
                                        }
                                });
//	                        this.$http({
//                                        method: "post",
//                                        url: "/cart/remove",
//                                        data: {
//                                                ids: arrDelete
//                                        },
//	                        })
//		                        .then(data => {
//		                                console.log(1111)
//		                        });
                                axios({
                                        method: "post",
                                        url: "/cart/remove",
                                        headers: {
                                                "Authorization": sessionStorage.getItem("token"),
                                                "Content-Type": "application/json"
                                        },
                                        data: JSON.stringify({
                                                ids: arrDelete
                                        }),

                                })
                                        .then(response =>{
                                                if(response.status === 200){
                                                        switch(response.data.code){
                                                                case 200:
                                                                        arrDelete.forEach(items =>{
                                                                                let i = this.list.findIndex(item => item.id === items)
                                                                                this.list.splice(i, 1);
                                                                        })
                                                                        break;
                                                                case 401:
                                                                        sessionStorage.removeItem("token");
                                                                        sessionStorage.removeItem("user");
                                                                        this.$router.replace({
                                                                                path: "/login",
                                                                                query: {to: this.$route}
                                                                        });
                                                                        break;
                                                                case 199:
                                                                case 404:
                                                                case 500:
                                                                        alert(response.data.msg)
                                                        }
                                                }
                                        })
                                        .catch(error =>{
                                        })
                        },
                        settlement(){
                                let arrSet = [];
                                this.list.forEach(item =>{
                                        if(item.checked1){
                                                arrSet.push(item.id);
                                        }
                                });
                                let str = arrSet.join("=");
                                this.$router.push({path: '/settlement',query:{str: `${str}`}});
                        }


                },
                created: function(){
                        this.$http({
                                method: "post",
                                url: "/cart/list",
                        })
                                .then(data =>{
                                        data.forEach(item =>{
                                                item.checked1 = true,
                                                        item.checked2 = false
                                        })
                                        this.list = data;
                                })

                },


        };
</script>


<style scoped>
	ul.cart-list li {
		display: flex;
		justify-content: space-between;
	}

	i.checkbox {
		display: inline-block;
		width: 17px;
		height: 17px;
		background-size: 100% 100%;
		background-image: url(icon_checkbox_uncheck.png);
	}

	i.checkbox.checked {
		background-image: url(icon_checkbox_check.png);
	}

	.detail {
		height: 100%;
		background-color: #e0e0e0;
	}

	.page-container {
		width: 100%;
		height: 100%;
		background: url(https://trade.m.xiaomiyoupin.com/youpin/static/m/res/images/common/bg_page_header.png);
		background-size: contain;
		background-repeat: no-repeat;
		display: flex;
		flex-direction: column;
	}

	.page-header {
		height: 23.466666vw;
		flex-shrink: 0;
		color: #fff;
	}

	.page-content {
		flex-grow: 1;
		overflow: hidden;
	}

	.page-footer {
		height: 14.4vw;
		flex-shrink: 0;
		background-color: #fff;
	}

	.page-header-container {
		height: 100%;
		display: flex;

	}

	.page-header-container_left {
		width: 8.2vw;
		padding-left: 2vw;
		height: 100%;
		flex-shrink: 0;
	}

	.page-header-container div {
		height: 100%;
		text-align: center;
		line-height: 23.466666vw;
	}

	.page-header-container_conter {
		height: 100%;
		flex-grow: 1;
	}

	.page-header-container_right {
		height: 100%;
		width: 15.2vw;
		flex-shrink: 0;
	}

	.iconback {
		font-size: 8vw;
	}

	.page-header-container_conter-title {
		font-size: 5.5vw;
		font-weight: 700;
	}

	.editor-btn {
		font-size: 4vw;
		outline: none;
		border: none;
		background: none;
	}

	.container {
		margin: 3vw;
		background-color: #fff;
		border-radius: 3vw;
	}

	ul.goods-list {
	}

	.goods-list-item {
		background-color: #fff;
		border-radius: 3vw;
		border-top: 1px solid #FDF9F1;
	}

	.goods-list-item_title {
		height: 11.733333vw;
		display: flex;
		align-items: center;
	}

	.goods-list-item_title-text {
		margin-left: 3vw;
	}

	.check-box, .item_title-check-box, .page-footer-check-box {
		overflow: hidden;
		width: 5vw;
		height: 5vw;
		line-height: 5vw;
		margin-left: 3vw;
		border-radius: 50%;
		text-align: center;

	}

	.check-box.show, .item_title-check-box.show, .page-footer-check-box.show {
		background-color: #B85C00;
	}

	.iconduihao {
		font-size: 2vw;
		color: #fff;
	}

	.goods-list-item_content-top {

		padding: 10px 0;
		display: flex;
		align-items: center;
	}

	.productInformation {
		margin-left: 3vw;
		display: flex;
	}

	.productImg {
		padding: 2vw;
	}

	.product-text {
		padding: 2vw 0;
	}

	.productImg img {
		width: 22.933333vw;
		height: 22.933333vw;
	}

	.prodocut-price {
		margin-top: 3vw;
		width: 53vw;
		height: 8vw;
	}

	.price-item {
		float: left;
		color: #B85C00;
		font-size: 3vw;
	}

	.price-item > span {
		font-size: 4vw;
	}

	.pro-num {
		float: right;
		height: 6vw;
		overflow: hidden;
	}

	button.dec-btn, button.add-btn, input.amount_input {
		border: none;
		outline: none;
		height: 6vw;
		float: left;
	}

	input.amount_input {
		width: 8vw;
		height: 6vw;
		text-align: center;
		color: #333333;
		background-color: #eeeeee;
	}

	button.dec-btn, button.add-btn {
		background-color: #fff;
		width: 8vw;
		font-size: 5vw;
	}

	button.dec-btn.darken, button.add-btn.darken {
		color: #999999;
	}

	.goods-list-item_title, ul.goods-list, .noGoods {
		display: none;
	}

	.goods-list-item_title.active {
		display: flex;
	}

	ul.goods-list.active {
		display: block;
	}

	.noGoods.active {
		display: block;
	}

	.noGoods.active {
		height: 20vw;
		line-height: 20vw;
		color: #666;
		font-size: 5vw;
		text-align: center;
		background-color: #E0E0E0;
		margin-top: 40vw;
	}

	.page-content-container {
		height: 100%;
		overflow: auto;
	}

	.page-footer > div {
		height: 100%;
		padding: 0 3vw;
	}

	.page-footer_left {
		height: 100%;
		float: left;
		line-height: 14.4vw;
	}

	.page-footer-check-box {
		float: left;
		margin: 4.8vw 0;
	}

	.page-footer_right {
		height: 100%;
		float: right;
	}

	.settlement-price {
		/* height: ; */
		float: left;
		margin: 4.5vw 0;
		color: #D91A15;
		font-size: 4vw;
	}

	.settlement-btn, .delete-btn {
		height: 10vw;
		width: 20vw;
		color: #fff;
		font-weight: 600;
		line-height: 10vw;
		text-align: center;
		float: right;
		margin: 2.3vw 0 0 1vw;
		border-radius: 5vw;
		background-color: #D91A15;
		border: none;
		outline: none;
	}

</style>