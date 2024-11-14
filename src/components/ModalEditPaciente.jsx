"use client"
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';


function ModalNewPacient({ onClose, isModalOpen, paciente, onSave }) {

 
    const [{ tipoSangre, tipoAlergia, padecimientoCro, fechaCreacion }] = paciente['expedientes'] !== null && paciente['expedientes'] !== undefined ? paciente['expedientes'] : [{}];
    const [region, setRegion] = useState([])
    const [id, setId] = useState(paciente.pk_idPaciente);
    const [nombre, setNombre] = useState(paciente.nombre);
    const [apellido, setApellido] = useState(paciente.apellido);
    const [sexo, setSexo] = useState(paciente.sexo);
    const [fechaNacimiento, setFechaNacimiento] = useState(formatFecha(paciente.fechaNacimiento));
    const [regionEstado, setRegionEstado] = useState(paciente.region);
    const [ciudad, setCiudad] = useState(paciente.ciudad);
    const [telefono, setTelefono] = useState(paciente.telefono.trim());
    const [estado, setEstado] = useState(paciente.estado);
    const [sangre, setSangre] = useState(tipoSangre);
    const [alergia, setAlergia] = useState(tipoAlergia);
    const [padecimiento, setPadecimiento] = useState(padecimientoCro);
    const [fecha, setfecha] = useState(formatFecha(fechaCreacion));


    useEffect(() => {
        const getRegiones = async () => {
            const response = await fetch('/api/regiones')
            const data = await response.json()
            setRegion(data)
        }
        getRegiones()
    }, [])

    function formatFecha(fecha) {
        const date = new Date(fecha);
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const año = date.getFullYear();
        return `${año}-${mes}-${dia}`;
    }


    const handleSave = (e) => {
        e.preventDefault();
        const pacienteEditado = {
            pk_idPaciente: id,
            nombre,
            apellido,
            sexo,
            fechaNacimiento: new Date(fechaNacimiento),
            region: regionEstado,
            ciudad,
            telefono,
            estado
        };
        onSave(pacienteEditado);
    };


    return (
        <dialog id="modalEditPaciente" className="modal" open={isModalOpen}>
            <div className="modal-box">
                <h3 className="font-bold text-lg border-b border-white-500 uppercase tracking-wider mb-5">Editar pacienteeeeee</h3>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                <form className="w-full" method="dialog" onSubmit={handleSave}>
                    
                    <input type="text" placeholder="Nombre" className="input input-bordered input-info w-full my-2" id="nombre" name="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />


                    <input type="text" placeholder="Apellido" className="input input-bordered input-info w-full my-2" id="apellido" name="apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />


                    <input type="date" id="fechaNacimiento" name="fechaNacimiento" placeholder="Ingrese Fecha"
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                    />


                    <select as="select" className="select input-bordered input-info w-full my-2" id="sexo" name="sexo"
                        value={sexo}
                        onChange={(e) => setSexo(e.target.value)}
                    >
                        <option value="" label="Selecciona sexo" />
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </select>

                    <select as="select" className="select input-bordered input-info w-full my-2" id="region" name="region"
                        value={regionEstado}
                        onChange={(e) => setRegionEstado(e.target.value)}
                    >
                        <option value="" label="Selecciona una región" />
                        {region.map(element => (
                            <option value={element.region} key={nanoid()}>{element.region}</option>
                        ))}
                    </select>


                    <select as="select" className="select input-bordered input-info w-full my-2" id="ciudad" name="ciudad"
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                    >
                        <option value="" label="Selecciona una Comuna" />
                        {region.map(element => (
                            element.comunas.map(comuna => (
                                <option value={comuna} key={nanoid()}>{comuna}</option>
                            ))
                        ))}
                    </select>


                    <input type="text" placeholder="Ingrese celular" className="input input-bordered input-info w-full my-2" id="telefono" name="telefono"
                        value={telefono.trim()}
                        onChange={(e) => setTelefono(e.target.value.trim())}
                    />

                    <select as="select" className="select input-bordered input-info w-full my-2" id="tipoSangre" name="tipoSangre"
                        value={sangre}
                        onChange={(e) => setSangre(e.target.value)}
                    >
                        <option value="" label="Seleccione tipo de sangre" />
                        <option value="Tipo A">Tipo A</option>
                        <option value="Tipo B">Tipo B</option>
                        <option value="Tipo AB">Tipo AB</option>
                        <option value="Tipo O">Tipo O</option>
                    </select>


                    <input type="text" placeholder="Tipo de alergia" className="input input-bordered input-info w-full my-2" id="tipoAlergia" name="tipoAlergia"
                        value={alergia}
                        onChange={(e) => setAlergia(e.target.value)}
                    />

                    <input type="text" placeholder="Padecimiento crónico" className="input input-bordered input-info w-full my-2" id="padecimientoCronico" name="padecimientoCronico"
                        value={padecimiento}
                        onChange={(e) => setPadecimiento(e.target.value)}
                    />

                    <input type="date" id="fechaCreacion" name="fechaCreacion" placeholder="Ingrese Fecha de creacion"
                        value={fecha}
                        onChange={(e) => setfecha(e.target.value)}
                    />


                    <button type="submit" className="btn btn-sm btn-success hover:bg-cyan-600 w-full mt-5 font-normal">Ingresar</button>

                </form> 
            </div>
        </dialog>
    )
}

export default ModalNewPacient
