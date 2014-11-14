
/**
 * Component dependencies
 */

var Login = require('./login');
var Signup = require('./signup');
var getErrorMessage = require('./helpers/errorMessage');
var User = require('./helpers/user');


/**
 * auth helpers
 */

function onAuth(authData) {
    var vm = this;
    var firebase = this.$user.firebase;

    if(authData) {
        vm.user = authData;
        vm.userAuthenticated = true;

        if(vm.currentView === 'signup') {
            firebase.child('users').child(authData.uid).set(authData);
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
        this.$user = new User(this.firebase);

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
        var firebase = this.$user.firebase;
        firebase.onAuth(onAuth.bind(this));
    },

    destroyed: function () {
        var firebase = this.$user.firebase;
        firebase.offAuth();
    },

    methods: {
        authWithProvider: function (provider, e) {
            var vm = this;

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