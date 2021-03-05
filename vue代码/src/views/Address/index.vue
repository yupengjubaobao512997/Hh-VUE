<template>
	<div class="address-container">
		<div class="address-header">
			<div class="address-header_title">
				<i class="iconfont iconback"></i>
				<div class="address-header_title-text">收货地址</div>
			</div>
		</div>
		<div class="address-content">
			<div class="address-content_top">
				<ul class="address-list">
					<li class="address-item" v-for="item in content" :key="item.id">
						<router-link :to="`/editAddress/${item.id}`">
							<div class="address-list_left">
								<div class="address-list_left_top">
									<div class="receiveName"
									     v-text="item.receiveName"></div>
									<div class="receivephone"
									     v-text="item.receivePhone"></div>
								</div>
								<div class="address">
									<span class="receiveRegion"
									      v-text="item.receiveRegion"></span>
									<span class="receiveDetail"
									      v-text="item.receiveDetail"></span>
								</div>
							</div>
							<div class="sign">
								<img src="https://trade.m.xiaomiyoupin.com/youpin/static/m/res/images/icons/icon_edit_gray.png">
							</div>
						</router-link>
						<div class="default" @click="setDefault(item.id)">
							<span class="default-show " v-show="item.isDefault">默认地址</span>
							<button class="default-btn" v-show="!item.isDefault">设为默认地址
							</button>
						</div>
					</li>
				</ul>
			</div>
			<button class="address-content_btn">
				<router-link to="/newAddress">
					+点击新增
				</router-link>

			</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        let a = "";
        export default {
                name: "Address",
                data(){
                        return {
                                content: [],

                        }
                },
                beforeRouteEnter(to, from, next){
                        console.log(from.path);
                        console.log(from.fullPath);
                        a = from.fullPath;
                        console.log(a)
                        next(vm =>{
                                        console.log(vm)
                                }
                        );
                },
                created(){

                        this.$http({url: "/address/list"})
                                .then(data =>{
                                        this.content = data;
                                })
                },
                methods: {
                        setDefault(addressId){
                                this.$http({url: `/address/set_default/${addressId}`})
                                        .then(data =>{
                                                this.content.forEach(item =>{
                                                        if(item.id === addressId){
                                                                item.isDefault = 1
                                                        }
                                                        else item.isDefault = 0;
                                                })
                                        });
                        }
                },
        }

</script>

<style scoped>
	.address-container {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		padding: 30px 8px;
		height: 100%;
		background-color: #e0e0e0;

	}

	.address-header {
		height: 12vw;
		display: flex;
		flex-shrink: 0;
		align-items: center;
	}

	.address-content {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	div.address-content a {
		display: inline-block;
		width: 100%;
		color: #666;
	}

	.address-header_title {
		display: flex;
		width: 100%;
	}

	.address-header_title-text {
		flex-grow: 1;
		text-align: center;
	}

	.address-content_top {
		flex-grow: 1;
		overflow: auto;
	}

	.address-content_btn {
		flex-shrink: 0;
		display: block;
		margin: 20px auto;
		margin-bottom: 0;
		width: 80%;
		height: 7%;
		border-radius: 10px;
	}

	.address-list > li {
		height: 25vw;
		width: 96%;
		border-bottom: 1px solid #666;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: #fff;
		padding: 0 2vw;
		border-radius: 1vw;

	}

	.address-list > li a {
		display: flex;
		align-items: center;
	}

	.sign {
		width: 5vw;
		height: 5vw;
	}

	.sign img {
		width: 100%;
		height: 100%;
	}

	.address-list_left {
		width: 88vw;
	}

	.address-list_left_top {
		display: flex;
		font: 4vw/5vw font-family;
	}

	.receiveName {
		width: 60vw;
	}

	.address {
		font: 3.2vw/4.5vw font-family;
	}

	.default {
		height: 6vw;
		line-height: 6vw;
	}

	.default-show, .default-btn {
		font-size: 3vw;
	}
</style>