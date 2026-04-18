'use client'
import { useState } from 'react'
import useSWR from 'swr'
import ModalNewCita from '@/components/ModalNewCita'

const fetcher = url => fetch(url).then(r => r.json())

const ESTADO_COLORS = {
  PENDIENTE: 'badge-warning',
  CONFIRMADA: 'badge-info',
  COMPLETADA: 'badge-success',
  CANCELADA: 'badge-error',
}

const ESTADO_LABELS = {
  PENDIENTE: 'Pendiente',
  CONFIRMADA: 'Confirmada',
  COMPLETADA: 'Completada',
  CANCELADA: 'Cancelada',
}

export default function CitasPage() {
  const { data: citas, mutate, isLoading } = useSWR('/api/citas', fetcher)
  const [modalNew, setModalNew] = useState(false)
  const [filtroEstado, setFiltroEstado] = useState('')
  const [filtroFecha, setFiltroFecha] = useState('')
  const [search, setSearch] = useState('')
  const [updatingId, setUpdatingId] = useState(null)

  const filtered = (citas ?? []).filter(c => {
    const matchEstado = filtroEstado ? c.estado === filtroEstado : true
    const matchFecha = filtroFecha
      ? new Date(c.fecha).toLocaleDateString('en-CA', { timeZone: 'America/Santiago' }) === filtroFecha
      : true
    const q = search.toLowerCase()
    const matchSearch = q
      ? c.paciente?.nombre?.toLowerCase().includes(q) ||
        c.paciente?.apellido?.toLowerCase().includes(q) ||
        c.especialista?.nombre?.toLowerCase().includes(q) ||
        c.especialista?.especialidad?.toLowerCase().includes(q)
      : true
    return matchEstado && matchFecha && matchSearch
  })

  const handleCambiarEstado = async (id, nuevoEstado) => {
    setUpdatingId(id)
    await fetch('/api/citas/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: nuevoEstado }),
    })
    await mutate()
    setUpdatingId(null)
  }

  const handleDelete = async (id) => {
    if (!confirm('Eliminar esta cita?')) return
    await fetch('/api/citas/' + id, { method: 'DELETE' })
    mutate()
  }

  const citasPorEstado = (estado) => (citas ?? []).filter(c => c.estado === estado).length

  return (
    <div className="p-6 space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase tracking-wide">Citas</h1>
        <button className="btn btn-sm btn-primary" onClick={() => setModalNew(true)}>+ Nueva cita</button>
      </div>

      {/* Resumen rapido */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(ESTADO_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFiltroEstado(filtroEstado === key ? '' : key)}
            className={'rounded-2xl p-4 text-center transition-all border-2 bg-white shadow-sm hover:shadow-md ' + (filtroEstado === key ? 'border-primary bg-base-200' : 'border-transparent bg-neutral')}
          >
            <p className="text-2xl font-bold">{citasPorEstado(key)}</p>
            <p className="text-xs text-gray-400 uppercase">{label}</p>
          </button>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Buscar paciente o especialista..."
          className="input input-bordered input-sm bg-base-100 w-64"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <input
          type="date"
          className="input input-bordered input-sm"
          value={filtroFecha}
          onChange={e => setFiltroFecha(e.target.value)}
        />
        <select
          className="select select-bordered select-sm bg-base-100"
          value={filtroEstado}
          onChange={e => setFiltroEstado(e.target.value)}
        >
          <option value="">Todos los estados</option>
          {Object.entries(ESTADO_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        {(filtroEstado || filtroFecha || search) && (
          <button className="btn btn-sm btn-ghost" onClick={() => { setFiltroEstado(''); setFiltroFecha(''); setSearch('') }}>
            Limpiar filtros
          </button>
        )}
      </div>

      {isLoading && (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">No hay citas que mostrar.</p>
        </div>
      )}

      {/* Tabla */}
      {!isLoading && filtered.length > 0 && (
        <div className="overflow-x-auto rounded-xl">
          <table className="table table-sm w-full">
            <thead>
              <tr className="bg-base-300 text-xs uppercase tracking-wider">
                <th>Paciente</th>
                <th>Especialista</th>
                <th>Especialidad</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Consultorio</th>
                <th>Turno</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-base-200 transition-colors">
                  <td className="font-medium">{c.paciente?.nombre} {c.paciente?.apellido}</td>
                  <td>{c.especialista?.nombre} {c.especialista?.apellido}</td>
                  <td className="text-gray-400 text-xs">{c.especialista?.especialidad}</td>
                  <td>{c.fecha ? new Date(c.fecha).toLocaleDateString('es-CL', { timeZone: 'America/Santiago' }) : '-'}</td>
                  <td>{c.hora}</td>
                  <td>{c.consultorio}</td>
                  <td><span className="badge badge-sm badge-ghost">{c.turno}</span></td>
                  <td>
                    <span className={'badge badge-sm ' + (ESTADO_COLORS[c.estado] ?? 'badge-ghost')}>
                      {ESTADO_LABELS[c.estado] ?? c.estado}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-1 flex-wrap">
                      {c.estado !== 'CONFIRMADA' && c.estado !== 'COMPLETADA' && c.estado !== 'CANCELADA' && (
                        <button
                          className="btn btn-xs btn-outline btn-info"
                          disabled={updatingId === c.id}
                          onClick={() => handleCambiarEstado(c.id, 'CONFIRMADA')}
                        >
                          Confirmar
                        </button>
                      )}
                      {c.estado === 'CONFIRMADA' && (
                        <button
                          className="btn btn-xs btn-outline btn-success"
                          disabled={updatingId === c.id}
                          onClick={() => handleCambiarEstado(c.id, 'COMPLETADA')}
                        >
                          Completar
                        </button>
                      )}
                      {c.estado !== 'CANCELADA' && c.estado !== 'COMPLETADA' && (
                        <button
                          className="btn btn-xs btn-outline btn-warning"
                          disabled={updatingId === c.id}
                          onClick={() => handleCambiarEstado(c.id, 'CANCELADA')}
                        >
                          Cancelar
                        </button>
                      )}
                      <button className="btn btn-xs btn-outline btn-error" onClick={() => handleDelete(c.id)}>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ModalNewCita isModalOpen={modalNew} onClose={() => setModalNew(false)} onCreated={mutate} />
    </div>
  )
}
