import { makeStyles } from "@material-ui/core";
import React from "react";

type VideoProps = {
	url: string;
};

const useStyles = makeStyles(() => ({
	container: {
		paddingTop: "56.25%",
		position: "relative",
	},
	iframe: {
		border: 0,
		height: "100%",
		left: 0,
		top: 0,
		width: "100%",
		position: "absolute",
	},
}));

const Content: React.FC<VideoProps> = ({ url }) => {
	const styles = useStyles();

	return (
		<div className={styles.container}>
			<iframe
				src={url}
				className={styles.iframe}
				frameBorder="0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
				allowFullScreen={true}
				loading="lazy"
			/>
		</div>
	);
};

export default Content;
