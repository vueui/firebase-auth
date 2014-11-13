
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
        'form:submitted': 'login'
    },

    mixins: [ attachFormMixin, userMixin ],

    template: require('./templates/login.jade')
};