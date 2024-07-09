import { useContext } from "react";
import AuthStorageContext from "../components/contexts/AuthStorageContext";

const useAuthStorage = () => {
    return useContext(AuthStorageContext)
}

export default useAuthStorage