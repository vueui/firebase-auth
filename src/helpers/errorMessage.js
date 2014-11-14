
var errors = {
    'EMAIL_TAKEN': 'The specified email address is already in use.',
    'INVALID_EMAIL': 'The specified email is not a valid email.',
    'INVALID_PASSWORD': 'The specified user account password is incorrect.',
    'INVALID_USER': 'A user with the specified username does not exist.',
    'UNKNOWN_ERROR': 'Well this is embarrassing. We are not sure what happened, so please try again.',
    'USER_CANCELLED': 'It seems like you cancelled authentication with your social account.',
    'USER_DENIED': 'You did not authorize our application with your social account'
};

module.exports = function(error) {
    return errors[error.code] || 'Uh, oh. There was an error on our end. Please try again.';
};