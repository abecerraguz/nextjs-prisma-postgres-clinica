"use client"

import { useState, useEffect } from 'react';

export default function ModalEditEspecialist({ especialista, onClose, onSave, isModalOpen }) {

  console.log('QUE LLEGA EN EL PROPS-->', especialista)  

  // Estado local para manejar los valores del formulario
  const [ nombre, setNombre ] = useState(especialista.nombre);
  const [ apellido, setApellido ] = useState(especialista.apellido);
  const [ sexo, setSexo ] = useState(especialista.sexo);
  const [ fechaNacimiento, setFechaNacimiento ] = useState(formatFecha(especialista.fechaNacimiento) );
  const [ especialidad, setEspecialidad ] = useState(especialista.especialidad);



  // Función para manejar el guardado
  const handleSave = () => {
    // Crea un objeto con los cambios y llama a `onSave` del componente padre
    const especialistaEditado = {
        ...especialista,
        nombre,
        apellido,
        sexo,
        fechaNacimiento:new Date(fechaNacimiento),
        especialidad,
    };
    onSave(especialistaEditado);
};

    function formatFecha(fecha) {
        const date = new Date(fecha);
        // Obtiene día, mes y año
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0'); // Sumar 1 porque los meses comienzan desde 0
        const año = date.getFullYear();
        // Devuelve la fecha en el formato deseado
        return `${año}-${mes}-${dia}`;
    }

  

  console.log('QUE LLEGA EN EL ESTADO-->', nombre)
  console.log('QUE LLEGA EN EL ESTADO-->', apellido)
  console.log('QUE LLEGA EN EL ESTADO-->', sexo)
  console.log('QUE LLEGA EN EL ESTADO-->', fechaNacimiento)
  console.log('QUE LLEGA EN EL ESTADO-->', especialidad)

  return (

    <dialog id="modalEditEspecialist" className="modal my-20" open={isModalOpen}>
            <div className="modal-box">
                <h3 className="font-bold text-lg border-b border-white-500 uppercase tracking-wider mb-5">Editar especialista</h3>
                <form className="w-full" method="dialog" id="formModalEditEspecialist" onSubmit={handleSave}>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                    <input type="text" placeholder="Nombre" className="input input-bordered input-info w-full mb-4" id="nombre" 
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <input type="text" placeholder="Apellido" className="input input-bordered input-info w-full mb-4" id="apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                    <select className="select input-bordered input-info w-full mb-4" id="sexo" 
                        value={sexo} 
                        onChange={(e) => setSexo(e.target.value)}
                    >
                        <option disabled defaultValue>Seleccione Sexo</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </select>
                    <input type="date" placeholder="Fecha de Nacimiento" id="fechaNacimiento" 
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                    />

                    <input type="text" placeholder="Especialidad" className="input input-bordered input-info w-full mb-5" id="especialidad" 
                        value={especialidad}
                        onChange={(e) => setEspecialidad(e.target.value)}
                    />

                    <div className="grid grid-cols-2 gap-3">
                        <button className="btn btn-sm btn-success hover:bg-cyan-600 buttonEnviarEdit w-full font-normal">Actualizar</button>
                        <button className="btn btn-sm btn-error hover:bg-red-900" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </dialog>

  );
}
