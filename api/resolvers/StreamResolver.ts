import { ObjectId } from "mongodb";
import {
	Arg,
	Ctx,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root,
	UseMiddleware,
} from "type-graphql";
import { Stream, StreamModel } from "../entities/Stream";
import { User, UserModel } from "../entities/User";
import { isAuth } from "../middlewares/isAuth";
import { ObjectIdScalar } from "../schemas/object-id.scalar";
import { MyContext } from "../types/myContext";
import { StreamInput } from "../types/streamInput";

@Resolver(() => Stream)
export class StreamResolver {
	@Query(() => Stream, { nullable: true })
	async stream(@Arg("streamId", () => ObjectIdScalar) streamId: ObjectId) {
		return await StreamModel.findById(streamId);
	}

	@Query(() => [Stream])
	@UseMiddleware(isAuth)
	async streams(@Ctx() ctx: MyContext) {
		return await StreamModel.find({ author: ctx.res.locals.userId });
	}

	@Mutation(() => Stream)
	@UseMiddleware(isAuth)
	async addStream(
		@Arg("input") input: StreamInput,
		@Ctx() ctx: MyContext
	): Promise<Stream> {
		const stream = new StreamModel({
			...input,
			author: ctx.res.locals.userId,
		} as Stream);
		await stream.save();
		return stream;
	}

	@Mutation(() => Stream)
	@UseMiddleware(isAuth)
	async editStream(
		@Arg("input") input: StreamInput,
		@Ctx() ctx: MyContext
	): Promise<Stream> {
		const { id, title, description, url } = input;
		const stream = await StreamModel.findOneAndUpdate(
			{ _id: id, author: ctx.res.locals.userId },
			{ title, description, url },
			{ runValidators: true, new: true }
		);
		if (!stream) throw new Error("Stream not found");
		return stream;
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async deleteStream(
		@Arg("streamId", () => ObjectIdScalar) streamId: ObjectId,
		@Ctx() ctx: MyContext
	): Promise<Boolean | undefined> {
		const deleted = await StreamModel.findOneAndDelete({
			_id: streamId,
			author: ctx.res.locals.userId,
		});
		if (!deleted) throw new Error("Stream not found");
		return true;
	}

	@FieldResolver()
	async author(@Root() stream: Stream): Promise<User | null> {
		return await UserModel.findById(stream.author);
	}
}
