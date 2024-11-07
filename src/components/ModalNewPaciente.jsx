"use client"

import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import Link from "next/link"
import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';

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


class Paciente {

    constructor( nombre, apellido, sexo, fechaNacimiento, region, ciudad, telefono, estado ) {

        this.pk_idPaciente = this.generarID();
        this.nombre = nombre;
        this.apellido = apellido;
        this.sexo = sexo;
        this.fechaNacimiento = fechaNacimiento;
        this.region = region;
        this.ciudad = ciudad;
        this.telefono = telefono;
        this.estado = estado;

    }

    generarID() {
        // Generar un número aleatorio entre 1 y 9999
        const numeroAleatorio = Math.floor(Math.random() * 9999) + 1;
        // Completar con ceros a la izquierda para tener 4 dígitos
        const idConCeros = numeroAleatorio.toString().padStart(4, '0');
        // Unir el prefijo 'P-' con el ID de 4 dígitos
        return `P-${idConCeros}`;
    }

}

class Expediente {
    constructor(pk_idPaciente, tipoSangre, tipoAlergia, padecimientoCro, fechaCreacion) {
        this.pk_idPaciente = pk_idPaciente;
        this.tipoSangre = tipoSangre;
        this.tipoAlergia = tipoAlergia;
        this.padecimientoCro = padecimientoCro;
        this.fechaCreacion = fechaCreacion
    }
}

function ModalNewPacient({ onUpdate, isModalOpen, onClose }) {

    const [region, setRegion] = useState([])
  
    useEffect(() => {
        const getRegiones = async () => {
            const response = await fetch('/api/regiones')
            const data = await response.json()
            setRegion(data)
        }
    
        getRegiones()
    }, [])


    const crearExpediente = async( dataExpediente ) => {
        try {
            console.log('dataExpediente--->', dataExpediente)
            await fetch(`/api/expedientes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataExpediente),
            });
        } catch (error) {
            console.log(error)
        }
    }

  
    const handleSubmit = ( values ) => {


       try {
       // const { tipoSangre, tipoAlergia, padecimientoCronico, fechaCreacion } = values
       const { nombre,apellido,sexo,fechaNacimiento,region,ciudad,telefono,estado,tipoSangre,tipoAlergia,padecimientoCro,fechaCreacion } = values
       const nuevoPaciente = new Paciente( nombre, apellido, sexo, fechaNacimiento, region, ciudad, telefono, estado )
       const nuevoExpediente = new Expediente( nuevoPaciente.pk_idPaciente, tipoSangre, tipoAlergia, padecimientoCro,new Date(fechaCreacion) )

        const datosParaEnviar = {
            pk_idPaciente: nuevoPaciente.pk_idPaciente,
            nombre: nuevoPaciente.nombre,
            apellido: nuevoPaciente.apellido,
            sexo: nuevoPaciente.sexo,
            fechaNacimiento: new Date(nuevoPaciente.fechaNacimiento),
            region: nuevoPaciente.region,
            ciudad: nuevoPaciente.ciudad,
            telefono: nuevoPaciente.telefono,
            estado: nuevoPaciente.estado
        }
        handleUpdate(datosParaEnviar)
        crearExpediente(nuevoExpediente)
        } catch (error) {
            console.log(error)
        }

        resetForm();
    }



    const handleUpdate = ( paciente ) => {
        const dataPaciente = {
            paciente,
        };
        onUpdate(dataPaciente);
    };


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
                        ciudad: '', telefono: '', tipoSangre: '', tipoAlergia: '', padecimientoCro: '', fechaCreacion: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >

                    <Form className="w-full" method="dialog">
                        <Link className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose} href="/pacientes">✕</Link>
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
                        <ErrorMessage name="sexo" component="div" className="text-cyan-400 text-sm tracking-wider error"/>

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
