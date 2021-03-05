<template>
	<div>
		<div v-show="loginMode">
			<div class="mui-input-row mui-search">
				<input type="text" placeholder="请输入用户名" v-model.trim="name"/>
				<input type="password" placeholder="请输入密码" v-model="pwd"/>
				<button @click="loginPwd">登陆</button>
			</div>
		</div>
		<div v-show="!loginMode">
			<input type="text" placeholder="请输入手机号" />
			<input type="text" placeholder="验证码" />
			<button @click="loginPhone">登陆</button>
		</div>
		<button @click="loginMode = !loginMode" v-text="loginMode? '手机验证码登陆' : '用户名密码登录' "></button>
	</div>

</template>


<script type="text/ecmascript-6">
	import axios from "axios";
	export default {
	        name: "Login",
                data: function() {
                        return {
                                loginMode: true,
                                name: "",
                                pwd: ""
                        };
                },
                methods: {
                        loginPhone() {
                                alert("手机验证码登录功能暂未开放，请使用用户名密码登陆")
                        },
                        loginPwd() {
                                this.$http({
                                        method: "post",
                                        url: "/user/login_pwd",
                                        data: {
                                                name: this.name,
                                                pwd: this.pwd
                                        }
                                })
	                                .then(data => {
                                                sessionStorage.setItem("token", data);
                                                sessionStorage.setItem("user", this.name)
                                                this.$router.replace(this.$route.query.to || "/category");
	                                });

                        }
                },
	}

</script>


<style scoped></style>