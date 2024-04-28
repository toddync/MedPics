import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../stores/userStore";

const Logged = () => {
    const user = useUserStore((s) => s.user);
    return user ? <Outlet /> : <Navigate to="/Login" />;
};

export default Logged;
