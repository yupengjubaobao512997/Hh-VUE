let views = {};
let files = require.context("./", true, /index.vue$/);
files.keys().forEach( filesPath => {
        let key = filesPath.match(/.*\/(.*)\/index.vue$/)[1];
        views[key] = files(filesPath).default;
});
export default views;


// import Category from './Category';
// import Home from './home';
// import Profile from './profile';
// import List from "./list";
// import Cart from "./cart";
// import Login from "./login";
// import Detail from "./detail";
//
// export default {
//         Category,
//         Home,
//         Profile,
//         List,
//         Cart,
//         Login,
//         Detail,
// };
