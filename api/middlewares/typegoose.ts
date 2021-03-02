import { getClassForDocument } from "@typegoose/typegoose";
import { Document, Model } from "mongoose";
import { MiddlewareFn } from "type-graphql";

export const typegooseMiddleware: MiddlewareFn = async (_, next) => {
	const result = await next();
	if (Array.isArray(result))
		return result.map((item) =>
			item instanceof Model ? convertDocument(item) : item
		);
	if (result instanceof Model) return convertDocument(result);
	return result;
};

function convertDocument(doc: Document) {
	const convertedDoc = doc.toObject();
	const DocumentClass = getClassForDocument(doc)!;
	Object.setPrototypeOf(convertedDoc, DocumentClass.prototype);
	return convertedDoc;
}
