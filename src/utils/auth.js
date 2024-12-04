import jwt from 'jsonwebtoken';

/**
 * Verifica si un token JWT ha expirado.
 * @param {string} token - El token JWT a verificar.
 * @returns {object|null} Retorna el payload del token si es válido y no ha expirado, o `null` si es inválido/expirado.
 */
export function isTokenExpired(token) {
 

  if (!token) return null;

  try {
    const decoded = jwt.decode(token); // Decodifica el token sin verificar la firma
    // console.log('Payload decodificado:', decoded);

    if (!decoded || !decoded.exp) return null;

    const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

    return decoded.exp < now ? null : decoded; // Si expira, retorna null, de lo contrario, el payload
  
  } catch (err) {
    console.error('Error al decodificar el token:', err);
    return null;
  }
}
