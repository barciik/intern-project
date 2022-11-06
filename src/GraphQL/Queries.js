import { gql } from '@apollo/client';

export const getItemsQuery = gql`
	{
		categories {
			name
			products {
				id
				name
				inStock
				gallery
				description
				attributes {
					id
					name
				}
				prices {
					currency {
						label
						symbol
					}
					amount
				}
			}
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

export const getProduct = gql`
{
	categories {
		name
		products {
			id
			name
			inStock
			gallery
			description
	attributes{
	  id
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
}

`;
