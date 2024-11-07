"use client"
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import Link from "next/link"
import { useState, useEffect } from "react";
import { Cita, AgendarCitas } from '@/app/class/class'
// import { Cita } from '@/app/utilities/functions'

const validationSchema = Yup.object().shape({

    fechaCita: Yup.date().required('La fecha es obligatorio'),
    horaCita: Yup.string().matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Formato de hora inválido').required('La hora es obligatoria'),
    especialistaCita: Yup.string().required('Debes seleccionar una especialidad'),
    consultorioCita: Yup.string().required('El nombre del consultorio es obligatorio'),
    turnoCita: Yup.string().required('El turno es obligatorio'),
    statusCita: Yup.string().required('El estado es obligatorio'),
    observacionesCita: Yup.string().required('La observación es obligatorio'),
    // email: Yup.string().email('El correo electrónico no es válido').required('El correo electrónico es obligatorio'),
});




function ModalNewCita({ onAgregar, isModalOpen, onClose, paciente }) {

console.log( 'PROPS---->', paciente )

    const [especialista, setEspecialista] = useState([])

    function formatDateToPostgres(date) {
        console.log('Salida de date', date)
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');  // Los meses empiezan desde 0
        const day = String(date.getDate()).padStart(2, '0');

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        // Obtiene la zona horaria en minutos y luego la convierte a formato ±HH:MM
        const timezoneOffset = -date.getTimezoneOffset();  // Zona horaria en minutos (negativo si está detrás de UTC)
        const sign = timezoneOffset >= 0 ? '+' : '-';
        const offsetHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0');
        const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');

        // Concatenar todo en el formato deseado
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${sign}${offsetHours}:${offsetMinutes}`;
    }

    const handleSubmit = (values) => {

        const { fechaCita, horaCita, especialistaCita, consultorioCita, turnoCita, statusCita, observacionesCita } = values;
        const nuevaCita = new Cita(fechaCita, horaCita, paciente.pk_idPaciente);

        const datosParaEnviarCita = {
            pk_idCita: nuevaCita.pk_idCita,
            fecha: formatDateToPostgres(new Date(nuevaCita.fecha)),
            hora: nuevaCita.hora,
            fk_idPaciente: nuevaCita.fk_idPaciente,
        }

        const agendarCitas = (infoCita) => {
            const { pk_idCita, fecha, hora, fk_idPaciente } = infoCita
            const addNewAgendarCitas = new AgendarCitas(pk_idCita, especialistaCita, 'Consultorio 1', fecha, turnoCita, statusCita, observacionesCita, hora)
            console.log('Salida addNewAgendarCitas--->', addNewAgendarCitas)
            fetch('/api/agendar', {
                method: 'POST',
                body: JSON.stringify(addNewAgendarCitas),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        // const modal = document.getElementById('modalNewCita')
                        response.json()
                            .then(response => {
                                console.log( 'Salida de response-->', response )
                                onClose()
                                onAgregar()
                            })

                    }
                })
                .catch(error => console.log(error))
        }

        fetch('/api/citas', {
            method: 'POST',
            body: JSON.stringify(datosParaEnviarCita),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                   response.json()
                        .then(response => {
                            console.log('Salida de response-->', response)
                            agendarCitas(response)
                        })
                }
            })
            .catch(error => console.log(error))

    }


    useEffect(() => {
        const getEspecialistas = async () => {
            const response = await fetch('/api/especialistas')
            const data = await response.json()
            setEspecialista(data)
        }
        getEspecialistas()
    }, [])



    return (
        <dialog id="modalNewCita" className="modal" open={isModalOpen}>
            <div className="modal-box">
                <h3 className="font-bold text-lg border-b border-white-500 uppercase tracking-wider mb-5">Nueva cita</h3>

                <Formik
                    initialValues={{ fechaCita: '', horaCita: '', especialistaCita: '', consultorioCita: '', turnoCita: '', statusCita: '', observacionesCita: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >

                    <Form className="w-full" method="dialog" >
                        <Link className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose} href="/pacientes">✕</Link>

                        <Field type="date" placeholder="Ingrese Fecha" className="input input-bordered input-info w-full my-2" id="fechaCita" name="fechaCita" />
                        <ErrorMessage name="fechaCita" component="div" className="text-cyan-400 text-sm tracking-wider error" />

                        <Field step="1800" type="time" ng-model="endTime" pattern="[0-9]*" className="input input-bordered input-info w-full my-2" id="horaCita" name="horaCita" />
                        <ErrorMessage name="horaCita" component="div" className="text-cyan-400 text-sm tracking-wider error" />

                        <Field as="select" className="select input-bordered input-info w-full my-2" id="especialistaCita" name="especialistaCita">
                            <option value="" label="Seleccione una especialista" />
                            {especialista.map(element => (
                                <option value={element.pk_idEspecialista} key={element.pk_idEspecialista}>{element.especialidad}</option>
                            ))}
                        </Field>

                        <ErrorMessage name="especialistaCita" component="div" className="text-cyan-400 text-sm tracking-wider error" />

                        <Field type="text" placeholder="Ingrese Consultorio" className="input input-bordered input-info w-full my-2" id="consultorioCita" name="consultorioCita" />
                        <ErrorMessage name="consultorioCita" component="div" className="text-cyan-400 text-sm tracking-wider error" />

                        <Field type="text" placeholder="Turno" className="input input-bordered input-info w-full my-2" id="turnoCita" name="turnoCita" />
                        <ErrorMessage name="turnoCita" component="div" className="text-cyan-400 text-sm tracking-wider error" />

                        <Field type="text" placeholder="Estado" className="input input-bordered input-info w-full my-2" id="statusCita" name="statusCita" />
                        <ErrorMessage name="statusCita" component="div" className="text-cyan-400 text-sm tracking-wider error" />

                        <Field type="text" placeholder="Observaciones consulta" component="textarea" rows="4" className="textarea textarea-bordered input-info w-full my-2" id="observacionesCita" name="observacionesCita" />
                        <ErrorMessage name="statusCita" component="div" className="text-cyan-400 text-sm tracking-wider error" />



                        <button type="submit" className="btn btn-sm btn-success hover:bg-cyan-600 w-full mt-5">Ingresar</button>

                    </Form>
                </Formik>
            </div>
        </dialog>
    )
}

export default ModalNewCita
