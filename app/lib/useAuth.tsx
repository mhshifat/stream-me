import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import React, { createContext, useContext, useState } from "react";
import { useCurrentUserQuery } from "../__generated__/lib/graphql/currentUser.graphql";
import { useSignInMutation } from "../__generated__/lib/graphql/signin.graphql";
import { useSignUpMutation } from "../__generated__/lib/graphql/signup.graphql";

type AuthProps = {
	user: any;
	error: string;
	signIn: (email: any, password: any) => Promise<void>;
	signUp: (email: any, password: any) => Promise<void>;
	signOut: () => void;
};

const AuthContext = createContext<Partial<AuthProps>>({});

const useProvideAuth = () => {
	const router = useRouter();
	const client = useApolloClient();
	const [error, setError] = useState("");
	const [signInMutation] = useSignInMutation();
	const [signUpMutation] = useSignUpMutation();
	const { data } = useCurrentUserQuery({
		fetchPolicy: "network-only",
		errorPolicy: "ignore",
	});

	const user = data && data.currentUser;
	const signIn = async (email: string, password: string) => {
		try {
			const { data } = await signInMutation({ variables: { email, password } });
			if (data.login.token && data.login.user) {
				sessionStorage.setItem("token", data.login.token);
				client.resetStore().then(() => {
					router.push("/");
				});
			} else {
				setError("Invalid login");
			}
		} catch (err) {
			setError(err.message);
		}
	};
	const signUp = async (email: string, password: string) => {
		try {
			const { data } = await signUpMutation({ variables: { email, password } });
			if (data.register.token && data.register.user) {
				sessionStorage.setItem("token", data.register.token);
				client.resetStore().then(() => {
					router.push("/");
				});
			} else {
				setError("Invalid login");
			}
		} catch (err) {
			setError(err.message);
		}
	};
	const signOut = () => {
		sessionStorage.removeItem("token");
		client.resetStore().then(() => {
			router.push("/");
		});
	};

	return { user, error, signIn, signUp, signOut };
};

export const AuthProvider: React.FC = ({ children }) => {
	const auth = useProvideAuth();

	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
