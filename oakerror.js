/**
 * Clase de error personalizada para manejar errores con una ubicación específica y un mensaje.
 * Extiende la clase `Error` nativa de JavaScript.
 */
export class OakError extends Error {
    /**
     * Crea una instancia de OakError.
     *
     * @param {string} location - La ubicación donde ocurrió el error.
     * @param {string} errorMessage - El mensaje de error a mostrar.
     */
    constructor(location, errorMessage) {
        super(errorMessage)
        this.location = location
    }
}