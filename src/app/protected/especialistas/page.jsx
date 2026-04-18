'use client'
import { useState } from 'react'
import useSWR from 'swr'
import ModalNewEspecialist from '@/components/ModalNewEspecialist'
import ModalEditEspecialist from '@/components/ModalEditEspecialist'

const fetcher = url => fetch(url).then(r => r.json())

export default function EspecialistasPage() {
  const { data: especialistas, mutate, isLoading } = useSWR('/api/especialistas', fetcher)
  const [search, setSearch] = useState('')
  const [modalNew, setModalNew] = useState(false)
  const [modalEdit, setModalEdit] = useState(null)

  const filtered = (especialistas ?? []).filter(e => {
    const q = search.toLowerCase()
    return (
      e.nombre?.toLowerCase().includes(q) ||
      e.apellido?.toLowerCase().includes(q) ||
      e.especialidad?.toLowerCase().includes(q)
    )
  })

  const handleDelete = async (id) => {
    if (!confirm('Eliminar especialista?')) return
    await fetch('/api/especialistas/' + id, { method: 'DELETE' })
    mutate()
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase tracking-wide">Especialistas</h1>
        <button className="btn btn-sm btn-primary" onClick={() => setModalNew(true)}>+ Nuevo especialista</button>
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre, apellido o especialidad..."
        className="input input-bordered input-sm w-full max-w-sm bg-base-100 my-3"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {isLoading && <div className="flex justify-center"><span className="loading loading-spinner loading-lg"></span></div>}

      <div className="overflow-x-auto rounded-xl">
        <table className="table table-sm w-full">
          <thead>
            <tr className="bg-base-300 text-xs uppercase tracking-wider">
              <th>Nombre</th>
              <th>Sexo</th>
              <th>Especialidad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {filtered.map(e => (
              <tr key={e.id} className="hover:bg-base-200 transition-colors">
                <td>{e.nombre} {e.apellido}</td>
                <td>{e.sexo}</td>
                <td>{e.especialidad}</td>
                <td>
                  <span className={'badge badge-sm ' + (e.activo ? 'badge-success' : 'badge-error')}>
                    {e.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <div className="flex gap-1">
                    <button className="btn btn-xs btn-outline btn-warning" onClick={() => setModalEdit(e)}>Editar</button>
                    <button className="btn btn-xs btn-outline btn-error" onClick={() => handleDelete(e.id)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalNewEspecialist isModalOpen={modalNew} onClose={() => setModalNew(false)} onCreated={mutate} />
      {modalEdit && <ModalEditEspecialist isModalOpen={!!modalEdit} especialista={modalEdit} onClose={() => setModalEdit(null)} onUpdated={mutate} />}
    </div>
  )
}
