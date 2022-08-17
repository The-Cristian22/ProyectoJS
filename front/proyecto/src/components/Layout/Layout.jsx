import React from "react";
import SignIn from "../SingInScreen/SignIn";
import FormCar from "../FormCar/FormCar";
import NewUser from "../NewUser/NewUser";
import CarList from "../CarList/CarList"
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useState } from "react";

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Layout() {
    const[onPage, setOnPage] = useState()

    function setPage(page) {
        setOnPage(page)
    };


    return (
        <>
            <BrowserRouter>
            <Header page={onPage}/>
            <main>
                <Routes>
                    <Route exact path="/" element={<SignIn setOnPage={setPage}/>} />
                    <Route exact path="/formcar" element={<FormCar />} />
                    <Route exact path="/newuser" element={<NewUser />} />
                    <Route exact path="/carlist" element={<CarList />} />
                </Routes>
            </main>
            <Footer/>
            </BrowserRouter>
        </>
    )
}

export default Layout;