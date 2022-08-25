import React, { useEffect, useState } from "react"
import axios from "axios"
import swal from "sweetalert"
import { ALL_USERS, DELETE_USER } from "../../utils/apis";
import { useNavigate } from "react-router-dom";
import "./UserList.css"

function UserList(props){

    const history = useNavigate()
    const { setOnPage } = props;
    window.onload = onLoad()

    function onLoad(){
        setOnPage("/userlist")
        checkPermisions()
    }

    function isAdmin(){
        if(localStorage.getItem("rol") === "admin"){
            return true
        }   else {return false}
    }

    function checkPermisions(){
        const rol = localStorage.getItem("rol")
        if (rol === "user"){
            history("/")
        }
    }

    const [users, setUsers] = useState([])
    useEffect(()=>{
        axios.get(ALL_USERS)
        .then((result) =>{
            setUsers(result.data.data);
        })
        .catch((error) => {
            console.log(error)
        })
    })

    function deleteUser(user) {
        swal({
            title: "esta accion es permanente",
            text: "¿esta seguro de querer borrar este usuario?",
            icon: "warning",
            buttons: true, 
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.delete(DELETE_USER +"/" + user.id)
                    .then(function (res) {
                        if (res.status === 200) {
                            swal({
                                title: "Usuario borrado con exito",
                                icon: "success",
                                button: "perfecto!!"
                            }).then(()=>{
                                window.location.reload(true)
                            })
                        } else {
                            swal({
                                title: "No se pudo borrar el registro",
                                text: "Tenemos un pequeño error de nuestro lado, intenta mas tarde",
                                icon: "error",
                                button: "Vale..."
                            })
                        }
                    })
                    .catch(function (err){
                        swal({
                            title: "No se pudo borrar el registro",
                            text: "Tenemos un pequeño error de nuestro lado, intenta mas tarde",
                            icon: "error",
                            button: "Vale..."
                        })
                    })
            }
        })
    }

    return (
        <section class="container-sigin">
            <h2 class="title-signin title-list">Usuarios</h2>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Rol</th>
                        </tr>
                    </thead>

                    <tbody>
                        { isAdmin()?
                            users.filter(user => user.rol !== "superAdmin")
                            .filter(user=> user.rol !== "admin")
                            .map(user => (
                                <tr>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.rol}</td>
                                    <button class="button-signin x" onClick={() => deleteUser(user)}>X</button>
                                </tr>
                            ))
                        : 
                        users.filter(user => user.rol !== "superAdmin")
                        .map(user => (
                            <tr>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.rol}</td>
                                <button class="button-signin x" onClick={() => deleteUser(user)}>X</button>
                            </tr>
                        ))
                        }
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
        </section>
    )
}

export default UserList