import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers/reducers'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

let store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export default store
