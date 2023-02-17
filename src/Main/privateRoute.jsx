import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Util from '../Util/Util';

export default function PrivateRoute({ children }) {
    const [user, setUser] = useState({});
    useEffect(() => {
        async function validateData() {
            let util = new Util();
            setUser(await util.validateAccess())
        }
        validateData();
    }, []);
    return !user["error"] ? children : <Navigate to="/login" />;
} 