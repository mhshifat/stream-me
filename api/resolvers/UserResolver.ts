import { User, UserModel } from "entities/User";
import { ObjectId } from "mongodb";
import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../middlewares/isAuth";
import { ObjectIdScalar } from "../schemas/object-id.scalar";
import { MyContext } from "../types/myContext";

@Resolver(() => User)
export class UserResolver {
	@Query(() => User, { nullable: true })
	async user(@Arg("userId", () => ObjectIdScalar) userId: ObjectId) {
		return await UserModel.findById(userId);
	}

	@Query(() => User, { nullable: true })
	@UseMiddleware(isAuth)
	async currentUser(@Ctx() ctx: MyContext): Promise<User | null> {
		return await UserModel.findById(ctx.res.locals.userId);
	}
}
