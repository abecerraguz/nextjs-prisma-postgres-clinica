'use client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState, useEffect } from 'react'

const validationSchema = Yup.object({
  pacienteId: Yup.string().required('Requerido'),
  especialistaId: Yup.string().required('Requerido'),
  fecha: Yup.date().required('Requerido'),
  hora: Yup.string().required('Requerido'),
  consultorio: Yup.string().required('Requerido'),
  turno: Yup.string().required('Requerido'),
})

export default function ModalNewCita({ isModalOpen, onClose, onCreated, pacienteIdFijo }) {
  const [pacientes, setPacientes] = useState([])
  const [especialistas, setEspecialistas] = useState([])

  useEffect(() => {
    if (!isModalOpen) return
    fetch('/api/pacientes').then(r => r.json()).then(d => setPacientes(d.items ?? d))
    fetch('/api/especialistas').then(r => r.json()).then(setEspecialistas)
  }, [isModalOpen])

  const formik = useFormik({
    initialValues: {
      pacienteId: pacienteIdFijo ?? '',
      especialistaId: '',
      fecha: '',
      hora: '',
      consultorio: '',
      turno: '',
      estado: 'PENDIENTE',
      observaciones: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const res = await fetch('/api/citas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, fecha: new Date(values.fecha) }),
      })
      if (res.ok) { resetForm(); onCreated?.(); onClose() }
    },
  })

  return (
    <dialog className="modal" open={isModalOpen}>
      <div className="modal-box max-w-lg">
        <h3 className="font-bold text-lg border-b border-base-300 uppercase tracking-wider mb-5">Nueva Cita</h3>
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>X</button>

        <form onSubmit={formik.handleSubmit} className="space-y-2">
          {!pacienteIdFijo && (
            <div>
              <select name="pacienteId" className="select input-bordered input-info w-full my-1"
                value={formik.values.pacienteId} onChange={formik.handleChange}>
                <option value="">Seleccionar paciente</option>
                {pacientes.map(p => <option key={p.id} value={p.id}>{p.nombre} {p.apellido}</option>)}
              </select>
              {formik.touched.pacienteId && formik.errors.pacienteId && <p className="text-error text-xs">{formik.errors.pacienteId}</p>}
            </div>
          )}

          <div>
            <select name="especialistaId" className="select input-bordered input-info w-full my-1"
              value={formik.values.especialistaId} onChange={formik.handleChange}>
              <option value="">Seleccionar especialista</option>
              {especialistas.map(e => <option key={e.id} value={e.id}>{e.nombre} {e.apellido} - {e.especialidad}</option>)}
            </select>
            {formik.touched.especialistaId && formik.errors.especialistaId && <p className="text-error text-xs">{formik.errors.especialistaId}</p>}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <input name="fecha" type="date" className="input input-bordered input-info w-full my-1"
                value={formik.values.fecha} onChange={formik.handleChange} />
              {formik.touched.fecha && formik.errors.fecha && <p className="text-error text-xs">{formik.errors.fecha}</p>}
            </div>
            <div>
              <input name="hora" type="time" className="input input-bordered input-info w-full my-1"
                value={formik.values.hora} onChange={formik.handleChange} />
              {formik.touched.hora && formik.errors.hora && <p className="text-error text-xs">{formik.errors.hora}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <input name="consultorio" placeholder="Consultorio" className="input input-bordered input-info w-full my-1"
                value={formik.values.consultorio} onChange={formik.handleChange} />
              {formik.touched.consultorio && formik.errors.consultorio && <p className="text-error text-xs">{formik.errors.consultorio}</p>}
            </div>
            <div>
              <select name="turno" className="select input-bordered input-info w-full my-1"
                value={formik.values.turno} onChange={formik.handleChange}>
                <option value="">Turno</option>
                <option value="MANANA">Manana</option>
                <option value="TARDE">Tarde</option>
              </select>
              {formik.touched.turno && formik.errors.turno && <p className="text-error text-xs">{formik.errors.turno}</p>}
            </div>
          </div>

          <select name="estado" className="select input-bordered input-info w-full my-1"
            value={formik.values.estado} onChange={formik.handleChange}>
            <option value="PENDIENTE">Pendiente</option>
            <option value="CONFIRMADA">Confirmada</option>
            <option value="COMPLETADA">Completada</option>
            <option value="CANCELADA">Cancelada</option>
          </select>

          <textarea name="observaciones" placeholder="Observaciones (opcional)" rows={2}
            className="textarea textarea-bordered textarea-info w-full my-1"
            value={formik.values.observaciones} onChange={formik.handleChange} />

          <button type="submit" className="btn btn-sm btn-success hover:bg-cyan-600 w-full mt-5 font-normal" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? <span className="loading loading-spinner loading-xs"></span> : 'Guardar cita'}
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop"><button onClick={onClose}>cerrar</button></form>
    </dialog>
  )
}
