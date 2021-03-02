import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Grid,
	Hidden,
	makeStyles,
	Theme,
	Typography,
} from "@material-ui/core";
import Link from "next/link";
import React from "react";
import { Stream } from "../__generated__/lib/graphql/createStream.graphql";

interface Props {
	streams: Stream[];
}

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		marginTop: theme.spacing(4),
	},
	card: {
		display: "flex",
	},
	cardDetails: {
		flex: 1,
	},
	cardMedia: {
		width: 160,
	},
}));

const Posts: React.FC<Props> = ({ streams }) => {
	const classes = useStyles();

	return (
		<Grid spacing={4} className={classes.container} container>
			{streams.map((stream) => (
				<Grid item key={stream._id} xs={12} md={6}>
					<Link href={`/streams/${stream._id}`}>
						<CardActionArea href="#" component="a">
							<Card className={classes.card}>
								<div className={classes.cardDetails}>
									<CardContent>
										<Typography component="h2" variant="h5">
											{stream.title}
										</Typography>
										<Typography color="textSecondary" variant="subtitle1">
											{stream.url}
										</Typography>
										<Typography paragraph variant="subtitle1">
											{stream.description}
										</Typography>
									</CardContent>
								</div>
								<Hidden xsDown>
									<CardMedia
										className={classes.cardMedia}
										image="https://source.unsplash.com/random"
										title="Image title"
									/>
								</Hidden>
							</Card>
						</CardActionArea>
					</Link>
				</Grid>
			))}
		</Grid>
	);
};

export default Posts;
