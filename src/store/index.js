import { createSlice, configureStore, current } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
	name: 'currency',
	initialState: {
		currency: '$',
		cartIsVisible: false,
		dropDownIsVisible: false,
		cart: [],
		selectedAttributes: [],
		totalQuantity: 0,
	},
	reducers: {
		changeCurrency(state, action) {
			console.log(action);
			state.currency = action.payload;
		},
		showCart(state) {
			state.cartIsVisible = !state.cartIsVisible;
			state.dropDownIsVisible = false;
		},
		showDropdown(state) {
			state.dropDownIsVisible = !state.dropDownIsVisible;
			state.cartIsVisible = false;
		},
		addToCart(state, action) {
			const id = action.payload.id;
			const existingItem = state.cart.find((item) => item.id === id);
			if (existingItem) {
				existingItem.quantity++;
				state.totalQuantity += 1;
				// existingItem.price += action.payload.prices.find(item => item.currency.symbol === state.currency).amount;
			} else {
				console.log(action.payload);
				state.totalQuantity += 1;
				state.cart.push({
					id: action.payload.id,
					name: action.payload.name,
					description: action.payload.description,
					gallery: action.payload.gallery,
					prices: action.payload.prices,
					attributes: action.payload.attributes,
					quantity: 1,
				});
			}
			console.log(current(state.cart));
		},
		removeFromCart(state, action) {
			const id = action.payload.id;
			const existingItem = state.cart.find((item) => item.id === id);
			if (existingItem.quantity === 1) {
				state.cart = state.cart.filter((item) => item.id !== id);
			} else {
				existingItem.quantity--;
			}
		},
		selectAttributes(state, action) {
			const id = action.payload.itemId;
			const attrId = action.payload.id;
			console.log(id, attrId);
			const existingItem = state.selectedAttributes.find(
				(item) => item.id === id
			);
			const existingAttr = state.selectedAttributes.find(
				(item) => item.id === attrId
			);
			if (existingItem) {
				console.log(existingItem);
				existingItem.value = action.payload.value;
				console.log(current(state.selectedAttributes));
				return;
			}
			state.selectedAttributes.push({
				[action.payload.itemId]: {
					id: action.payload.itemId,
					attributeId: action.payload.id,
					value: action.payload.value,
				},
			});
			console.log(current(state.selectedAttributes));
		},
	},
});

export const store = configureStore({
	reducer: {
		cart: cartSlice.reducer,
	},
});

const { actions, reducer } = cartSlice;
export const {
	changeCurrency,
	showCart,
	showDropdown,
	addToCart,
	removeFromCart,
	selectAttributes,
} = actions;
export default reducer;
