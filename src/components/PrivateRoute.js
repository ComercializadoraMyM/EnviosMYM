import React, {useEffect} from 'react';
import { isLogin } from '../utils';

const PrivateRoute = ({ component: Component, ...rest }) => {
    useEffect(() => {
        if (!isLogin()){
            window.location='/';
        } 
    }, [])

    return (
        <Component />
    );
};

export default PrivateRoute;