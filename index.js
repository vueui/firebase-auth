

var Auth = require('./src/auth');
var Login = require('./src/login');
var Signup = require('./src/login');


exports.install = function (Vue) {

    Vue.component('ui-auth', Auth);
    Vue.component('ui-login', Login);
    Vue.component('ui-signup', Signup);

};