
/**
 * Component dependencies
 */

var attachFormMixin  = require('./helpers/attachFormMixin');
var userMixin = require('./helpers/userMixin');


/**
 * UiLogin definition
 */

module.exports = {
    name: 'Login',

    events: {
        'form:submitted': 'login',
        'login:success': function (authData) {
            this.$parent.userLoggedIn = true;
            this.$dispatch('login:success', authData);
        }
    },

    mixins: [ attachFormMixin, userMixin ],

    template: require('./templates/login.jade')
};