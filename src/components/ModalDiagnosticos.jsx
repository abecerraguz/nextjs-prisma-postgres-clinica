'use client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState, useEffect } from 'react'
import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

export default function ModalDiagnosticos({ isModalOpen, onClose, paciente }) {
  const [tab, setTab] = useState('historial')
  const [especialistas, setEspecialistas] = useState([])

  const { data: diagnosticos, mutate } = useSWR(
    isModalOpen && paciente ? '/api/diagnosticos?pacienteId=' + paciente.id : null,
    fetcher
  )

  useEffect(() => {
    if (isModalOpen) fetch('/api/especialistas').then(r => r.json()).then(setEspecialistas)
  }, [isModalOpen])

  const calcularIMC = (peso, altura) => {
    if (!peso || !altura || altura <= 0) return null
    const imc = (Number(peso) / (Number(altura) * Number(altura))).toFixed(1)
    let nivel = 'Normal'
    if (imc < 18.5) nivel = 'Bajo peso'
    else if (imc < 25) nivel = 'Normal'
    else if (imc < 30) nivel = 'Sobrepeso'
    else nivel = 'Obesidad'
    return { imc: Number(imc), nivel }
  }

  const formik = useFormik({
    initialValues: { edad: '', peso: '', altura: '', imc: '', nivelPeso: '', presionArterial: '', diagnostico: '', recetario: '', especialistaId: '' },
    validationSchema: Yup.object({
      edad: Yup.number().required('Requerido').positive(),
      peso: Yup.number().required('Requerido').positive(),
      altura: Yup.number().required('Requerido').positive(),
      presionArterial: Yup.string().required('Requerido'),
      diagnostico: Yup.string().required('Requerido'),
    }),
    onSubmit: async (values, { resetForm }) => {
      const res = await fetch('/api/diagnosticos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, pacienteId: paciente.id }),
      })
      if (res.ok) { resetForm(); mutate(); setTab('historial') }
    },
  })

  const handlePesoAlturaChange = (e) => {
    formik.handleChange(e)
    const peso = e.target.name === 'peso' ? e.target.value : formik.values.peso
    const altura = e.target.name === 'altura' ? e.target.value : formik.values.altura
    const result = calcularIMC(peso, altura)
    if (result) {
      formik.setFieldValue('imc', result.imc)
      formik.setFieldValue('nivelPeso', result.nivel)
    }
  }

  return (
    <dialog className="modal" open={isModalOpen}>
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg border-b border-base-300 uppercase tracking-wider mb-1">Diagnosticos</h3>
        <p className="text-sm text-base-content/60 mb-4">{paciente?.nombre} {paciente?.apellido}</p>
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>X</button>

        {/* Tabs */}
        <div className="tabs tabs-bordered mb-4">
          <button className={'tab' + (tab === 'historial' ? ' tab-active font-semibold' : '')} onClick={() => setTab('historial')}>
            Historial
          </button>
          <button className={'tab' + (tab === 'nuevo' ? ' tab-active font-semibold' : '')} onClick={() => setTab('nuevo')}>
            Nuevo diagnostico
          </button>
        </div>

        {tab === 'historial' && (
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {!diagnosticos && <p className="text-sm text-base-content/50">Cargando...</p>}
            {diagnosticos?.length === 0 && <p className="text-sm text-base-content/50">Sin diagnosticos registrados</p>}
            {diagnosticos?.map(d => (
              <div key={d.id} className="bg-base-200 rounded-lg p-3 text-sm space-y-1 border border-base-300">
                <div className="flex justify-between">
                  <span className="font-semibold">{new Date(d.fechaCreacion).toLocaleDateString('es-CL')}</span>
                  <span className="text-base-content/50">{d.especialista?.nombre} {d.especialista?.apellido}</span>
                </div>
                <p><span className="text-base-content/60">Diagnostico:</span> {d.diagnostico}</p>
                <p><span className="text-base-content/60">IMC:</span> {d.imc} ({d.nivelPeso}) | PA: {d.presionArterial}</p>
                {d.recetario && <p><span className="text-base-content/60">Recetario:</span> {d.recetario}</p>}
              </div>
            ))}
          </div>
        )}

        {tab === 'nuevo' && (
          <form onSubmit={formik.handleSubmit} className="space-y-1">
            <select name="especialistaId" className="select input-bordered input-info w-full my-1"
              value={formik.values.especialistaId} onChange={formik.handleChange}>
              <option value="">Especialista (opcional)</option>
              {especialistas.map(e => <option key={e.id} value={e.id}>{e.nombre} {e.apellido} - {e.especialidad}</option>)}
            </select>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <input name="edad" type="number" placeholder="Edad" className="input input-bordered input-info w-full my-1"
                  value={formik.values.edad} onChange={formik.handleChange} />
                {formik.touched.edad && formik.errors.edad && <p className="text-error text-xs">{formik.errors.edad}</p>}
              </div>
              <div>
                <input name="peso" type="number" step="0.1" placeholder="Peso (kg)" className="input input-bordered input-info w-full my-1"
                  value={formik.values.peso} onChange={handlePesoAlturaChange} />
                {formik.touched.peso && formik.errors.peso && <p className="text-error text-xs">{formik.errors.peso}</p>}
              </div>
              <div>
                <input name="altura" type="number" step="0.01" placeholder="Altura (m)" className="input input-bordered input-info w-full my-1"
                  value={formik.values.altura} onChange={handlePesoAlturaChange} />
                {formik.touched.altura && formik.errors.altura && <p className="text-error text-xs">{formik.errors.altura}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input name="imc" type="number" placeholder="IMC (calculado)" readOnly
                className="input input-bordered w-full my-1 bg-base-200 cursor-not-allowed"
                value={formik.values.imc} />
              <input name="nivelPeso" placeholder="Nivel de peso" readOnly
                className="input input-bordered w-full my-1 bg-base-200 cursor-not-allowed"
                value={formik.values.nivelPeso} />
            </div>

            <input name="presionArterial" placeholder="Presion arterial (ej: 120/80)" className="input input-bordered input-info w-full my-1"
              value={formik.values.presionArterial} onChange={formik.handleChange} />
            {formik.touched.presionArterial && formik.errors.presionArterial && <p className="text-error text-xs">{formik.errors.presionArterial}</p>}

            <textarea name="diagnostico" placeholder="Diagnostico" rows={2}
              className="textarea textarea-bordered textarea-info w-full my-1"
              value={formik.values.diagnostico} onChange={formik.handleChange} />
            {formik.touched.diagnostico && formik.errors.diagnostico && <p className="text-error text-xs">{formik.errors.diagnostico}</p>}

            <textarea name="recetario" placeholder="Recetario (opcional)" rows={2}
              className="textarea textarea-bordered textarea-info w-full my-1"
              value={formik.values.recetario} onChange={formik.handleChange} />

            <button type="submit" className="btn btn-sm btn-success hover:bg-cyan-600 w-full mt-5 font-normal" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? <span className="loading loading-spinner loading-xs"></span> : 'Guardar diagnostico'}
            </button>
          </form>
        )}
      </div>
      <form method="dialog" className="modal-backdrop"><button onClick={onClose}>cerrar</button></form>
    </dialog>
  )
}
