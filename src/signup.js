
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
        'form:submitted': 'signup'
    },

    mixins: [ attachFormMixin, userMixin ],

    template: require('./templates/signup.jade')
};