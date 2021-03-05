import Vue from 'vue';


var MiAlertConstructor = Vue.extend(require('./confirm.vue').default);

export default function(text){
        return new Promise(resolve =>{
                var instance = new MiAlertConstructor( { data: { text, resolve }}).$mount();
                document.body.appendChild(instance.$el);
        });

}