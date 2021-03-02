import { Box, Button, Container, Typography } from "@material-ui/core";
import Link from "next/link";

export default function HomePage() {
	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<Typography variant="h4" component="h1" gutterBottom>
					Next.js Example
				</Typography>
				<Link href="/about">
					<Button variant="contained" color="primary">
						Go to the about page
					</Button>
				</Link>
			</Box>
		</Container>
	);
}
