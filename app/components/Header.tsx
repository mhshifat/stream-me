import {
	AppBar,
	Button,
	Link as LinkText,
	makeStyles,
	Switch,
	Theme,
	Toolbar,
	Typography,
} from "@material-ui/core";
import Link from "next/link";
import React from "react";
import { useAuth } from "../lib/useAuth";

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flrxGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flrxGrow: 1,
	},
	list: {
		width: 250,
	},
	links: {
		marginLeft: "auto",
	},
}));

const Header = ({ darkState, handleThemeChange }) => {
	const classes = useStyles();
	const { user } = useAuth();

	const links = [
		!user && { label: "Sign Up", href: "/auth/signup" },
		!user && { label: "Sign In", href: "/auth/signin" },
		user && { label: "Create", href: "/streams/new" },
		user && { label: "Sign Out", href: "/auth/signout" },
	]
		.filter((link) => link)
		.map(({ label, href }) => (
			<Link key={href} href={href}>
				<Button color="inherit">{label}</Button>
			</Link>
		));

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						<Link href="/">
							<LinkText href="" color="inherit">
								Stream.me
							</LinkText>
						</Link>
					</Typography>
					<div className={classes.links}>
						<Switch checked={darkState} onChange={handleThemeChange} />
						{links}
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Header;
