import { createStore, combineReducers, applyMiddleware, } from 'redux'
import { createLogger, } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools, } from 'redux-devtools-extension'
import weather from './weather'
import settings from './settings'
import evaluation from './evaluation'
const reducer = combineReducers({
  weather,
  settings,
  evaluation,
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: false, }))
)
const store = createStore(reducer, middleware)

export default store
