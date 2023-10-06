"use client";
import ModalNewEspecialist from '@/components/ModalNewEspecialist';
import ModalEditEspecialist from '@/components/ModalEditEspecialist';
import { useState, useEffect } from 'react';
import Especialist from '@/components/Especialist';
import ModalAlert from '@/components/ModalAlert';




function PageEspecialistas() {
    
    const [data, setData] = useState([]);

    useEffect(() => {
        getEspecialist()

    }, []);

    const getEspecialist = async () => {
      
        await fetch('/api/especialistas')
    
        .then(response => response.json())
            .then( (data) => {
                setData(data)
                // document.querySelector('.contentSpinnerLoading').style.display = 'none'
            })
        .catch(error => console.log(error))
    }
    return (
        
        <section className='container m-auto md:w-full px-5 py-20'>

            <div className="flex justify-between items-center mb-5 py-3 border-b border-white-500">
                <h1 className='text-xl font-bold tracking-wider uppercase'>Especialistas</h1>
                <button className="btn btn-sm btn-success hover:bg-cyan-600" onClick={() => document.getElementById('my_modal_1').showModal()}>Agregar</button>
            </div>

            <div className="w-full rounded bg-gradient-to-r from-slate-900 to-slate-800 p-3 overflow-x-auto shadow-3xl relative z-0 mb-96">
                <table className="table text-base">
                    {/* head */}
                    <thead className='uppercase font-extrabold text-base'>
                        <tr>
                            <th>ID</th>
                            <th>NOMBRE</th>
                            <th>APELLIDO</th>
                            <th>SEXO</th>
                            <th>FECHA DE NACIMIENTO</th>
                            <th>ESPECIALIDAD</th>
                            <th>ACCION</th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.map(element =>(
                            <Especialist especialist={element} key={element.pk_idEspecialista} />
                        ))}

                    </tbody>
                </table>
            </div>
            <ModalNewEspecialist />
            <ModalEditEspecialist  />
            <ModalAlert />
        </section>
    )
}

export default PageEspecialistas
