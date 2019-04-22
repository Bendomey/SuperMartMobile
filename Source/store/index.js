import {createStore, compose} from 'redux'
import { CartItems } from 'reducers'

let composeEnhancers = compose
if(__DEV__){
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
export default store = createStore(CartItems, composeEnhancers())