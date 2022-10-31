import { gql } from '@apollo/client';

export const LOAD_ITEMS = gql`
	{
		categories {
			products {
				name
				gallery
				inStock
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
