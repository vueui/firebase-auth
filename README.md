## vueui-firebase-auth
The easiest way to setup Firebase authentication if you are using Vue.js and Semantic-UI.

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
<ui-auth firebase="your-firebase-app" providers="facebook, twitter, google plus"></ui-auth>
```

OR

```js
var Auth = Vue.component('ui-auth'); // Retrieve the ui-auth component constructor

var auth = new Auth({
    el: '#some-id',
    data: {
        firebase: 'your-firebase-app',
        providers: [ 'facebook', 'twitter', 'github' ]
    }
})
```
***That's it!***

## API

Each ui-auth instance contains a ```$user``` property which has the following methods:

### .signup(user|Object)

### .login(user|Object)

### .logout()

### .authWithProvider(provider|String)
