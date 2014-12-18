
var Vue = require('vue');
var vueFirebaseAuth = require('..');

Vue.use(vueFirebaseAuth);

window.app = new Vue({
    events: {
        'user:loggedIn': function (user) {
            console.log(user.uid + ' just logged in!')
        },
        'user:loggedOut': function () {
            console.log('User logged out')
        }
    }
}).$mount('#app');
window.auth = app.$.auth;

auth.$watch('userAuthenticated', function (isAuthenticated) {
    var message = isAuthenticated ? 'User logged in!' : 'User logged out.';

    console.log(message);
});