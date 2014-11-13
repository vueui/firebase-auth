
var Vue = require('vue');

var UiAuth = Vue.extend(require('./src/auth'));
var UiLogin = Vue.extend(require('./src/login'));
var UiSignup = Vue.extend(require('./src/login'));

Vue.component('ui-auth', UiAuth);
Vue.component('ui-login', UiLogin);
Vue.component('ui-signup', UiSignup);

module.exports = UiAuth;