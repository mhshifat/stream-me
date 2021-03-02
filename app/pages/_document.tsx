import { ServerStyleSheets } from "@material-ui/styles";
import {
	DocumentContext,
	DocumentInitialProps,
} from "next/dist/next-server/lib/utils";
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default class MyDocument extends Document {
	static async getInitialProps(
		ctx: DocumentContext
	): Promise<DocumentInitialProps> {
		const sheets = new ServerStyleSheets();
		const originalRenderPage = ctx.renderPage;
		ctx.renderPage = () =>
			originalRenderPage({
				enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
			});
		const initialProps = await Document.getInitialProps(ctx);
		return {
			...initialProps,
			styles: [
				...React.Children.toArray(initialProps.styles),
				sheets.getStyleElement(),
			],
		};
	}

	render() {
		return (
			<Html>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
