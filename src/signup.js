
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
            // Attempt to log the user in
            this.login();
        }
    },

    mixins: [ attachFormMixin, userMixin ],

    template: require('./templates/signup.jade')
};