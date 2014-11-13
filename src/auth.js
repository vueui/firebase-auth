
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
        var firebaseUrl = 'https://' + this.firebase + '.firebaseio.com';
        this.$firebase = new Firebase(firebaseUrl);

        this.providers = this.providers
            ? this.providers.replace(/^\s*|\s*$/g, '').split(/\s*,\s*/)
            : [];
    },

    data: function () {
        return {
            currentView: 'signup',
            isLoading: false,
            emailEnabled: true,
            errors: {},
            user: {},
            userAuthenticated: false
        }
    },

    ready: function () {
        var vm = this;
        var onAuth = function (authData) {
            if(authData) {
                vm.user = authData;
                vm.userAuthenticated = true;
            } else {
                vm.userAuthenticated = false;
            }
        };

        this.$firebase.onAuth(onAuth);
    },

    destroyed: function () {
        this.$firebase.offAuth();
    },

    methods: {
        authWithProvider: function (provider, e) {
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