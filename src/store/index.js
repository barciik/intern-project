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
		totalPrice: 0,
		priceArray: [],
		orderData: [],
		errorMessage: ''
	},
	reducers: {
		changeCurrency(state, action) {
			state.currency = action.payload;
			state.priceArray = [];
			for (let i = 0; i < state.cart.length; i++) {
				state.priceArray.push(
					state.cart[i].prices.find(
						(el) => el.currency.symbol === state.currency
					).amount * state.cart[i].quantity
				);
			}
			state.totalPrice = state.priceArray.reduce(
				(partialSum, a) => partialSum + a,
				0
			);
		},
		showCart(state) {
			state.cartIsVisible = !state.cartIsVisible;
			state.dropDownIsVisible = false;
			if (state.cartIsVisible) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = 'visible';
			}
		},
		showDropdown(state) {
			state.dropDownIsVisible = !state.dropDownIsVisible;
			state.cartIsVisible = false;
		},
		addToCart(state, action) {
			const id = action.payload.id;
			const existingItem = state.cart.find((item) => item.id === id && JSON.stringify(item.selectedAttributes) === JSON.stringify(action.payload.selectedAttributes));

			if(action.payload.selectedAttributes.length !== action.payload.attributes.length) {
				state.errorMessage = 'Select all attributes!'
				window.scrollTo({top: 0, behavior: 'smooth'})
				return
			}
			state.errorMessage = ''
			state.totalQuantity++;

			state.totalPrice += action.payload.prices.find(
				(el) => el.currency.symbol === state.currency
			).amount;

			if (existingItem) {
				existingItem.quantity++;
			} else {
				state.cart.push({
					id: action.payload.id,
					name: action.payload.name,
					description: action.payload.description,
					gallery: action.payload.gallery,
					prices: action.payload.prices,
					attributes: action.payload.attributes,
					selectedAttributes: action.payload.selectedAttributes || [],
					brand: action.payload.brand,
					quantity: 1,
					categories: [],
				});
				console.log(current(state.cart));
			}
		},
		removeFromCart(state, action) {
			const id = action.payload.id;
			const existingItem = state.cart.find((item) => item.id === id && JSON.stringify(item.selectedAttributes) === JSON.stringify(action.payload.selectedAttributes));
			state.totalQuantity--;
			state.totalPrice -= action.payload.prices.find(
				(el) => el.currency.symbol === state.currency
			).amount;
			if (existingItem.quantity === 1) {
				state.cart = state.cart.filter((item) => item !== existingItem);
			} else {
				existingItem.quantity--;
			}
		},
		// setAttribute(state, action) {
		// 	const existingItem = state.cart.find((item) => item.id === action.payload.itemId && JSON.stringify(item.selectedAttributes) === JSON.stringify(action.payload.selectedAttributes))
		// 	const attribute = existingItem.selectedAttributes.find(item => item.id === action.payload.id)
		// 	if(!existingItem.selectedAttributes.find(item => item.id === action.payload.id)){
		// 		existingItem.selectedAttributes = [...existingItem.selectedAttributes, action.payload]
		// 	} else {
		// 		attribute.value = action.payload.value
		// 	}
			

		// },
		sendOrder(state) {
			console.log(current(state.cart));
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
	setAttribute,
	sendOrder,
} = actions;
export default reducer;
