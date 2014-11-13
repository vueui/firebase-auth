var UiLogin = require('./login');
var UiSignup = require('./signup');

module.exports = {

    paramAttributes: ['firebase', 'providers', 'emailEnabled'],

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
            errors: []
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
            this.errors = [];
        }
    },

    components: {
        login: UiLogin,
        signup: UiSignup
    },

    template: require('./templates/auth.jade')
};