import React, { useState } from "react"
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import "./SearchBar.css"

function SearchBar(props) {

    const filterVehicles = props

    const [startDate, setStartDate] = useState(new Date());

    const { register, handleSubmit } = useForm({defaultValues:{
        plate: "",
        owner: "",
        phone: "",
        date: ""
    }});

    const formateDate = (date) =>{
        date = new Date(date).toString()
        date = date.split(" ")
        const formateDate = date[0].concat(" ", date[1]," ", date[2]," ", date[3])
        return formateDate
    }

    const onSubmit = (data) => {
        data.date = formateDate(startDate)
        filterVehicles(data.plate, data.owner, data.phone, data.date)
        console.log(data)
    }

    return (
        <section onSubmit={handleSubmit(onSubmit)}>
            <form>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    isClearable
                    dateFormat="MMM dd"
                    placeholderText="Filtrar por fecha"
                    {...register("date")}
                />
                <button type="submit">filtrar</button>
            </form>
        </section>
    )
}

export default SearchBar