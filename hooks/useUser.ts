import useUserStore from "@/stores/userStore";
import { useEffect } from "react";

export const useUser = () => {
    const { user, loading, error, initialize } = useUserStore();

    useEffect(() => {
        initialize();
        return () => useUserStore.getState().unsubscribe?.();
    }, []);

    return { user, loading, error };
};
