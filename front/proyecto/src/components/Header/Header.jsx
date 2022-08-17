import { useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom"
import { FaPowerOff } from "react-icons/fa";
import "./Header.css"


function Header(props) {
    const { page } = props

    useEffect(()=>{
//        window.location.reload()

    }, [page])


    const history = useNavigate()
    function checkUser(){
        const isUser = localStorage.getItem("rol")
        if(!isUser||isUser === "user"){
            history("/formcar")
        }
    }

    function pageSignIn(){
        if (page === "/") {
            return true 
        }   else {
            return false
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


    if (page === "/") {
        return
    } else {
    return (
        <header className={pageSignIn()? "header-home" : ""}>
            <Link className="navbar-logo" to="/">
            <div className="logo">
                <p>PARK<span className="icon-power"><FaPowerOff /></span>NTROL</p>
            </div>
            </Link>
            <div>
                <Link className="navbar" to="/formcar">agregar vehiculo</Link>
                {checkAdmin()? <Link className="navbar" to="/newuser">agregar usuario</Link>:"" }
                {checkSuperAdmin()? <Link className="navbar" to="/newuser">agregar usuario</Link>:"" }
                <Link className="navbar" to="/carlist">lista vehiculos</Link>
                {checkAdmin()? <Link className="navbar" to="/userlist">lista usuarios</Link> : ""}
                {checkSuperAdmin()? <Link className="navbar" to="/userlist">lista usuarios</Link> : ""}
                
            </div>
        </header>
    )
    }
}

export default Header;