
/**
 * Component dependencies
 */

var attachFormMixin = require('./helpers/mixins/attachFormMixin');
var userMixin = require('./helpers/mixins/userMixin');

/**
 * UiSignup definition
 */

module.exports = {
    name: 'Signup',

    events: {
        'form:submitted': 'signup',

        'signup:success': function (user) {
            // Attempt to log the user in
            this.login();
        }
    },

    mixins: [ attachFormMixin, userMixin ],

    template: require('./templates/signup.jade')
};