
/**
 * Component dependencies
 */

var Login = require('./login');
var Signup = require('./signup');
var getErrorMessage = require('./helpers/errorMessage');


/**
 * auth helpers
 */

function onAuth(authData) {
    var vm = this;

    if(authData) {
        vm.user = authData;
        vm.userAuthenticated = true;

        if(vm.currentView === 'signup') {
            vm.$firebase.child('users').child(authData.uid).set(authData);
        }
    } else {
        vm.userAuthenticated = false;
    }
}

function onAuthError(error) {
    var vm = this;
    var message = getErrorMessage(error);

    vm.errors.$add(message);
}


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

        vm.$firebase.onAuth(onAuth.bind(vm));
    },

    destroyed: function () {
        this.$firebase.offAuth();
    },

    methods: {
        authWithProvider: function (provider, e) {
            var vm = this;

            // Normalize google plus provider name
            provider = provider === 'google plus' ? 'google' : provider;

            function onProviderAuth(error, authData) {
                if(error) {
                    if(error.code === 'TRANSPORT_UNAVAILABLE') {
                        vm.$firebase.authWithOAuthRedirect(provider, function (error, authData) {
                            if(error) onAuthError.call(vm, error);
                            else onAuth.call(vm, authData)
                        })
                    } else {
                        onAuthError.call(vm, error);
                    }
                    vm.$dispatch(provider + ':autherror', error);
                } else {
                    onAuth.call(vm, authData);
                }
            }

            vm.$firebase.authWithOAuthPopup(provider, onProviderAuth);

            e.stopPropagation();
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