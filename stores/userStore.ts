import { create } from "zustand";
import { database } from "@/services/firebase/config";
import { ref, onValue } from "firebase/database";
import { initializeUser } from "@/services/firebase/user";
import { User } from "@/types";

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
    initialize: () => Promise<void>;
    unsubscribe?: () => void;
}

const useUserStore = create<UserState>((set, get) => ({
    user: null,
    loading: true,
    error: null,

    initialize: async () => {
        try {
            const user = await initializeUser();
            const userRef = ref(database, `users/${(user as User).uid}`);

            const unsubscribe = onValue(
                userRef,
                (snapshot) => {
                    if (snapshot.exists()) {
                        set({ user: snapshot.val(), loading: false });
                    }
                },
                (error) => {
                    set({ error: error.message, loading: false });
                }
            );

            set({ unsubscribe });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Unknown error", loading: false });
        }
    },
}));

export default useUserStore;
