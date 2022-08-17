import { NEW_USER } from "../../utils/apis"
import { useState } from 'react';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useNavigate} from "react-router-dom"
import axios from "axios"

import "./NewUser.css"

function NewUser() {
    
    window.onload = () => {
        checkUser();
        checkAdmin();
        checkSuperAdmin();
    }

    const history = useNavigate()
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
    const toggleConfirmPasswordVisiblity = () => {
        setConfirmPasswordShown(confirmPasswordShown ? false : true);
    };

    const { register, formState: { errors }, watch, handleSubmit } = useForm({
        defaultValues:{
            rol: "user"
        }
    });
    

    function checkUser(){
        const isUser = localStorage.getItem("rol")
        if(!isUser||isUser === "user"){
            history("/formcar")
        }
    }

    function checkAdmin() {
        const isAdmin = localStorage.getItem("rol")
        if (isAdmin === "admin") {
            return true
        } else {
            return false
        }
    }

    function checkSuperAdmin() {
        const isSuperAdmin = localStorage.getItem("rol")
        if (isSuperAdmin === "superAdmin") {
            return true
        } else {
            return false
        }
    }

    const onSubmit = (data) => {
        console.log(data)
        
        JSON.stringify(data)
        console.log(data)
        
        axios.post(NEW_USER, data)
        .then(function (res){
            if(res.status === 200){
                alert("Usuario creado con exito")
            } 
        })        
        .catch(function (err){
            console.log(err)
            alert("No se pudo crear el usuario")
        })
    }

    return (
        <section class="container-signin">
            <h2 class="title-signin title-newuser">Crear nuevo usuario</h2>
            <form class="form-signin" onSubmit={handleSubmit(onSubmit)}>
                <div class="container-inputs-signin">
                    
                    <label class="text">
                        Nombre:
                    </label>
                    <input class="input-signin" type="text" name="plate" {...register('name', {
                        required: true,
                        minLength: 5,
                        maxLength: 50
                    })} />

                    <label class="text">
                        Contraseña:
                    </label>
                    <input class="input-signin" type={passwordShown ? "text" : "password"} name="plate" {...register('password', {
                        required: true,
                        maxLength: 20,
                        minLength: 6
                    })} />
                    <i className="icon-inside-input" onClick={togglePasswordVisiblity}>{passwordShown ? <FaEyeSlash /> : <FaEye />}</i>
                </div>

                    <div className="container-errors">
                    {errors.name?.type === 'required' && <p class="error-form">El campo nombre es requerido</p>}
                    {errors.name?.type === 'minLength' && <p class="error-form">El campo no puede tener menos de 5 caracteres</p>}
                    {errors.name?.type === 'maxLength' && <p class="error-form">El campo no puede tener mas de 50 caracteres</p>}
                    {errors.password?.type === 'required' && <p class="error-form">El campo Contraseña es requerido</p>}
                    {errors.password?.type === 'maxLength' && <p class="error-form">El campo no puede tener mas de 20 caracteres</p>}
                    {errors.password?.type === 'minLength' && <p class="error-form">El campo no puede tener menos de 6 caracteres</p>}
                    </div>

                <div class="container-inputs-signin">
                    <label class="text">
                        Email:
                    </label>
                    <input class="input-signin" type="text" name="plate" {...register('email', {
                        required: true,
                        maxLength: 100,
                        pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                    })} />
                
                    <label class="text">
                        Repetir contraseña:
                    </label>
                    <input class="input-signin" type={confirmPasswordShown ? "text" : "password"} name="plate" {...register('confirmPassword', {
                        validate: value => value === watch('password'),
                        required: true,
                        maxLength: 20,
                        minLength: 6
                    })} />
                    <i className="icon-inside-input" onClick={toggleConfirmPasswordVisiblity}>{confirmPasswordShown ? <FaEyeSlash /> : <FaEye />}</i>
                </div>

                <div className="container-errors">
                    {errors.email?.type === 'required' && <p class="error-form">El campo Email es requerido</p>}
                    {errors.email?.type === 'maxLength' && <p class="error-form">El campo no puede tener mas de 100 caracteres</p>}
                    {errors.email?.type === 'pattern' && <p class="error-form">El formato del email es incorrecto</p>}
                    {errors.confirmPassword?.type === 'validate' && <p class="error-form">las contraseñas deben coincidir</p>}
                    {errors.confirmPassword?.type === 'required' && <p class="error-form">Debes confirmar la contraseña</p>}
                    {errors.confirmPassword?.type === 'maxLength' && <p class="error-form">El campo no puede tener mas de 20 caracteres</p>}
                    {errors.confirmPassword?.type === 'minLength' && <p class="error-form">El campo no puede tener menos de 6 caracteres</p>}
                </div>


                {checkSuperAdmin()?                 
                <div class="container-inputs-signin">
                    <label class="text">
                        Rol:
                    </label>
                    <select class="input-signin" name="rol" id="rol" {...register('rol', {
                        required: true
                    })}>
                        <option value="user" >User</option>
                        <option value="admin" >Admin</option>
                    </select>
                </div> : ""}

                <div>
                    <input class="button-signin" type="submit" value="Crear" />
                </div>
            </form>
        </section>
    )
}

export default NewUser