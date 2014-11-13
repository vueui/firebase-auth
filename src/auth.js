
/**
 * Component dependencies
 */

var Login = require('./login');
var Signup = require('./signup');


/**
 * <ui-auth> definition
 */

module.exports = {
    name: 'Auth',

    paramAttributes: ['firebase', 'providers'],

    compiled: function () {
        this.providers = this.providers
            ? this.providers.replace(/^\s*|\s*$/g, '').split(/\s*,\s*/)
            : [];
    },

    data: function () {
        return {
            currentView: 'signup',
            isLoading: false,
            emailEnabled: true,
            user: {},
            userLoggedIn: false,
            errors: {}
        }
    },

    methods: {
        authProvider: function (provider, e) {
            e.stopPropagation();

            console.log('Logging in with ' + provider);
        }
    },

    watch: {
        currentView: function (view) {
            this.errors = {};
        }
    },

    computed: {
        hasErrors: function () {
            var errors = this.errors;
            var hasErrors = false;

            Object.keys(errors).forEach(function (error) {
               hasErrors = errors.hasOwnProperty(error) ? true : false;
            });

            return hasErrors;
        }
    },

    components: {
        login: Login,
        signup: Signup
    },

    template: require('./templates/auth.jade')
};