/**
 * Clase que representa una constante en OakLang.
 * Almacena un tipo y un valor inmutables.
 */
export class OakConstant {
    /**
     * Crea una instancia de OakConstant.
     * 
     * @param {string} type - El tipo de la constante (por ejemplo, 'int', 'string', etc.).
     * @param {*} value - El valor de la constante.
     */
    constructor(type, value) {
        this.type = type
        this.value = value
    }
}