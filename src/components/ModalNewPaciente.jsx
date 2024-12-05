"use client"

import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import Link from "next/link"
import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import { Paciente, Expediente } from '@/app/class/class';
import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es obligatorio'),
    apellido: Yup.string().required('El apellido es obligatorio'),
    sexo: Yup.string().required('Debes seleccionar sexo'),
    fechaNacimiento: Yup.date().required('La fecha de nacimiento es obligatoria'),
    region: Yup.string().required('La región es obligatoria'),
    ciudad: Yup.string().required('La comuna es obligatoria'),
    telefono: Yup.string().required('El teléfono es obligatorio'),
    tipoSangre: Yup.string().required('Debes seleccionar un tipo de sangre'),
    tipoAlergia: Yup.string().required('Debes seleccionar un tipo de alergia'),
    padecimientoCro: Yup.string().required('Debes seleccionar un padecimiento crónico'),
    fechaCreacion: Yup.date().required('La fecha de creación es obligatoria')
});

function ModalNewPacient({ onUpdate, onUpdateExpediente, isModalOpen, onClose }) {

    const [ region, setRegion ] = useState([])

    useEffect(() => {
        const getRegiones = async () => {
            const response = await fetch('/api/regiones')
            const data = await response.json()
            setRegion(data)
        }

        getRegiones()
    }, [])



    const handleUpdate = async(paciente) => {
        const dataPaciente = {
            paciente,
        };
        onUpdate(dataPaciente);
    };

    const handleUpdateExpedientes = async(expediente) => {
        const dataExpediente = {
            expediente,
        };
        onUpdateExpediente(dataExpediente);
    };

  
    
    const handleSubmit = async (values, { resetForm }) => {


        try {
            const { nombre, apellido, sexo, fechaNacimiento, region, ciudad, telefono, estado, tipoSangre, tipoAlergia, padecimientoCro, fechaCreacion } = values
            const nuevoPaciente = new Paciente(nombre, apellido, sexo, fechaNacimiento, region, ciudad, telefono, estado)
            // 1990-05-20 20:00:00-04
            // {1973} 09-03T00:00:00 000 Z AM
            const nuevoExpediente = new Expediente(nuevoPaciente.pk_idPaciente, tipoSangre, tipoAlergia, padecimientoCro, dayjs(fechaCreacion).toISOString())

            const datosParaEnviar = {
                pk_idPaciente: nuevoPaciente.pk_idPaciente,
                nombre: nuevoPaciente.nombre,
                apellido: nuevoPaciente.apellido,
                sexo: nuevoPaciente.sexo,
                // fechaNacimiento: new Date(nuevoPaciente.fechaNacimiento),
                fechaNacimiento: dayjs(nuevoPaciente.fechaNacimiento).toISOString(),
                region: nuevoPaciente.region,
                ciudad: nuevoPaciente.ciudad,
                telefono: nuevoPaciente.telefono,
                estado: nuevoPaciente.estado
            }

            if (datosParaEnviar.pk_idPaciente != null) {

                console.log('Es distinto a nulo-->', datosParaEnviar.pk_idPaciente)
                console.log('Datos para enviar paciente-->', datosParaEnviar)
                console.log('Datos para enviar expediente-->', nuevoExpediente)

                handleUpdate(datosParaEnviar)
                handleUpdateExpedientes(nuevoExpediente)
                resetForm();
            }
            // await crearExpediente(nuevoExpediente)

        } catch (error) {
            console.log(error)
        }


    }

    return (
        <dialog id="modalEditPaciente" className="modal" open={isModalOpen}>
            <div className="modal-box">
                <h3 className="font-bold text-lg border-b border-white-500 uppercase tracking-wider mb-5">Ingrese paciente</h3>

                <Formik
                    initialValues={{
                        nombre: '',
                        apellido: '',
                        fechaNacimiento: '',
                        sexo: '',
                        region: '',
                        ciudad: '', telefono: '', tipoSangre: '', tipoAlergia: '', padecimientoCro: '', fechaCreacion: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >

                    <Form className="w-full" method="dialog">
                        <Link className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose} href="/protected/pacientes">✕</Link>
                        <Field type="text" placeholder="Nombre" className="input input-bordered input-info w-full my-2" id="nombre" name="nombre" />
                        <ErrorMessage name="nombre" component="div" className="text-cyan-400 text-sm tracking-wider error" />

                        <Field type="text" placeholder="Apellido" className="input input-bordered input-info w-full my-2" id="apellido" name="apellido" />
                        <ErrorMessage name="apellido" component="div" className="text-cyan-400 text-sm tracking-wider error" />

                        <Field type="date" id="fechaNacimiento" name="fechaNacimiento" placeholder="Ingrese Fecha" />
                        <ErrorMessage name="fechaNacimiento" component="div" className="text-cyan-400 text-sm tracking-wider error" />

                        <Field as="select" className="select input-bordered input-info w-full my-2" id="sexo" name="sexo">
                            <option value="" label="Selecciona sexo" />
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </Field>
                        <ErrorMessage name="sexo" component="div" className="text-cyan-400 text-sm tracking-wider error" />

                        <Field as="select" className="select input-bordered input-info w-full my-2" id="region" name="region">
                            <option value="" label="Selecciona una región" />
                            {region.map(element => (
                                <option value={element.region} key={nanoid()}>{element.region}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="region" component="div" className="text-cyan-400 text-sm tracking-wider error" />



                        <Field as="select" className="select input-bordered input-info w-full my-2" id="ciudad" name="ciudad">
                            <option value="" label="Selecciona una Comuna" />
                            {region.map(element => (
                                element.comunas.map(comuna => (
                                    <option value={comuna} key={nanoid()}>{comuna}</option>
                                ))
                            ))}
                        </Field>
                        <ErrorMessage name="ciudad" component="div" className="text-cyan-400 text-sm tracking-wider error" />

                        <Field type="text" placeholder="Ingrese celular" className="input input-bordered input-info w-full my-2" id="telefono" name="telefono" />
                        <ErrorMessage name="telefono" component="div" className="text-cyan-400 text-sm tracking-wider error" />



                        <Field as="select" className="select input-bordered input-info w-full my-2" id="tipoSangre" name="tipoSangre">
                            <option value="" label="Seleccione tipo de sangre" />
                            <option value="Tipo A">Tipo A</option>
                            <option value="Tipo B">Tipo B</option>
                            <option value="Tipo AB">Tipo AB</option>
                            <option value="Tipo O">Tipo O</option>
                        </Field>
                        <ErrorMessage name="tipoSangre" component="div" className="text-cyan-400 text-sm tracking-wider error" />

                        <Field type="text" placeholder="Tipo de alergia" className="input input-bordered input-info w-full my-2" id="tipoAlergia" name="tipoAlergia" />
                        <ErrorMessage name="tipoAlergia" component="div" className="text-cyan-400 text-sm tracking-wider error" />

                        <Field type="text" placeholder="Padecimiento crónico" className="input input-bordered input-info w-full my-2" id="padecimientoCro" name="padecimientoCro" />
                        <ErrorMessage name="padecimientoCro" component="div" className="text-cyan-400 text-sm tracking-wider error" />

                        <Field type="date" id="fechaCreacion" name="fechaCreacion" placeholder="Ingrese Fecha de creacion" />
                        <ErrorMessage name="fechaCreacion" component="div" className="text-cyan-400 text-sm tracking-wider error" />

                        <button type="submit" className="btn btn-sm btn-success hover:bg-cyan-600 w-full mt-5 font-normal">Ingresar</button>

                    </Form>
                </Formik>
            </div>
        </dialog>
    )
}

export default ModalNewPacient
