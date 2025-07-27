import useAuthStore from "@/store/auth.store";
import { ROLES } from "@/utils/role";

export const usePermissions = () => {
    const user = useAuthStore(state => state.user);

    const hasPermission = (role) => {
        return user === role;
    }

    const justAdmin = () => {
        return user === ROLES.ADMIN;
    }

    return {
        role: user,
        hasPermission,
        justAdmin
    };
}