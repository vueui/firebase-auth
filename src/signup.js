
/**
 * Component dependencies
 */

var attachFormMixin = require('./helpers/attachFormMixin');
var userMixin = require('./helpers/userMixin');

/**
 * UiSignup definition
 */

module.exports = {
    name: 'Signup',

    events: {
        'form:submitted': 'signup',
        'signup:success': function () {
            var user = {
                email: this.email,
                password: this.password
            };

            this.$dispatch('signup:success', user);
            this.login();
        },
        'login:success': function (authData) {
            this.$parent.userLoggedIn = true;
            this.$dispatch('login:success', authData);
        }
    },

    mixins: [ attachFormMixin, userMixin ],

    template: require('./templates/signup.jade')
};