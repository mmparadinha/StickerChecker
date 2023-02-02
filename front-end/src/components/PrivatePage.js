import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";

function PrivatePage() {
    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext);
    const token = userInfo?.token;

    useEffect(() => {
        if (token === undefined) {
            alert("Opa, algo deu errado! Tente novamente");
            localStorage.clear("sticker-checker");
            navigate("/");
        }
    }, []);

    return (
        <>
            {token && <Outlet/>}
        </>
    );
};

export default PrivatePage;