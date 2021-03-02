import { useAuth } from "lib/useAuth";
import { useEffect } from "react";

export default function SignOutPage() {
	const { signOut } = useAuth();

	useEffect(() => {
		signOut();
	}, []);

	return <div>Signout</div>;
}
