import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from "type-graphql";
import { User, UserModel } from "../entities/User";
import { isAuth } from "../middlewares/isAuth";
import { AuthInput } from "../types/authInput";
import { MyContext } from "../types/myContext";
import { UserResponse } from "../types/userResponse";

@Resolver(() => User)
export class AuthResolver {
	@Query(() => User, { nullable: true })
	@UseMiddleware(isAuth)
	async currentUser(@Ctx() ctx: MyContext) {
		return await UserModel.findById(ctx.res.locals.userId);
	}

	@Mutation(() => UserResponse)
	async register(
		@Arg("input") { email, password }: AuthInput
	): Promise<UserResponse> {
		const existingUser = await UserModel.findOne({ email });
		if (existingUser) throw new Error("Email already in use");
		const hashPassword = await hash(password, 10);
		const user = new UserModel({ email, password: hashPassword });
		await user.save();
		const payload = { id: user.id };
		const token = sign(
			payload,
			process.env.SESSION_SECRET || "lskdalksdalskdsldkld"
		);
		return { user, token };
	}

	@Mutation(() => UserResponse)
	async login(
		@Arg("input") { email, password }: AuthInput
	): Promise<UserResponse> {
		const existingUser = await UserModel.findOne({ email });
		if (!existingUser) throw new Error("Invalid login");
		const valid = await compare(password, existingUser.password);
		if (!valid) throw new Error("Invalid login");
		const payload = { id: existingUser.id };
		const token = sign(
			payload,
			process.env.SESSION_SECRET || "lskdalksdalskdsldkld"
		);
		return { user: existingUser, token };
	}
}
