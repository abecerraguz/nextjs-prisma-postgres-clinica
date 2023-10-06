"use client";
import Trash from '@/../public/trash.svg';
import Edit from '@/../public/edit.svg';
import Image from 'next/image';


const handleAlertModal = (e) => {
    const id = e.target.dataset.info
    console.log(id)
    const modal = document.getElementById('my_modal_2')
    const buttonDeleteRegister = document.getElementById('deleteRegistro')
    buttonDeleteRegister.setAttribute('data-info', id)
    modal.showModal()
}

const handleEditModal = async (e) => {
    const id = e.target.dataset.info
    console.log(id)
    const modal = document.getElementById('modalEditEspecialist')
    modal.children[0].firstElementChild.innerHTML=`Editar Especialista`
    modal.showModal()

        const getEspecialist = await fetch(`/api/especialistas/${id}`, { 
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        await getEspecialist.json()
        .then( response => { 

            const { pk_idEspecialista, nombre, apellido, sexo, fechaNacimiento, especialidad } = response
            const formName = document.querySelector('#formModalEditEspecialist #nombre'),
            formApellido = document.querySelector('#formModalEditEspecialist #apellido'),
            formSexo = document.querySelector('#formModalEditEspecialist #sexo'),
            formFechaNacimiento = document.querySelector('#formModalEditEspecialist #fechaNacimiento'),
            formEspecialidad = document.querySelector('#formModalEditEspecialist #especialidad'),
            formButton = document.querySelectorAll('#formModalEditEspecialist button')
        
            const year = new Date(fechaNacimiento).getFullYear()
            const month = new Date(fechaNacimiento).getMonth() + 1
            const day = new Date(fechaNacimiento).getDate()
            const date = `${year}-${month}-${day}`

            console.log('Salida de formButton', formButton)
  
            formName.value = nombre
            formApellido.value = apellido
            formSexo.value = sexo
            formFechaNacimiento.value = new Date(date).toISOString().split('T')[0]
            formEspecialidad.value = especialidad
            formButton[1].setAttribute('id', pk_idEspecialista)

            // console.log(typeof `${year}-${month}-${day}`)
            // nombreForm.value = nombre
            // apellidoForm.value = apellido
            // sexoForm.value = sexo
            // // fechaNacimientoForm.value = fechaNacimiento
            // especialidadForm.value = especialidad


            // form.nombre.value = nombre
            // form.apellido.value = apellido
            // form.sexo.value = sexo
            // form.fechaNacimiento.value = nuevaFecha
            // form.especialidad.value = especialidad
            // form.setAttribute('data-info', pk_idEspecialista)
        })
        .catch( error => console.log(error))

    // const buttonDeleteRegister = document.getElementById('deleteRegistro')
    // buttonDeleteRegister.setAttribute('data-info', id)
    
}

function Especialist({ especialist }) {
    const { pk_idEspecialista, nombre, apellido, sexo, fechaNacimiento, especialidad } = especialist

    const nuevaFecha = new Date(fechaNacimiento).toLocaleDateString()
    return (
      
    
            <tr>
                <th className='whitespace-nowrap'>{pk_idEspecialista}</th>
                <td>{nombre}</td>
                <td>{apellido}</td>
                <td>{sexo}</td>
                <td>{nuevaFecha}</td>
                <td>{especialidad}</td>
                <td>
                    <div className="flex gap-2">
                        <button 
                            className="btn btn-sm btn-success hover:bg-cyan-600 sm:w-1/2" 
                            onClick={ handleEditModal }
                            data-info={pk_idEspecialista}
                        >
                        <Image src={Edit} alt='Editar' width={18} height={18}/>Editar
                        </button>
                        <button className="btn btn-sm btn-error hover:bg-red-900 sm:w-1/2"
                            onClick={ handleAlertModal }
                            data-info={pk_idEspecialista}
                        >
                        <Image src={Trash} alt='Eliminar' width={18} height={18}/>Eliminar
                        </button>
                    </div>
                </td>
            </tr>

            
      
    )
}

export default Especialist
