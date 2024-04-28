import { Navigate, Outlet } from "react-router-dom";
import pb from "../pb";

const Logged = () => {
    return pb.authStore.model ? <Outlet /> : <Navigate to="/Login" />;
};

export default Logged;
