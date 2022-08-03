import { useState } from 'react';
import SignInButton from '../SignInButton/SignInButton';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import "./SignInScreen.css";

function SignInScreen() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    function handleChangeEmail(e) {
        const { value } = e.target
        setEmail(value)
    };

    function handleChangePassword(e) {
        const { value } = e.target
        setPassword(value)
    };


    function validateUser(e) {

        e.preventDefault();

        let userData = {
            "username": email,
            "password": password
        };
    };

    return (
        <section className="sign-in-screen">
            <h1 className="sign-in-title">Iniciar sesión</h1>
            <form id="sign-in" name="sign-in-form" className="sign-in-form" onSubmit={validateUser}>
                
                <label className="user-info">
                    Correo electrónico
                    <input type="text" name="email" title="Completa con tu correo electrónico" className="user-info-field user-info-input" value={email} onChange={handleChangeEmail} required />
                </label>
                <label className="user-info">
                    Contraseña
                    <div className="pass-container">
                        <input type={passwordShown ? "text" : "password"} name="password" title="Completa con tu contraseña" className="pass-input" value={password} onChange={handleChangePassword} required />
                        <i className="icon-inside-input" onClick={togglePasswordVisiblity}>{passwordShown ? <FaEyeSlash /> : <FaEye />}</i>
                    </div>
                </label>
                <SignInButton />
            </form>
        </section>
    );
};

export default SignInScreen;