import nextApp from "@stream-me/app";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import "dotenv/config";
import express from "express";
import "reflect-metadata";
import { createSchema } from "../schemas";
import createSession from "../session";

const port = process.env.PORT || 5000;
const handle = nextApp.getRequestHandler();
const corsOptions = {
	credentials: true,
};

async function createServer() {
	try {
		await createSession();
		const app = express();
		app.use(cors(corsOptions));
		app.use(express.json());
		const schema = await createSchema();
		const apolloServer = new ApolloServer({
			schema,
			context: ({ req, res }) => ({ req, res }),
			introspection: true,
			playground: {
				settings: {
					"request.credentials": "include",
				},
			},
		});

		apolloServer.applyMiddleware({ app, cors: corsOptions });
		await nextApp.prepare();
		app.get("*", (req, res) => handle(req, res));
		app.listen({ port }, () => {
			console.log(
				`The server is running at http://localhost:${port}${apolloServer.graphqlPath}`
			);
		});
	} catch (err) {
		console.error(err);
	}
}

createServer();
