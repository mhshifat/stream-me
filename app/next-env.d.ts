/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "*.graphqls" {
	export default typeof DocumentNode;
}

declare module "*.yml";
