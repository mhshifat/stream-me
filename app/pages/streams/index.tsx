import { Box, Container, Typography } from "@material-ui/core";
import Posts from "components/Posts";
import { useEffect } from "react";
import { Stream } from "../../__generated__/lib/graphql/createStream.graphql";
import { useStreamsQuery } from "../../__generated__/lib/graphql/streams.graphql";

export default function StreamsPage() {
	const { data, loading, refetch } = useStreamsQuery({ errorPolicy: "ignore" });

	useEffect(() => {
		refetch();
	}, []);

	return (
		<Container maxWidth="lg">
			<Box my={4}>
				<Typography variant="h4">Streams</Typography>
			</Box>
			{!loading && data && data.streams && (
				<Posts streams={data.streams as Stream[]} />
			)}
		</Container>
	);
}
