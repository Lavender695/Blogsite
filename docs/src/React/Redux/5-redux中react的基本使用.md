# redux中react的基本使用

直接上一个例子（后续还有优化的版本）

```js
// store/index.js
import { createStore } from "redux"
import reducer from "./reducer"

const store = createStore(reducer)

export default store
```

```js
// store.reducer
import * as actionTypes from "./constants"

const initialState = {
  counter: 1
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_NUMBER:
      return {...state, counter: state.counter + action.num}
    case actionTypes.SUB_NUMBER:
      return {...state, counter: state.counter - action.num}
    default:
      return state
  }
}

export default reducer
```

```js
// store.actionCreators
import * as actionTypes from "./constants"

const addNumberAction = (num) => ({
  type: actionTypes.ADD_NUMBER,
  num
})

const subNumberAction = (num) => ({
  type: actionTypes.SUB_NUMBER,
  num
})

const actionCreators = {
  addNumberAction,
  subNumberAction
}

export default actionCreators
```

```js
// store.constants
export const ADD_NUMBER = "add_num"
export const SUB_NUMBER = "sub_num"

```

```jsx
// App.jsx
import React, { PureComponent } from 'react'
import Home from './pages/Home'
import Profile from './pages/Profile'
import "./style.css"
import store from './store'


export class App extends PureComponent {
  constructor() {
    super()

    this.state = {
      counter: store.getState().counter
    }
  }

  componentDidMount() {
    store.subscribe(() => {
      const state = store.getState()
      this.setState({counter: state.counter})
    })
  }

  render() {
    const { counter } = this.state

    return (
      <div>
        <h2>App counter: {counter}</h2>

        <div className="pages">
          <Home />
          <Profile />
        </div>

      </div>
    )
  }
}

export default App
```

```jsx
// pages/Home.jsx
import React, { PureComponent } from 'react'
import store from '../store'
import actionCreators from '../store/actionCreators'

export class Home extends PureComponent {
  constructor() {
    super()

    this.state = {
      counter: store.getState().counter
    }
  }

  componentDidMount() {
    store.subscribe(() => {
      const state = store.getState()
      this.setState({counter: state.counter})
    })
  }

  addNumber(num) {
    store.dispatch(actionCreators.addNumberAction(num))
  }  

  render() {
    const { counter } = this.state

    return (
      <div>
        <h2>Home Counter: { counter }</h2>
        <button onClick={e => this.addNumber(1)}>+1</button>
        <button onClick={e => this.addNumber(5)}>+5</button>
        <button onClick={e => this.addNumber(10)}>+10</button>
      </div>
    )
  }
}

export default Home
```

```jsx
// pages/Profile.jsx
import React, { PureComponent } from 'react'
import store from '../store'
import actionCreators from '../store/actionCreators'

export class Profile extends PureComponent {
  constructor() {
    super()

    this.state = {
      counter: store.getState().counter
    }
  }

  componentDidMount() {
    store.subscribe(() => {
      const state = store.getState()
      this.setState({counter: state.counter})
    })
  }

  subNumber(num) {
    store.dispatch(actionCreators.subNumberAction(num))
  }

  render() {
    const { counter } = this.state

    return (
      <div>
        <h2>Profile Counter: {counter}</h2>
        <button onClick={e => this.subNumber(1)}>-1</button>
        <button onClick={e => this.subNumber(5)}>-5</button>
        <button onClick={e => this.subNumber(10)}>-10</button>
      </div>
    )
  }
}

export default Profile
```

