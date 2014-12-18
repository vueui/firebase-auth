## vueui-firebase-auth
The easiest way to setup Firebase authentication if you are using Vue.js and Semantic-UI.

![vueui-firebase-auth](https://raw.githubusercontent.com/vueui/firebase-auth/master/assets/screenshot.png)

## Usage
First install the npm package:
```npm i -S vueui-firebase-auth```

Then import it into your project:
```js
var Vue = require('vue')
var firebaseAuth = require('vueui-firebase-auth');

Vue.use(firebaseAuth)

```
That will register three components globally: ```ui-auth, ui-login, ui-signup```. You will be
using ```ui-auth```, unless you need to customize the UI, etc.

You now have two ways to consume the component:

```html
<ui-auth
    firebase="your-firebase-app"
    facebook='email'
    google='email'
    github='user, gist'
    twitter></ui-auth>
```

OR

```js
var Auth = Vue.component('ui-auth'); // Retrieve the ui-auth component constructor

var auth = new Auth({
    el: '#some-id',
    data: {
        firebase: 'your-firebase-app',
        providers: [ 'facebook', 'google', 'github' ],
        scopes: {
            facebook: 'email, user_likes',
            google: 'email',
            github: 'user, gist'
        }
    }
})
```
***That's it!***

## API

A ```$user``` property is attached to ```$root``` and it has the following methods:

### .signup(user|Object)

### .login(user|Object)

### .logout()

### .authWithProvider(provider|String, scope|String)

## Events

Two events are emitted on ```$root``` when a user is authenticated: ```user:loggedIn``` which receives the ```user```
data as an argument, and ```user:loggedOut```