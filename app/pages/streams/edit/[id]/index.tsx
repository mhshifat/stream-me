import {
	Box,
	Button,
	Container,
	TextField,
	Typography,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { initializeApollo } from "../../../../lib/apollo";
import { useDeleteStreamMutation } from "../../../../__generated__/lib/graphql/deleteStream.graphql";
import { useEditStreamMutation } from "../../../../__generated__/lib/graphql/editStream.graphql";
import { StreamDocument } from "../../../../__generated__/lib/graphql/stream.graphql";

export default function EditStream({ id }) {
	const router = useRouter();
	const [editStream] = useEditStreamMutation();
	const [deleteStream] = useDeleteStreamMutation();
	const [state, setState] = useState({
		_id: "",
		title: "",
		description: "",
		url: "",
	});

	useEffect(() => {
		fetchStream();
	}, []);

	const { _id, title, description, url } = state;

	const fetchStream = async () => {
		const apollo = initializeApollo();
		const { data } = await apollo.query({
			query: StreamDocument,
			variables: { streamId: id },
		});
		setState(data.stream);
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			const { data } = await editStream({
				variables: { input: { id: _id, title, description, url } },
			});
			if (data.editStream._id) {
				router.push("/streams");
			}
		} catch (err) {
			console.error(err);
		}
	};

	const onDelete = async (event) => {
		event.preventDefault();
		try {
			const { data } = await deleteStream({ variables: { streamId: id } });
			if (data.deleteStream) {
				router.push("/streams");
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<Typography variant="h4">Edit Stream</Typography>
				<form onSubmit={onSubmit}>
					<Box pb={2.5} />
					<TextField
						autoFocus
						value={title}
						onChange={(e) => setState({ ...state, title: e.target.value })}
						className="form-control"
						label="Title"
						required
					/>
					<Box pb={2.5} />
					<TextField
						value={description}
						onChange={(e) =>
							setState({ ...state, description: e.target.value })
						}
						className="form-control"
						label="Description"
						required
					/>
					<Box pb={2.5} />
					<TextField
						value={url}
						onChange={(e) => setState({ ...state, url: e.target.value })}
						className="form-control"
						label="Url"
						required
					/>
					<Box pb={2.5} />
					<Button type="submit" variant="contained" color="primary">
						Save
					</Button>
					<Button variant="contained" onClick={onDelete}>
						Delete
					</Button>
				</form>
			</Box>
		</Container>
	);
}

EditStream.getInitialProps = ({ query: { id } }) => ({ id });
