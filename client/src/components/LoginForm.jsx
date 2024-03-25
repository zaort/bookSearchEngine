// see SignupForm.js for comments
import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

// import { loginUser } from "../utils/API";
import Authenticated from "../utils/auth";

const LoginForm = () => {
	const [userFormData, setUserFormData] = useState({ email: "", password: "" });
	const [validated] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [loginMut, { err, data }] = useMutation(LOGIN_USER); // useMutation hook for login mutation

	const handleInputChange = event => {
		const { name, value } = event.target;
		setUserFormData({ ...userFormData, [name]: value });
	};

	const handleFormSubmit = async event => {
		event.preventDefault();

		// check if form has everything (as per react-bootstrap docs)
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		try {
			const { data } = await loginMut({
				variables: { email: userFormData.email, password: userFormData.password },
			});
			console.log("Token from login mutation:", data.loginUser.token); // Here, use data.loginUser.token
			if (!data || !data.loginUser || !data.loginUser.token) {
				console.error("Unexpected response from login mutation:", data);
				setShowAlert(true);
				return;
			}

			// console.log("Data from login mutation:", data);
			console.log("Token from login mutation:", data.loginUser.token);
			Authenticated.login(data.loginUser.token); // Here, use Authenticated.login
		} catch (err) {
			console.error("Error from login function:", err);
			setShowAlert(true);
		}

		setUserFormData({
			email: "",
			password: "",
		});
	};

	return (
		<>
			<Form noValidate validated={validated} onSubmit={handleFormSubmit}>
				<Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
					Something went wrong with your login credentials!
				</Alert>
				<Form.Group className="mb-3">
					<Form.Label htmlFor="email">Email</Form.Label>
					<Form.Control
						type="text"
						placeholder="Your email"
						name="email"
						onChange={handleInputChange}
						value={userFormData.email}
						required
					/>
					<Form.Control.Feedback type="invalid">Email is required!</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label htmlFor="password">Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Your password"
						name="password"
						onChange={handleInputChange}
						value={userFormData.password}
						required
					/>
					<Form.Control.Feedback type="invalid">Password is required!</Form.Control.Feedback>
				</Form.Group>
				<Button
					disabled={!(userFormData.email && userFormData.password)}
					type="submit"
					variant="success"
				>
					Submit
				</Button>
			</Form>
		</>
	);
};

export default LoginForm;
