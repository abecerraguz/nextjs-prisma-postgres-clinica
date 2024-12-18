"use client"
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import Link from "next/link"

const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es obligatorio'),
    apellido: Yup.string().required('El apellido es obligatorio'),
    sexo: Yup.string().required('Debes seleccionar una opción'),
    fechaNacimiento: Yup.date().required('La fecha de nacimiento es obligatoria'),
    especialidad: Yup.string().required('La especialidad es obligatoria'),
    // email: Yup.string().email('El correo electrónico no es válido').required('El correo electrónico es obligatorio'),
});


class Especialista {

    constructor(nombre, apellido, sexo, fechaNacimiento, especialidad) {

        this.pk_idEspecialista = this.generarID();
        this.nombre = nombre;
        this.apellido = apellido;
        this.sexo = sexo;
        this.fechaNacimiento = fechaNacimiento;
        this.especialidad = especialidad;

    }

    generarID() {
        // Generar un número aleatorio entre 1 y 9999
        const numeroAleatorio = Math.floor(Math.random() * 9999) + 1;
        // Completar con ceros a la izquierda para tener 4 dígitos
        const idConCeros = numeroAleatorio.toString().padStart(4, '0');
        // Unir el prefijo 'P-' con el ID de 4 dígitos
        return `ME-${idConCeros}`;
    }

}

function ModalNewEspecialist({ onClose, isModalOpen, onUpdate }) {

    const handleSubmit = (values) => {

        try {
            const { nombre, apellido, sexo, fechaNacimiento, especialidad } = values
            const nuevoEspecialista = new Especialista( nombre, apellido, sexo, fechaNacimiento, especialidad)
    
            const datosParaEnviar = {
                pk_idEspecialista: nuevoEspecialista.pk_idEspecialista,
                nombre: nuevoEspecialista.nombre,
                apellido: nuevoEspecialista.apellido,
                sexo: nuevoEspecialista.sexo,
                fechaNacimiento: new Date(nuevoEspecialista.fechaNacimiento),
                especialidad: nuevoEspecialista.especialidad,
            }
            handleUpdate(datosParaEnviar)
   
        } catch (error) {
            console.log(error)
        }
        resetForm();
    }


    const handleUpdate = ( especialista ) => {
        const dataEspecialista = {
           especialista,
        };
        onUpdate(dataEspecialista);
    };

    return (
        <dialog id="my_modal_1" className="modal" open={isModalOpen}>
            <div className="modal-box">
                <h3 className="font-bold text-lg border-b border-white-500 uppercase tracking-wider mb-5">Ingrese especialista</h3>

                <Formik
                    initialValues={{ nombre: '', apellido: '', sexo: '', fechaNacimiento: '', especialidad: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >

                    <Form className="w-full" method="dialog" >
                        <Link className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose} href="/protected/especialistas">✕</Link>

                        <Field type="text" placeholder="Nombre" className="input input-bordered input-info w-full my-2" id="nombre" name="nombre" />
                        <ErrorMessage name="nombre" component="div" className="text-cyan-400 text-sm tracking-wider error"/>

                        <Field type="text" placeholder="Apellido" className="input input-bordered input-info w-full my-2" id="apellido" name="apellido" />
                        <ErrorMessage name="apellido" component="div" className="text-cyan-400 text-sm tracking-wider error" />

                        <Field as="select" className="select input-bordered input-info w-full my-2" id="sexo" name="sexo">
                            <option value="" label="Selecciona una opción" />
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </Field>
                        <ErrorMessage name="sexo" component="div" className="text-cyan-400 text-sm tracking-wider error"/>

                        {/* <input type="date" value="2017-01-01" min="2005-01-01" max="2019-01-01"></input> */}
                        <Field type="date" id="fechaNacimiento" name="fechaNacimiento" placeholder="Ingrese Fecha"/>
                        <ErrorMessage name="fechaNacimiento" component="div" className="text-cyan-400 text-sm tracking-wider error"/>

                        <Field type="text" placeholder="Especialidad" className="input input-bordered input-info w-full my-2" id="especialidad" name="especialidad" />
                        <ErrorMessage name="especialidad" component="div" className="text-cyan-400 text-sm tracking-wider error"/>

                        <button type="submit" className="btn btn-sm btn-success hover:bg-cyan-600 w-full mt-5">Ingresar</button>

                    </Form>
                </Formik>
            </div>
        </dialog>
    )
}

export default ModalNewEspecialist
