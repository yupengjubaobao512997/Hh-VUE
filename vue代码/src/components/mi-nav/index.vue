<template>
	<ul class="mi-nav">
		<li>
			<router-link to="/home"><i></i><span>首页</span></router-link>
		</li>
		<li>
			<router-link to="/category"><i></i><span>分类</span></router-link>
		</li>
		<li>
			<router-link to="/teste"><i></i><span>品味</span></router-link>
		</li>
		<li>
			<router-link to="/cart"><i></i><span>购物车</span></router-link>
		</li>
		<li>
			<router-link to="/profile"><i></i><span>个人</span></router-link>
		</li>
	</ul>
</template>



<script type="text/ecmascript-6">
export default {
        name: "MiNav",
};
</script>



<style>
	ul.mi-nav {
		display: flex;
		height: 100%;
	}

	ul.mi-nav li {
		width: 20%;
		text-align: center;
	}

	ul.mi-nav a {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

	}

	ul.mi-nav i {
		overflow: hidden;
		display: inline-block;
		width: 24px;
		height: 24px;
		background: url(nav_bg.png);
		background-size: cover;
	}

	.mi-nav span {
		font-size: 10px;
		color: #666;
	}
	ul.mi-nav li:nth-child(1) i {background-position: 0 0;}
	ul.mi-nav li:nth-child(2) i {background-position: 0 22.222222%;}
	ul.mi-nav li:nth-child(3) i {background-position: 0 44.444444%;}
	ul.mi-nav li:nth-child(4) i {background-position: 0 66.666666%;}
	ul.mi-nav li:nth-child(5) i {background-position: 0 88.888888%;}
	ul.mi-nav li a.router-link-active span{color: red;}
	ul.mi-nav li:nth-child(1) a.router-link-active i {background-position: 0 11.111111%;}
	ul.mi-nav li:nth-child(2) a.router-link-active i {background-position: 0 33.333333%;}
	ul.mi-nav li:nth-child(3) a.router-link-active i {background-position: 0 55.555555%;}
	ul.mi-nav li:nth-child(4) a.router-link-active i {background-position: 0 77.777777%;}
	ul.mi-nav li:nth-child(5) a.router-link-active i {background-position: 0 100%;}

</style>