import { create } from "zustand";
import { account, teams } from "../appwrite";

export const useUserStore = create((set) => ({
	setUser: (x) => set({ user: x }),
	professor: false,
	user: Login(set),
}));

function Login(set) {
	(async () => {
		console.log("eeeeeeeeeeeee");
		set({ user: (await account.getSession("current")) || null });
		try {
			let r = await teams.get("6657a5e200160dc5390b");
			r.name && set({ professor: true });
		} catch (e) {}
	})();

	return false;
}
