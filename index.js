
var Vue = require('vue');

var UiAuth = exports.UiAuth = Vue.extend(require('./src/auth'));
var UiLogin = exports.UiLogin = Vue.extend(require('./src/login'));
var UiSignup = exports.UiSignup = Vue.extend(require('./src/login'));

Vue.component('ui-auth', UiAuth);
Vue.component('ui-login', UiLogin);
Vue.component('ui-signup', UiSignup);