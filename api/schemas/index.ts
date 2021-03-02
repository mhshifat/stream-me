import { GraphQLSchema } from "graphql";
import { ObjectId } from "mongodb";
import path from "path";
import { buildSchema } from "type-graphql";
import { typegooseMiddleware } from "../middlewares/typegoose";
import { AuthResolver } from "../resolvers/AuthResolver";
import { StreamResolver } from "../resolvers/StreamResolver";
import { UserResponse } from "../types/userResponse";
import { ObjectIdScalar } from "./object-id.scalar";

export const createSchema = async (): Promise<GraphQLSchema> => {
	const schema = await buildSchema({
		resolvers: [AuthResolver, UserResponse, StreamResolver],
		emitSchemaFile: path.resolve(__dirname, "schema.gql"),
		globalMiddlewares: [typegooseMiddleware],
		scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
		validate: false,
	});
	return schema;
};
