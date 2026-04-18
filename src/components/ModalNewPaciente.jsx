'use client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState, useEffect } from 'react'

const validationSchema = Yup.object({
  nombre: Yup.string().required('Requerido'),
  apellido: Yup.string().required('Requerido'),
  sexo: Yup.string().required('Requerido'),
  fechaNacimiento: Yup.date().required('Requerido'),
  region: Yup.string().required('Requerido'),
  ciudad: Yup.string().required('Requerido'),
  telefono: Yup.string().required('Requerido'),
  tipoSangre: Yup.string().required('Requerido'),
  tipoAlergia: Yup.string().required('Requerido'),
  padecimientoCro: Yup.string().required('Requerido'),
})

export default function ModalNewPaciente({ isModalOpen, onClose, onCreated }) {
  const [regiones, setRegiones] = useState([])
  useEffect(() => { fetch('/api/regiones').then(r => r.json()).then(setRegiones) }, [])

  const formik = useFormik({
    initialValues: { nombre: '', apellido: '', sexo: '', fechaNacimiento: '', region: '', ciudad: '', telefono: '', tipoSangre: '', tipoAlergia: '', padecimientoCro: '' },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const res = await fetch('/api/pacientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, fechaNacimiento: new Date(values.fechaNacimiento) }),
      })
      if (res.ok) { resetForm(); onCreated?.(); onClose() }
    },
  })

  const comunas = regiones.find(r => r.region === formik.values.region)?.comunas ?? []

  return (
    <dialog className="modal" open={isModalOpen}>
      <div className="modal-box max-w-lg">
        <h3 className="font-bold text-lg border-b border-base-300 uppercase tracking-wider mb-5">Nuevo Paciente</h3>
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>X</button>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input name="nombre" placeholder="Nombre" className="input input-bordered input-info w-full my-1"
                value={formik.values.nombre} onChange={formik.handleChange} />
              {formik.touched.nombre && formik.errors.nombre && <p className="text-error text-xs">{formik.errors.nombre}</p>}
            </div>
            <div>
              <input name="apellido" placeholder="Apellido" className="input input-bordered input-info w-full my-1"
                value={formik.values.apellido} onChange={formik.handleChange} />
              {formik.touched.apellido && formik.errors.apellido && <p className="text-error text-xs">{formik.errors.apellido}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <select name="sexo" className="select input-bordered input-info w-full my-1"
                value={formik.values.sexo} onChange={formik.handleChange}>
                <option value="">Sexo</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
              {formik.touched.sexo && formik.errors.sexo && <p className="text-error text-xs">{formik.errors.sexo}</p>}
            </div>
            <div>
              <input name="fechaNacimiento" type="date" className="input input-bordered input-info w-full my-1"
                value={formik.values.fechaNacimiento} onChange={formik.handleChange} />
              {formik.touched.fechaNacimiento && formik.errors.fechaNacimiento && <p className="text-error text-xs">{formik.errors.fechaNacimiento}</p>}
            </div>
          </div>

          <select name="region" className="select input-bordered input-info w-full my-1"
            value={formik.values.region} onChange={(e) => { formik.handleChange(e); formik.setFieldValue('ciudad', '') }}>
            <option value="">Seleccionar region</option>
            {regiones.map(r => <option key={r.region} value={r.region}>{r.region}</option>)}
          </select>
          {formik.touched.region && formik.errors.region && <p className="text-error text-xs">{formik.errors.region}</p>}

          <select name="ciudad" className="select input-bordered input-info w-full my-1"
            value={formik.values.ciudad} onChange={formik.handleChange} disabled={!comunas.length}>
            <option value="">Seleccionar comuna</option>
            {comunas.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {formik.touched.ciudad && formik.errors.ciudad && <p className="text-error text-xs">{formik.errors.ciudad}</p>}

          <input name="telefono" placeholder="Telefono" className="input input-bordered input-info w-full my-1"
            value={formik.values.telefono} onChange={formik.handleChange} />
          {formik.touched.telefono && formik.errors.telefono && <p className="text-error text-xs">{formik.errors.telefono}</p>}

          <div className="divider text-xs text-base-content/50 my-2">Expediente</div>

          <select name="tipoSangre" className="select input-bordered input-info w-full my-1"
            value={formik.values.tipoSangre} onChange={formik.handleChange}>
            <option value="">Tipo de sangre</option>
            {['Tipo A','Tipo B','Tipo AB','Tipo O'].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          {formik.touched.tipoSangre && formik.errors.tipoSangre && <p className="text-error text-xs">{formik.errors.tipoSangre}</p>}

          <input name="tipoAlergia" placeholder="Tipo de alergia (ej: Ninguna)" className="input input-bordered input-info w-full my-1"
            value={formik.values.tipoAlergia} onChange={formik.handleChange} />
          {formik.touched.tipoAlergia && formik.errors.tipoAlergia && <p className="text-error text-xs">{formik.errors.tipoAlergia}</p>}

          <input name="padecimientoCro" placeholder="Padecimiento cronico (ej: Ninguno)" className="input input-bordered input-info w-full my-1"
            value={formik.values.padecimientoCro} onChange={formik.handleChange} />
          {formik.touched.padecimientoCro && formik.errors.padecimientoCro && <p className="text-error text-xs">{formik.errors.padecimientoCro}</p>}

          <button type="submit" className="btn btn-sm btn-success hover:bg-cyan-600 w-full mt-5 font-normal" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? <span className="loading loading-spinner loading-xs"></span> : 'Guardar paciente'}
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop"><button onClick={onClose}>cerrar</button></form>
    </dialog>
  )
}
