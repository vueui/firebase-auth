
/**
 * Component dependencies
 */

var attachFormMixin  = require('./helpers/mixins/attachFormMixin');
var userMixin = require('./helpers/mixins/userMixin');


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