import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PrivatePage() {
    const navigate = useNavigate();
    const token = localStorage.getItem('sticker-checker');

    useEffect(() => {
        if (token === null) {
            alert('Ooops, something went wrong! Please, try again.');
            localStorage.clear('sticker-checker');
            navigate('/');
        }
    }, []);

    return (
        <>
            {token !== null ? <Outlet/> : navigate('/')}
        </>
    );
};

export default PrivatePage;