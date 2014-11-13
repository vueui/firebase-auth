
var errors = {
    'EMAIL_TAKEN': 'The specified email address is already in use.',
    'INVALID_EMAIL': 'The specified email is not a valid email.',
    'INVALID_PASSWORD': 'The specified user account password is incorrect.',
    'INVALID_USER': 'A user with the specified username does not exist.'
};

module.exports = function(error) {
    return errors[error.code] || 'Uh, oh. There was an error on our end. Please try again.';
};