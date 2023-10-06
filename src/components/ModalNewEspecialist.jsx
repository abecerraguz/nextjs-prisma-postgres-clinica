"use client"
import { useRouter } from "next/navigation";
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

function ModalNewEspecialist() {
    const router = useRouter()

    const handleSubmit = (values) => {

        console.log('x--------->',values)
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
        console.log(datosParaEnviar)
        fetch('/api/especialistas', {
            method: 'POST',
            body: JSON.stringify(datosParaEnviar),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
                if (response.ok) {
                    const modal = document.getElementById('my_modal_1')
                    modal.close()
                    window.location.reload()
                }
        })
        .catch(error => console.log(error))
        resetForm();
    }


    const handleCloseModal = (e) => {
        e.preventDefault()
        const modal = document.getElementById('my_modal_1')
        modal.close()
    }

    return (
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg border-b border-white-500 uppercase tracking-wider mb-5">Ingrese especialista</h3>

                <Formik
                    initialValues={{ nombre: '', apellido: '', sexo: '', fechaNacimiento: '', especialidad: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >

                    <Form className="w-full" method="dialog" >
                        <Link className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleCloseModal} href="/especialistas">✕</Link>

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

                        <Field type="date" placeholder="Fecha de Nacimiento" id="fechaNacimiento" name="fechaNacimiento" />
                        <ErrorMessage name="fechaNacimiento" component="div" className="text-cyan-400 text-sm tracking-wider error"/>

                        <Field type="text" placeholder="Especialidad" className="input input-bordered input-info w-full my-2" id="especialidad" name="especialidad" />
                        <ErrorMessage name="especialidad" component="div" className="text-cyan-400 text-sm tracking-wider error"/>

                        <input type="date" placeholder="ingrese fecha" className="form-control"/>

                        <button type="submit" className="btn btn-sm btn-success hover:bg-cyan-600 w-full mt-5">Ingresar</button>

                    </Form>
                </Formik>
            </div>
        </dialog>
    )
}

export default ModalNewEspecialist
