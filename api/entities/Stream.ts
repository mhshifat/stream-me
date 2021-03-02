import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";
import { Ref } from "../types/ref";
import { User } from "./User";

@ObjectType()
export class Stream {
	@Field()
	readonly _id: ObjectId;

	@Field()
	@Property({ required: true })
	title: string;

	@Field()
	@Property({ required: true })
	description: string;

	@Field()
	@Property({ required: true })
	url: string;

	@Field(() => User)
	@Property({ ref: User, required: true })
	author: Ref<User>;
}

export const StreamModel = getModelForClass(Stream);
