import './App.css';
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from "./privateRoute";
// import Logo from '../Components/Template/Logo';
// import Nav from '../Components/Template/Nav';
// import Footer from '../Components/Template/Footer';

// import Home from '../Components/Home/Home';
import Login from '../Components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle, faLock } from '@fortawesome/free-solid-svg-icons'
import Home from '../Components/Home/Home';
import Skeleton from '../Components/Skeleton/Skeleton';

library.add(faUserCircle, faLock)

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route exact path="/" element={loadPage(<Skeleton ><Home /></Skeleton>)} />
                <Route path="*" element={loadPage(<Skeleton><Home /></Skeleton>)} />
                <Route path="/" element={loadPage(<Skeleton><Home /></Skeleton>)}/>
                <Route path="/login" element={<Login />} />
            </Routes>
        </HashRouter>
    )
    function loadPage(page) {
        return (
            <PrivateRoute>
                <div className='app'>
                    {page}
                </div>
            </PrivateRoute>
        )
    }
}