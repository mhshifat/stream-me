import { ApolloProvider } from "@apollo/client";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Header from "components/Header";
import { useApollo } from "lib/apollo";
import { themeDark, themeLight } from "lib/theme";
import { AuthProvider } from "lib/useAuth";
import { useEffect, useState } from "react";

export default function MyApp({ Component, pageProps }) {
	const apolloClient = useApollo(pageProps.initialApolloState);
	const [darkState, setDarkState] = useState(false);

	useEffect(() => {
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles && jssStyles.parentNode) {
			jssStyles.parentNode.removeChild(jssStyles);
		}
	}, []);

	const handleThemeChange = () => setDarkState(!darkState);

	return (
		<ApolloProvider client={apolloClient}>
			<ThemeProvider theme={darkState ? themeDark : themeLight}>
				<CssBaseline />
				<AuthProvider>
					<Header darkState={darkState} handleThemeChange={handleThemeChange} />
					<Component {...pageProps} />
				</AuthProvider>
			</ThemeProvider>
		</ApolloProvider>
	);
}
