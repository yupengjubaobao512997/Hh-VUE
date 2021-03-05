import Vue from 'vue';

//创建mi-alert组建的构造函数
var MiAlertConstructor = Vue.extend(require('./alert.vue').default);

export default function(text){
        var instance = new MiAlertConstructor({data: {text}}).$mount();
        document.body.appendChild(instance.$el);

}

