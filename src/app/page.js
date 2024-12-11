"use client";
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { nanoid } from 'nanoid';
import ModalInfoCitasPaciente  from '@/components/ModalInfoCitasPaciente'


import useSWR from 'swr';
const fetcher = (url) => fetch(url).then((res) => res.json());

function PageHome() {

  const { data: pacientes } = useSWR('/api/pacientes', fetcher);
  const [ pacienteSeleccionado, setPacienteSeleccionado ] = useState(null);
  const [ isModalInfoPaciente, setisModalInfoPaciente ] = useState(false);


  const closeModal = () => {
    setisModalInfoPaciente(false)
  };


  // Consultar paciente pot ID
  const getPacienteID = async (id) => {
    try {
      const response = await fetch(`/api/pacientes/${id}`, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json()
        setPacienteSeleccionado(data)
      } else {
        console.error('Error al obtener registro');
      }

    } catch (error) {
      console.error('Error al obtener el registro:', error);
    }
  }

  const handelGetPacientes = (id) => {
    if( id !== undefined || id !== null ){
      setisModalInfoPaciente(true)
      getPacienteID(id)
    }
  }


  const Paciente = ({ element }) => {

    return (
     
        <tr>
          <td className="align-middle">
            <FontAwesomeIcon
              icon={faAngleRight}
              className="fa-regular"
              style={{ color: 'green', fontSize: 16 }}
            />
          </td>
          <td>{element.nombre}</td>
          <td>{element.apellido}</td>
          <td>{element.sexo}</td>
          <td>{new Date(element.fechaNacimiento).toLocaleDateString()}</td>
          <td className='whitespace-nowrap'>{element.region}</td>
          <td className='whitespace-nowrap'>{element.ciudad}</td>
          <td>{element.telefono}</td>
          <td>
  
              <button
                className="btn btn-sm bg-cyan-600 hover:bg-cyan-800 text-slate-900 hover:text-white sm:w-full text-xs md:text-sm tooltip flex border border-gray-300"
                // onClick={() => getPacienteID(element.pk_idPaciente)}
                onClick={() => handelGetPacientes(element.pk_idPaciente)}
                data-tip="Ver citas"
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  className="fa-regular fa-circle-xmark"
                  style={{ color: 'white', fontSize: 16 }}
                />
              </button>
            
          </td>

        </tr>

    
    )
  }


  if (!pacientes) return (
    <div className="contentSpinnerLoading">
      <div className="spinner"></div>
    </div>
  );

  return (
    <>
      <section className='container m-auto md:w-full px-5 sm:px-5 py-20 min-h-screen'>

        <div className="flex justify-between items-center mb-5 py-3 border-b border-white-500">
          <h1 className='text-xl font-normal uppercase'>Busqueda de pacientes</h1>
        </div>

        <div className="w-full rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 p-3 overflow-x-auto shadow-3xl relative z-0" id='contentTable'>
          <table className="table text-base">
            {/* head */}
            <thead className='uppercase font-extrabold text-sm md:text-base bg-slate-800'>
              <tr>
                <th className='text-white font-extrabold text-center'>#</th>
                <th className='text-white font-extrabold tracking-widest'>NOMBRE</th>
                <th className='text-white font-extrabold tracking-widest'>APELLIDO</th>
                <th className='text-white font-extrabold tracking-widest'>SEXO</th>
                <th className='text-white font-extrabold tracking-widest'>NACIMIENTO</th>
                <th className='text-white font-extrabold tracking-widest'>REGION</th>
                <th className='text-white font-extrabold tracking-widest'>CIUDAD</th>
                <th className='text-white font-extrabold tracking-widest'>CELULAR</th>
                <th className='text-white font-extrabold tracking-widest'>ACCION</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map(element => (
                <Paciente element={element} key={nanoid()} />
              ))}
            </tbody>
          </table>
        </div>



      </section>





      {isModalInfoPaciente && (
        <ModalInfoCitasPaciente
          onClose={closeModal}
          isModalOpen={isModalInfoPaciente}
          infoCitaPaciente={pacienteSeleccionado}
        />
      )}



    </>
  )
}

export default PageHome
