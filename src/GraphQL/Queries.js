import { gql } from '@apollo/client';

export const getProduct = gql`
	query getProduct($id: String!) {
		product(id: $id) {
			id
			name
			inStock
			gallery
			description
			attributes {
				name
				type
				items {
					displayValue
					value
					id
				}
			}
			prices {
				currency {
					label
					symbol
				}
				amount
			}
			brand
		}
	}
`;

export const getCategories = gql`
	{
		categories {
			name
		}
		currencies {
			label
			symbol
		}
	}
`;

export const getCategoryItems = gql`
query getCategory($input: CategoryInput) {
	category(input: $input) {
		name
		products {
			id
			name
			gallery
			attributes {
				name
				type
				items {
					displayValue
					value
					id
				}
			}
			prices {
				currency {
					label
					symbol
				}
				amount
			}
			inStock
		}
	}
}
`;

// export const getCategoryItems = gql`
// query getCategory($category: CategoryInput){
// 	category(input: $category) {
// 	  name
// 	  products {
// 		id
// 		name
// 		gallery
// 		prices {
// 		  currency {
// 			label
// 			symbol
// 		  }
// 		  amount
// 		}
// 	  }
// 	}
//   }
// `;

// export const getProduct = gql`
// 	{
// 		categories {
// 			name
// 			products {
// 				id
// 				name
// 				inStock
// 				gallery
// 				description
// 				attributes {
// 					id
// 					name
// 					type
// 					items {
// 						displayValue
// 						value
// 						id
// 					}
// 				}
// 				prices {
// 					currency {
// 						label
// 						symbol
// 					}
// 					amount
// 				}
// 				brand
// 			}
// 		}
// 	}
// `;
