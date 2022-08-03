import React from "react";
import SignInScreen from "../SingInScreen/SignInScreen";

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Layout() {
    return (
        <>
            <BrowserRouter>
            <main>
                <Routes>
                    <Route exact path="/" element={<SignInScreen />} />
                </Routes>
            </main>
            </BrowserRouter>
        </>
    )
}
export default Layout;