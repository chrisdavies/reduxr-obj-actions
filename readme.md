## reduxr-obj-actions

A utility to create auto-typed Redux actions from an object.

Part of the [reduxr](https://github.com/chrisdavies/reduxr) family of packages.

[![Build Status](https://travis-ci.org/chrisdavies/reduxr-obj-actions.svg?branch=master)](https://travis-ci.org/chrisdavies/reduxr-obj-actions)

## Usage

Something I found myself doing over and over with Redux was this:

```js
// Define a const for an action's type
const SET_NAME = 'SET_NAME';
const SET_AGE = 'SET_AGE';

// Define an action helper to create/dispatch the set name action
const actions = bindActionCreators({
  setName: name => ({ type: SET_NAME, name }),
  setAge: age => ({ type: SET_AGE, age })
}, dispatch);

```

This is why `obj-actions` was created:

```js
const actions = objActions(dispatch, {
  setName: name => ({name}),
  setAge: age => ({age})
})
```

It may not look like a big savings, but it turns out to be very handy in many scenarios.

Generally, I define my actions/action-helpers in several files, and just call `objActions` from my application main file:

```js
// user-actions.js
export default {
  setName: name => ({name}),
  setAge: age => ({age})
}

// chat-actions.js
export default {
  addMessage: text => ({text}),
  flagMessage: id => ({id})
}

// main.js
import objActions from 'reduxr-obj-actions';
import user from './user-actions';
import chat from './chat-actions';

/// ... other stuff ...

const actions = objActions(dispatch, {
  user,
  chat
})

```

Using the resulting actions object like so:

```js
actions.user.setName('Frank')
```

would dispatch the following action:

```js
{ type: 'user_setName', name: 'Frank' }
```

This pairs nicely with [reduxr-obj-reducer](https://github.com/chrisdavies/reduxr-obj-reducer).

## Automatically passing actions down to containers

The most annoying thing about `objActions` is passing them down to each
container. There is a hacky but effective way of avoiding this:

```js
// In main.js
import actions from './actions'
import objActions from 'reduxr-obj-actions'

let store = createStore(todoApp)

// This is hacky, and is not necessary, but doing this
// prevents us from having to pass actions down through
// each container...
store.dispatch.actions = objActions(store.dispatch, actions);

```

Now, anywhere you can access `dispatch` you can access `dispatch.actions`.

An example of this can be seen [here](https://github.com/chrisdavies/reduxr/blob/master/examples/todos/containers/AddTodo.js).

## License MIT

Copyright (c) 2015 Chris Davies

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
