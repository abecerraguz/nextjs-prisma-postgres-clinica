// actions.js
export async function eliminarRegistro(id) {
    const res = await fetch(`/api/pacientes/${id}`, {
      method: 'DELETE',
    });
  
    if (!res.ok) {
      throw new Error('No se pudo eliminar el registro');
    }
  
    // return id;
  }

  export async function updateRegistro() {
    const res = await fetch(`/api/pacientes`, {
      method: 'GET',
    });
  
    if (!res.ok) {
      throw new Error('No se pudo obtener registros');
    }
  
    // return id;
  }
  