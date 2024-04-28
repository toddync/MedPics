import { create } from "zustand";
import pb from "../pb";

const useUserStore = create((set) => ({
    user: pb.authStore.model,
    log: () => set({ user: pb.authStore.model }),
}));

export default useUserStore;
