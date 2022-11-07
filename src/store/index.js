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
			// state.totalPrice = state.cart
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
			const existingItem = state.cart.find((item) => item.id === id);

			// state.priceArray = []
			// for(let i = 0; i < state.cart.length; i++) {
			// 	state.priceArray.push(state.cart[i].prices.find(el => el.currency.symbol === state.currency).amount)
			// }
			// state.totalPrice = state.priceArray.reduce((partialSum, a) => partialSum + a, 0).toFixed(2)

			state.totalPrice += action.payload.prices.find(
				(el) => el.currency.symbol === state.currency
			).amount;

			if (existingItem) {
				existingItem.quantity++;
				state.totalQuantity += 1;
				// existingItem.price += action.payload.prices.find(item => item.currency.symbol === state.currency).amount;
			} else {
				console.log(action.payload.brand);
				state.totalQuantity += 1;
				state.cart.push({
					id: action.payload.id,
					name: action.payload.name,
					description: action.payload.description,
					gallery: action.payload.gallery,
					prices: action.payload.prices,
					attributes: action.payload.attributes,
					brand: action.payload.brand,
					quantity: 1,
				});
			}
		},
		removeFromCart(state, action) {
			const id = action.payload.id;
			const existingItem = state.cart.find((item) => item.id === id);
			// for(let i = 0; i < state.cart.length; i++) {
			// 	state.priceArray.push(state.cart[i].prices.find(el => el.currency.symbol === state.currency).amount)
			// }
			// state.totalPrice = state.priceArray.reduce((partialSum, a) => partialSum + a, 0).toFixed(2)
			state.totalPrice -= action.payload.prices.find(
				(el) => el.currency.symbol === state.currency
			).amount;
			if (existingItem.quantity === 1) {
				state.cart = state.cart.filter((item) => item.id !== id);
			} else {
				existingItem.quantity--;
			}
		},
		selectAttributes(state, action) {
			const id = action.payload.itemId;
			const attrId = action.payload.id;
			const existingItem = state.selectedAttributes.find(
				(item) => item.id === id
			);
			const existingAttr = state.selectedAttributes.find(
				(item) => item.attributeId === attrId
			);
			if (existingItem && existingItem.attributeId === action.payload.attributeId) {
				existingItem.value = action.payload.value;
				console.log(current(state.selectedAttributes));
				return;
			} else {
				state.selectedAttributes.push({
					id: action.payload.itemId,
					attributeId: action.payload.id,
					value: action.payload.value,
				});
			}

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
