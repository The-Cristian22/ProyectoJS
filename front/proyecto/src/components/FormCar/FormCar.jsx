import { NEW_VEHICLE } from "../../utils/apis";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import swal from "sweetalert"
import "./FormCar.css"


function FormCar(props) {

    const { setOnPage } = props;
    window.onload = onLoad()

    function onLoad(){
        setOnPage("/formcar")
        checkPermisions()
    }

    const date = new Date(0).toString()
    const history = useNavigate()

    const { register, formState: { errors }, watch, handleSubmit } = useForm({
        defaultValues: {
            date: date
        }
    });

    function checkPermisions() {
        const isLogged = localStorage.getItem('logged')
        if (!isLogged) {
            history("/")
        }
    }


    const onSubmit = (data) => {
        const date = new Date().toString()
        data.date = arrDate(date)
        JSON.stringify(data)

        axios.post(NEW_VEHICLE, data)
            .then(function (res) {
                if (res.status === 200) {
                    swal({
                        title: "Registro creado con exito",
                        icon: "success",
                        button: "perfecto!!"
                    }).then(()=>{
                        window.location.reload(true)
                    })
                } else {
                    swal({
                        title: "No se pudo crear el registro",
                        text: "Tenemos un pequeño error de nuestro lado, intenta de nuevo mas tarde",
                        icon: "error",
                        button: "Vale..."
                    })
                }
            })
            .catch(function (err) {
                swal({
                    title: "No se pudo crear el registro",
                    text: "Tenemos un pequeño error de nuestro lado, intenta de nuevo mas tarde",
                    icon: "error",
                    button: "Vale..."
                })
            })

    }

    function arrDate(date) {
        date = date.replace(" GMT-0500 (hora estándar de Colombia)", "")
        return date
    }


    const incluirCorreo = watch('incluirCorreo')
    return (
        <section class="container-signin">
            <h2 class="title-signin title-newuser">Nuevo Registro</h2>
            <form class="form-signin" onSubmit={handleSubmit(onSubmit)}>
                <div class="container-inputs-signin">
                    <label class="text">
                        Placa:
                    </label>
                    <input class="input-signin" type="text" name="plate" {...register('plate', {
                        required: true,
                        minLength: 4,
                        maxLength: 10
                    })} />
                    {errors.plate?.type === 'required' && <p class="error-form">El campo placa es requerido</p>}
                    {errors.plate?.type === 'minLength' && <p class="error-form">El campo placa no puede tener menos de 4 caracteres</p>}
                    {errors.plate?.type === 'maxLength' && <p class="error-form">El campo placa no puede tener mas de 10 caracteres</p>}
                </div>
                <div class="container-inputs-signin">
                    <label class="text">
                        Propietario
                    </label>
                    <input class="input-signin" type="text" name="owner" {...register('owner', {
                        required: true,
                        minLength: 4,
                        maxLength: 50,
                    })} />
                    {errors.owner?.type === 'required' && <p class="error-form">El campo propietario es requerido</p>}
                    {errors.owner?.type === 'minLength' && <p class="error-form">El campo propietario no puede tener menos de 4 caracteres</p>}
                    {errors.owner?.type === 'maxLength' && <p class="error-form">El campo propietario no puede tener mas de 50 caracteres</p>}
                </div>
                <div class="container-inputs-signin">
                    <label class="text">
                        Cedula:
                    </label>
                    <input class="input-signin" type="text" name="identification" {...register('identification', {
                        required: true,
                        minLength: 5,
                        maxLength: 20,
                    })} />
                    {errors.identification?.type === 'required' && <p class="error-form">El campo cedula es requerido</p>}
                    {errors.identification?.type === 'minLength' && <p class="error-form">El campo cedula no puede tener menos de 5 caracteres</p>}
                    {errors.identification?.type === 'maxLength' && <p class="error-form">El campo cedula no puede tener mas de 20 caracteres</p>}
                </div>
                <div class="container-inputs-signin">
                    <label class="text">
                        Celular:
                    </label>
                    <input class="input-signin" name="celular" {...register('phone', {
                        required: true,
                        minLength: 7,
                        maxLength: 15,
                        type: Number
                    })} />
                    {errors.phone?.type === 'required' && <p class="error-form">El campo celular es requerido</p>}
                    {errors.phone?.type === 'minLength' && <p class="error-form">El campo celular no puede tener menos de 7 caracteres</p>}
                    {errors.phone?.type === 'maxLength' && <p class="error-form">El campo celular no puede tener mas de 15 caracteres</p>}
                    {errors.phone?.type === 'type' && <p class="error-form">El campo celular tiene que ser un numero</p>}
                </div>
                <div class="container-inputs-signin">
                    <label class="text">¿Incluir correo?</label>
                    <input class="checkbox" type="checkbox" {...register('incluirCorreo')} />
                </div>
                {incluirCorreo && (
                    <div class="container-inputs-signin">
                        <label class="text">
                            Correo:
                        </label>
                        <input class="input-signin" type="text" name="correo" {...register('mail', {
                            maxLenght: 100,
                            pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                        })} />
                        {errors.mail?.type === 'maxLength' && <p class="error-form">El campo correo no puede tener mas de 100 caracteres</p>}
                        {errors.mail?.type === 'pattern' && <p class="error-form">El formato del correo es incorrecto</p>}
                    </div>
                )}
                <div>
                    <input class="button-signin" type="submit" value="Submit" />
                </div>
            </form>
        </section>
    );
}

export default FormCar