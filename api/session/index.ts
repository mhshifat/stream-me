import { connect, ConnectOptions } from "mongoose";

export default async function createSession() {
	const mongoUrl = process.env.MONGODB_URI || "";
	if (!mongoUrl) throw new Error("Missing mongo url");
	const options: ConnectOptions = {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	};
	await connect(mongoUrl, options);
}
