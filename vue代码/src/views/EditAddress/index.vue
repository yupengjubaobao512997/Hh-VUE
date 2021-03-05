<template>
	<div class="new-container">
		<div class="new-header">
			<div class="new-header_title">
				<i class="iconfont iconback"></i>
				<div class="new-header_title-text">编辑地址</div>
			</div>
		</div>
		<div class="new-content">
			<div class="new-content_input">
				<div class="receiveName">
					<div class="receiveName_text text">收货姓名</div>
					<input type="text" class="receiveName_input input" v-model="content.name">
				</div>
				<div class="receivePhone">
					<div class="receivePhone_text text">手机号码</div>
					<input type="text" class="receivePhone_input input"
					       v-model="content.receivePhone">
				</div>
				<div class="receiveRegion">
					<div class="receiveRegion_text text">所在地区</div>
					<input type="text" class="regions-picker input" v-model="content.receiveRegion">
				</div>
				<div class="receiveDetail">
					<div class="receiveDetail_text text">详细地址</div>
					<input type="text" class="receiveDetail_input input"
					       v-model="content.receiveDetail">
				</div>
			</div>
			<div class="delete">
				<div class="delete_btn" @click="remove">删除收货地址</div>
			</div>
			<button class="save_butn">保存</button>

		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	let a= "";
        export default {
                name: 'EditAddress',
                data(){
                        return {
                                content: [],
                                addressId: this.$route.params.id,

                        }
                },
                beforeRouteEnter(to,from,next){
                        a = from.fullPath;
                        next()
                        return from.path;
                },
                created(){
                        if(a === "/address") {
                                this.$http({url: `/address/model/${this.addressId}`})
                                        .then(data =>{
                                                this.content = data;
                                                console.log(data)
                                        })
                        }



                },
                methods: {
                        remove(){
                                this.$confirm("确定要删?")
                                        .then(this.$http({url: `/address/remove/${this.addressId}`})
                                                .then(data =>{
                                                        this.content = data;
                                                        console.log(data)
                                                }));

                        }
                }
        }
</script>

<style scoped>
	.new-container {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		height: 100%;
		background-color: #e0e0e0;
	}

	.new-header {
		height: 12vw;
		display: flex;
		flex-shrink: 0;
		align-items: center;
	}

	.new-header_title {
		display: flex;
		width: 100%;
	}

	.new-header_title-text {
		flex-grow: 1;
		text-align: center;
	}

	.new-content {
		height: 70%;
	}

	.default {

	}

	.save_butn {
		flex-shrink: 0;
		display: block;
		color: #e0e0e0;
		margin: 20px auto;
		margin-bottom: 0;
		background-color: rgb(68, 53, 26);
		width: 18vw;
		height: 10vw;
		border-radius: 10px;
		outline: none;
	}

	.new-content_input > div {
		height: 14vw;
		box-sizing: border-box;
		padding-left: 8vw;
		line-height: 14vw;
		background-color: #fff;
		border-bottom: 1px solid #999;
	}

	.new-content_input > div div {
		display: inline-block;
	}

	.text {
		width: 25vw;
	}

	.input {
		height: 50%;
		border: none;
		outline: none;
	}

	.delete {
		height: 14vw;
		margin-top: 3vw;
		box-sizing: border-box;
		padding-left: 8vw;
		line-height: 14vw;
		background-color: #fff;
	}
</style>
