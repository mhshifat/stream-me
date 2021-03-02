import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types/myContext";

const APP_SECRET = process.env.SESSION_SECRET || "lskdalksdalskdsldkld";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
	const authorization = context.req.headers["authorization"];
	try {
		const token = authorization?.replace("Bearer ", "");
		const user = verify(token!, APP_SECRET) as any;
		context.res.locals.userId = user.id;
		return next();
	} catch (err) {
		throw new Error(err.message);
	}
};
