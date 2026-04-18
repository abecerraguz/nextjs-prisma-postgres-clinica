'use client'
import { useState } from 'react'
import useSWR from 'swr'
import ModalNewPaciente from '@/components/ModalNewPaciente'
import ModalEditPaciente from '@/components/ModalEditPaciente'
import ModalDiagnosticos from '@/components/ModalDiagnosticos'
import ModalNewCita from '@/components/ModalNewCita'

const fetcher = url => fetch(url).then(r => r.json()).then(d => d.items ?? d)

export default function PacientesPage() {
  const { data: pacientes, mutate, isLoading } = useSWR('/api/pacientes', fetcher)
  const [search, setSearch] = useState('')
  const [modalNew, setModalNew] = useState(false)
  const [modalEdit, setModalEdit] = useState(null)
  const [modalDiag, setModalDiag] = useState(null)
  const [modalCita, setModalCita] = useState(null)

  const filtered = (pacientes ?? []).filter(p => {
    const q = search.toLowerCase()
    return (
      p.nombre?.toLowerCase().includes(q) ||
      p.apellido?.toLowerCase().includes(q) ||
      p.telefono?.toLowerCase().includes(q)
    )
  })

  const handleDelete = async (id) => {
    if (!confirm('Eliminar paciente?')) return
    await fetch('/api/pacientes/' + id, { method: 'DELETE' })
    mutate()
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase tracking-wide">Pacientes</h1>
        <button className="btn btn-sm btn-primary" onClick={() => setModalNew(true)}>+ Nuevo paciente</button>
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre, apellido o telefono..."
        className="input input-bordered input-sm w-full max-w-sm bg-base-100 my-3"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {isLoading && <div className="flex justify-center"><span className="loading loading-spinner loading-lg"></span></div>}

      {!isLoading && filtered.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-8">No se encontraron pacientes.</p>
      )}

      <div className="overflow-x-auto rounded-xl">
        <table className="table table-sm w-full">
          <thead>
            <tr className="bg-base-300 text-xs uppercase tracking-wider">
              <th>Nombre</th>
              <th>Sexo</th>
              <th>Telefono</th>
              <th>Ciudad</th>
              <th>Tipo Sangre</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-base-200 transition-colors">
                <td>{p.nombre} {p.apellido}</td>
                <td>{p.sexo}</td>
                <td>{p.telefono}</td>
                <td>{p.ciudad}</td>
                <td>{p.tipoSangre}</td>
                <td>
                  <span className={'badge badge-sm ' + (p.activo ? 'badge-success' : 'badge-error')}>
                    {p.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <div className="flex gap-1 flex-wrap">
                    <button className="btn btn-xs btn-outline btn-info" onClick={() => setModalDiag(p)}>Diagnosticos</button>
                    <button className="btn btn-xs btn-outline btn-success" onClick={() => setModalCita(p)}>Cita</button>
                    <button className="btn btn-xs btn-outline btn-warning" onClick={() => setModalEdit(p)}>Editar</button>
                    <button className="btn btn-xs btn-outline btn-error" onClick={() => handleDelete(p.id)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalNewPaciente isModalOpen={modalNew} onClose={() => setModalNew(false)} onCreated={mutate} />
      {modalEdit && <ModalEditPaciente isModalOpen={!!modalEdit} paciente={modalEdit} onClose={() => setModalEdit(null)} onUpdated={mutate} />}
      {modalDiag && <ModalDiagnosticos isModalOpen={!!modalDiag} paciente={modalDiag} onClose={() => setModalDiag(null)} />}
      {modalCita && <ModalNewCita isModalOpen={!!modalCita} pacienteIdFijo={modalCita.id} onClose={() => setModalCita(null)} onCreated={mutate} />}
    </div>
  )
}
