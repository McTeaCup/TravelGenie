import 'bootstrap/dist/css/bootstrap.min.css';



import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import BootNavbar from './components/BootNavbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/1Landing';
import Budget from './pages/3budget';
import Party from './pages/2party';
import Activities from './pages/4activites';
import Food from './pages/5food';
import Events from './pages/6events';
import Result from './pages/7result';
import Signup from './components/signup';
import Login from './components/login';
import { AuthProvider } from './components/Auth';


function App() {
    return (
        <div>
            <Routes>
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />

                <Route path="/" element={<Layout />}>
                    <Route index element={<Landing />} />
                    <Route path="budget" element={<Budget />} />
                    <Route path="party" element={<Party />} />
                    <Route path="activites" element={<Activities />} />
                    <Route path='food' element={<Food />} />
                    <Route path='events' element={<Events />} />
                    <Route path='result' element={<Result />} />
                    {/* Måste göra login logout och sign up pages */}
                </Route>
            </Routes>

        </div >
    );
}

function Layout() {
    return (
        <>
            <BootNavbar />
            {/* <Header /> */}
            <Outlet />
            <Footer />
        </>
    )
}

export default App;
