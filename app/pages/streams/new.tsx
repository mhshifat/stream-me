import {
	Box,
	Button,
	Container,
	TextField,
	Typography,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCreateStreamMutation } from "../../__generated__/lib/graphql/createStream.graphql";

export default function CreateStreamPage() {
	const router = useRouter();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [url, setUrl] = useState("");
	const [createStream] = useCreateStreamMutation();

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			const { data } = await createStream({
				variables: { input: { title, description, url } },
			});
			if (data.addStream._id) {
				router.push("/streams");
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<Typography variant="h4">Create Stream</Typography>
				<form onSubmit={onSubmit}>
					<Box pb={2.5} />
					<TextField
						autoFocus
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="form-control"
						label="Title"
						required
					/>
					<Box pb={2.5} />
					<TextField
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="form-control"
						label="Description"
						required
					/>
					<Box pb={2.5} />
					<TextField
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						className="form-control"
						label="Url"
						required
					/>
					<Box pb={2.5} />
					<Button type="submit" variant="contained" color="primary">
						Create Stream
					</Button>
				</form>
			</Box>
		</Container>
	);
}
