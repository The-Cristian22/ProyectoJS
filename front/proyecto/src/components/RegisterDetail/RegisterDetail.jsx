import { DETAIL_VEHICLE } from "../../utils/apis";
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import "./RegisterDetail.css"

function RegisterDetail(props) {
    const { plate } = useParams()
    const [vehicle, setVehicle] = useState([])
    const [tdata, settdata] = useState([])
    const { setOnPage } = props;
    window.onload = onLoad()

    function onLoad() {
        setOnPage("/newuser")
        checkPermisions()
    }

    const history = useNavigate()
    function checkPermisions() {
        const isLogged = localStorage.getItem('logged')
        if (!isLogged) {
            history("/")
        }
    }

    const date = Date.parse(new Date())
    const { register, watch, handleSubmit } = useForm({
        defaultValues: {
            date: date,
            dateParseMin: "",
            dateParseHour: ""
        }
    });

    useEffect(() => {
        axios.get(`${DETAIL_VEHICLE}/${plate}`)
            .then((result) => {
                setVehicle(result.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const onSubmit = (data) => {
        const dateParse = (Date.parse(new Date()) - Date.parse(new Date(vehicle.date)))
        data.dateParse = dateParse/1000
        data.dateParseMin = data.dateParse/60
        data.dateParseHour = data.dateParseMin/60
        data.precioPor = parseInt(data.precioPor)
        console.log(data.dateParseHour*data.precioPor)
        console.log(data)
        settdata(data)
    }

    function isHour(){
        if(cobro === "hora"){
            console.log(tdata)
            return true
        } else {
            console.log(tdata)
            return false
        }
    }

    const cobro = watch("cobrar")
    return (
        <>
            <div className="detail-container">
                <h2 className="title-detail">Detalles del registro</h2>
                <h4 className="detail"> Placa: <span className="detail-plate">{vehicle.plate}</span></h4>
                <h4 className="detail"> Propietario: <span className="detail-plate">{vehicle.owner}</span></h4>
                <h4 className="detail"> Correo: <span className="detail-plate">{vehicle.mail}</span></h4>
                <h4 className="detail"> Celular: <span className="detail-plate">{vehicle.phone}</span></h4>
                <h4 className="detail"> Fecha y Hora de ingreso: <span className="detail-plate">{vehicle.date}</span></h4>

                <h2 className="title-detail">Detalles de precio:</h2>
                <form class="form-signin" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="detail-payment">Cobrar por:</label>
                        <select className="input-signin" name="cobrar" id="cobrar" {...register('cobrar')}>
                            <option value="hora">Hora</option>
                            <option value="minuto">Minuto</option>
                        </select>
                        <label className="detail-payment">Precio por {cobro}:</label>
                        <input class="input-signin" type="number" {...register('precioPor')} />
                        <label className="detail-payment"> </label>
                        <input class="button-signin button-detail" type="submit" value="Generar" />
                    </div>
                </form>

                <h4 className="detail-payment">Precio total: {isHour()? <span>{(tdata.dateParseHour*tdata.precioPor).toFixed()}</span>: <span>{(tdata.dateParseMin*tdata.precioPor).toFixed()}</span>}</h4>
                <h4 className="detail-payment">Total de {cobro}s: {isHour()? <span>{(tdata.dateParseHour).toFixed(2)}</span>:<span>{(tdata.dateParseMin).toFixed(2)}</span>}</h4>
            </div>
        </>
    )
}

export default RegisterDetail