
/**
 * Model dependencies
 */

var Promise = require('rsvp').Promise;


/**
 * User definition
 * @type {Function}
 */

var User = module.exports = function(firebase) {
    var url = 'https://' + firebase + '.firebaseio.com';

    this.firebase = new Firebase(url);
};

User.prototype.signup = function (user) {
    var firebase = this.firebase;

    return new Promise(function (resolve, reject) {

        firebase.createUser(user, function (error) {
            if(error) reject(error);
            else resolve();
        });

    });
};

User.prototype.login = function (user) {
    var firebase = this.firebase;

    return new Promise(function (resolve, reject) {

        firebase.authWithPassword(user, function (error, authData) {
            if(error) reject(error);
            else if(authData) resolve(authData);
        });

    });
};

User.prototype.authWithProvider = function (provider, scope) {
    var firebase = this.firebase;
    var settings = { scope: scope };

    return new Promise(function (resolve, reject) {

        firebase.authWithOAuthPopup(provider, function (error, authData) {
            if(error) {
                if(error.code === 'TRANSPORT_UNAVAILABLE') {
                    firebase.authWithOAuthRedirect(provider, function (err, authData) {
                        if(err) reject(err);
                        else if(authData) resolve(authData);
                    }, settings);
                } else {
                    reject(error);
                }
            } else if(authData) {
                resolve(authData);
            }
        }, settings)

    });
};

User.prototype.logout = function () {
    var firebase = this.firebase;

    return new Promise(function (resolve, reject) {
        firebase.unauth();
        resolve();
    });
};