import { Navigate, Outlet } from "react-router-dom";
import pb from "../pb";

const Professor = () => {
    return pb.authStore.model.professor ? <Outlet /> : <Navigate to="/" />;
};

export default Professor;
