/**
 * Clase que representa una instancia de una clase en OakLang.
 * Permite gestionar propiedades y valores asociados a una instancia de clase.
 */
export class Instance {
    /**
     * Crea una nueva instancia de una clase OakLang.
     * 
     * @param {OakClass} oakClass - La clase OakLang a la que pertenece esta instancia.
     * @param {string} type - El tipo de la instancia (nombre de la clase).
     */
    constructor(oakClass, type) {
        /** @type {OakClass} */
        this.oakClass = oakClass
        /** @type {string} */
        this.type = type
        /** @type {Array} */
        this.properties = []
    }

    /**
     * Establece el valor de una propiedad en la instancia.
     * 
     * @param {string} name - El nombre de la propiedad que se va a establecer.
     * @param {*} value - El valor que se asignará a la propiedad.
     */
    set(name, value) {
        this.properties[name] = value
    }

    /**
     * Recupera el valor de una propiedad de la instancia.
     * 
     * @param {string} name - El nombre de la propiedad que se desea obtener.
     * @returns {*} El valor de la propiedad o `undefined` si no existe.
     */
    getProperty(name) {
        return this.properties[name]
    }
}