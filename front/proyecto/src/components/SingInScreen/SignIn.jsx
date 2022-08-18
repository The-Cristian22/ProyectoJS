import { LOGIN } from '../../utils/apis';
import { useState } from 'react';
import { FaEyeSlash, FaEye, FaPowerOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import axios from "axios"
import "./SignIn.css"

function SignIn(props) {

    const { setOnPage } = props;
    window.onload = setOnPage("/")
    
    const history = useNavigate()
    const [passwordShown, setPasswordShown] = useState(false);
    const [logged, setLogged] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    const { register, formState: { errors }, handleSubmit } = useForm({});
    const onSubmit = (data) => {
        JSON.stringify(data)
        console.log(data)

        axios.post(LOGIN, data)
        .then(function (res){
            console.log(res.data)
            if (res.status === 200){
                localStorage.setItem('token', res.data.data.token);
                localStorage.setItem('logged', true)
                checkRol(res.data.data.user.rol)
            }
        })
        .catch(function (err){
            console.log(err)
            alert("Invalid username or password")
        })
    }

    function checkRol(rol){
        switch (rol) {
            case "user":
                localStorage.setItem("rol", "user")
                history("/formcar")
                break;
            case "admin":
                localStorage.setItem("rol", "admin")
                history("/newuser")
                break;
            case "superAdmin":
                localStorage.setItem("rol", "superAdmin")
                history("/newuser")
                break;
            default:
                break;}}

    return (
        <section class="container-signin">
            <p class="welcome">Bienvenido a </p>
            <h1 class="name">PARK<span className="icon-power"><FaPowerOff/></span>NTROL</h1>
            <h2 class="title-signin">Iniciar Sesión</h2>
            <form class="form-signin" onSubmit={handleSubmit(onSubmit)}>
                <div class="container-inputs-signin">
                    <label class="text">Email</label>
                    <input class="input-signin" type="text" name="email" {...register('username', {
                        required: true,
                        maxLength: 30,
                        pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                    })} />
                {errors.username?.type === 'required' && <p class="error-form">El email es requerido</p>}
                {errors.username?.type === 'maxLength' && <p class="error-form">El email tiene un maximo de 30 caracteres</p>}
                {errors.username?.type === 'pattern' && <p class="error-form">El formato del email es incorrecto</p>}
                </div>
                <div class="container-inputs-signin">
                    <label class="text">Contraseña</label>
                    <input class="input-signin" type={passwordShown ? "text" : "password"} name="password" {...register('password', {
                        required: true,
                        minLength: 6,
                        maxLength: 20
                    })} />
                    <i></i>
                    <i className="icon-inside-input" onClick={togglePasswordVisiblity}>{passwordShown ? <FaEyeSlash /> : <FaEye />}</i>
                {errors.password?.type === 'required' && <p class="error-form">La contraseña es requerida</p>}
                {errors.password?.type === 'minLength' && <p class="error-form">La contraseña tiene un minimo de 6 caracteres</p>}
                {errors.password?.type === 'maxLength' && <p class="error-form">La contraseña tiene un maximo de 20 caracteres</p>}
                </div>
                <div class="container-button">
                    <input class="button-signin" type="submit" value="ingresar" />
                </div>
            </form>
        </section>
    )
}

export default SignIn