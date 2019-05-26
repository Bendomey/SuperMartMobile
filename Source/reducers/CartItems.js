const CartItems = (state = [], action) => {
	switch(action.type){
		case 'ADD_TO_CART':
			for(i = 0; i < state.length; i++){
				if(state[`${i}`].id === action.payload.id){
					return state;
				}
			}
			return [...state,action.payload]
		case 'EMPTY_CART':
			return [...state,[]]
		case 'REMOVE_FROM_CART':
			return state.filter(CartItem => CartItem.id !== action.payload.id)
	}
	return state;
}

export default CartItems