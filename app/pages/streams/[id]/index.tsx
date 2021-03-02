import { Container } from "@material-ui/core";
import Content from "components/Content";
import Hero from "components/Hero";
import { useStreamQuery } from "../../../__generated__/lib/graphql/stream.graphql";

export default function StreamDetailsPage({ id }) {
	const { data, loading } = useStreamQuery({ variables: { streamId: id } });

	if (!loading && data && data.stream)
		return (
			<Container maxWidth="lg">
				<Hero stream={data.stream} />
				<Content url={data.stream.url} />
			</Container>
		);

	return null;
}

StreamDetailsPage.getInitialProps = ({ query: { id } }) => {
	return { id };
};
