import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
	mutation signupUser($username: String!, $email: String!, $password: String!) {
	signupUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const LOGIN_USER = gql`
	mutation loginUser($email: String!, $password: String!) {
		loginUser(email: $email, password: $password) {
			token
			user {
				_id
				username
				email
			}
		}
	}
`;

export const SAVE_BOOK = gql`
	mutation saveBook($bookData: BookInput!) {
		saveBook(bookData: $bookData) {
			_id
			username
			email
			bookCount
			savedBooks {
				bookId
				authors
				description
				title
				image
				link
			}
		}
	}
`;

export const DELETE_BOOK = gql`
	mutation deleteBook($bookId: ID!) {
		deleteBook(bookId: $bookId) {
			username
			savedBooks {
				bookId
				authors
				description
				title
				image
				link
			}
		}
	}
`;
