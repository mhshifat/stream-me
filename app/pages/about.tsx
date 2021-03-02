import { Box, Button, Container, Typography } from "@material-ui/core";
import Link from "next/link";

export default function AboutPage() {
	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<Typography variant="h4" component="h1" gutterBottom>
					Next.js Example
				</Typography>
				<Link href="/">
					<Button variant="contained" color="primary">
						Go to the home page
					</Button>
				</Link>
			</Box>
		</Container>
	);
}
