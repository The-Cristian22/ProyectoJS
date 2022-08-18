import React, {useState}from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from "../SingInScreen/SignIn";
import FormCar from "../FormCar/FormCar";
import NewUser from "../NewUser/NewUser";
import CarList from "../CarList/CarList"
import UserList from "../UserList/UserList";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";


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
                    <Route exact path="/formcar" element={<FormCar setOnPage={setPage}/>} />
                    <Route exact path="/newuser" element={<NewUser setOnPage={setPage}/>} />
                    <Route exact path="/carlist" element={<CarList setOnPage={setPage}/>} />
                    <Route exact path="/userlist" element={<UserList setOnPage={setPage}/>} />
                    <Route exact path="/registerdetail" element={<UserList setOnPage={setPage}/>} />
                </Routes>
            </main>
            <Footer/>
            </BrowserRouter>
        </>
    )
}

export default Layout;