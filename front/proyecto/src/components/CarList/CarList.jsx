import { ALL_VEHICLES, DELETE_VEHICLE, FILTER_VEHICLES } from "../../utils/apis"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker"
import axios from "axios"
import "react-datepicker/dist/react-datepicker.css";
import "./CarList.css"


function CarList(props) {

    const { setOnPage } = props;
    window.onload = setOnPage("/carlist")

    const [vehicles, setVehicles] = useState([])
    const [startDate, setStartDate] = useState(null);

    function checkUser() {
        const isUser = localStorage.getItem("rol")
        if (isUser === "user") {
            return true
        } else {
            return false
        }
    }


    useEffect(() => {
        axios.get(ALL_VEHICLES)
            .then((result) => {
                setVehicles(result.data.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    function deleteCar(vehicle) {
        if (window.confirm("Esta accion es permanente, esta seguro de querer borrar este registro?")) {

            axios.delete(DELETE_VEHICLE + "/" + vehicle.plate)
                .then(function (res) {
                    if (res.status === 200) {
                        alert("Registro borrado con exito")
                        window.location.reload(true)
                    } else {
                        alert("no se ha podido borrar el registro")
                    }
                })
                .catch(function (err) {
                    console.log(err);
                    alert("no se ha podido borrar el vehiculo")
                })
        }
    }
    
    function filterVehicles(plate, owner, phone, date) {
        axios.get(`${FILTER_VEHICLES}?plate=${plate}&owner=${owner}&phone=${phone}&date=${date}`)
            .then((result) => {
                setVehicles(result.data.data);
            })
            .catch((error) => {
                console.log(error)
                setVehicles([{"plate": "-------", "owner":"-------", "phone": "----------", "date": "No hay registros que coincidan"}])
            })
    }

    function arrDate(date) {
        date = date.replace(" GMT-0500 (hora estándar de Colombia)", "")
        return date
    }

    const { register, handleSubmit } = useForm({
        defaultValues: {
            plate: "",
            owner: "",
            phone: "",
            date: ""
        }
    });

    const formateDate = (date) => {
        date = new Date(date).toString()
        date = date.split(" ")
        const formateDate = date[0].concat(" ", date[1], " ", date[2], " ", date[3])
        return formateDate
    }

    const onSubmit = (data) => {
        data.date = formateDate(startDate)
        if(data.date === "Wed Dec 31 1969" || data.date === "Invalid Date undefined undefined"){ data.date=""}
        filterVehicles(data.plate, data.owner, data.phone, data.date)
        console.log(data)
    }

    return (
        <section class="container-signin">
            <h2 class="title-signin title-registro">Registro</h2>

            <div class="search-bar">
                <section onSubmit={handleSubmit(onSubmit)}>
                    <form>

                        <label class="text">
                            placa
                        </label>
                        <input class="input-signin" type="text" name="plate" {...register('plate')} />
                        <label class="text">
                            Propietario
                        </label>
                        <input class="input-signin" type="text" name="owner" {...register('owner')} />
                        <label class="text">
                            celular
                        </label>
                        <input class="input-signin" type="number" name="phone" {...register('phone')} />

                        <DatePicker
                            {...register("date")}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            isClearable
                            placeholderText="fecha"
                            dateFormat="MMM dd"
                        />
                        <div>
                        <button class="button-signin" type="submit">filtrar</button>
                        </div>
                    </form>
                </section>
            </div>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Placa</th>
                            <th>Propietario</th>
                            <th>Celular</th>
                            <th>Fecha y hora de entrada</th>
                        </tr>
                    </thead>

                    <tbody>
                        {vehicles.map((vehicle) => (
                            <tr>
                                <td><Link className="plate" to={`/registerdetail/${vehicle.plate}`}>{vehicle.plate}</Link></td>
                                <td>{vehicle.owner}</td>
                                <td>{vehicle.phone}</td>
                                <td>{arrDate(vehicle.date)}</td>
                                {!checkUser() ? <button class="button-signin x" onClick={() => deleteCar(vehicle)}>X</button> : ""}

                            </tr>
                        ))}
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
        </section>
    )

}

export default CarList