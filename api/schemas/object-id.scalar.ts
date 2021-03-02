import { GraphQLScalarType, Kind } from "graphql";
import { ObjectId } from "mongodb";

export const ObjectIdScalar = new GraphQLScalarType({
	name: "ObjectId",
	description: "Mongo id scalar type",
	parseValue: (value: string) => new ObjectId(value),
	serialize: (value: ObjectId) => value.toHexString(),
	parseLiteral: (ast) =>
		ast.kind === Kind.STRING ? new ObjectId(ast.value) : null,
});
