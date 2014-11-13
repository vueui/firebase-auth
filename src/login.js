
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
            console.log(authData);
        }
    },

    mixins: [ attachFormMixin, userMixin ],

    template: require('./templates/login.jade')
};