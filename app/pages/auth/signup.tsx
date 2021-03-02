import {
	Box,
	Button,
	Container,
	TextField,
	Typography,
} from "@material-ui/core";
import { useAuth } from "lib/useAuth";
import { useState } from "react";

export default function SignUpPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { error, signUp } = useAuth();

	const onSubmit = async (event) => {
		event.preventDefault();
		signUp(email, password);
	};

	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<form onSubmit={onSubmit}>
					{error && <p>{error}</p>}
					<Typography variant="h4">Sign Up</Typography>
					<Box pb={2.5} />
					<TextField
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="form-control"
						label="Email"
						required
					/>
					<Box pb={2.5} />
					<TextField
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="form-control"
						label="Password"
						required
						type="password"
					/>
					<Box pb={2.5} />
					<Button
						variant="contained"
						size="large"
						color="primary"
						type="submit"
					>
						Sign Up
					</Button>
				</form>
			</Box>
		</Container>
	);
}
