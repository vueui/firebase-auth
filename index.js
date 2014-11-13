

var UiAuth = require('./src/auth');
var UiLogin = require('./src/login');
var UiSignup = require('./src/login');


exports.install = function (Vue) {

    Vue.component('ui-auth', UiAuth);
    Vue.component('ui-login', UiLogin);
    Vue.component('ui-signup', UiSignup);

};