/**
 * Clase base para todas las clases del sistema en OakLang.
 * Proporciona un marco general para manejar propiedades y funciones de clases del sistema.
 */
export class SysClass {
    /**
     * Crea una nueva instancia de SysClass.
     * 
     * @param {Object} properties - Las propiedades de la clase del sistema.
     * @param {Object} functions - Las funciones de la clase del sistema.
     */
    constructor(properties, functions) {
        this.properties = properties
        this.functions = functions
    }

    /**
     * Asigna un valor a una propiedad específica de la clase.
     * 
     * @param {string} name - El nombre de la propiedad.
     * @param {any} node - El valor o nodo que será asignado a la propiedad.
     * @throws {Error} Si la asignación no es válida o no se define.
     */
    set(name, node) {
        throw new Error('Not implemented')
    }

    /**
     * Recupera una función de la clase por su nombre.
     * 
     * @param {string} name - El nombre de la función a recuperar.
     * @returns {Function|undefined} La función correspondiente al nombre, o undefined si no existe.
     */
    getFunction(name) {
        throw new Error('Not implemented')
    }

    /**
     * Recupera una propiedad de la clase por su nombre.
     * 
     * @param {string} name - El nombre de la propiedad a recuperar.
     * @returns {any} El valor de la propiedad, o undefined si no existe.
     */
    getProperty(name) {
        throw new Error('Not implemented')
    }
}