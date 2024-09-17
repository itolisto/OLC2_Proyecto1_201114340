import { OakIndexOf, OakJoin, OakLength } from "./oaklang.array.functions.js"
import { OakError } from "./oakerror.js"

/**
 * Clase que representa un arreglo en OakLang.
 * Permite gestionar el tipo, tamaño, profundidad y valor de los elementos.
 */
export class OakArray {
    /**
     * Crea una instancia de OakArray.
     * 
     * @param {Object} params - Los parámetros para crear el arreglo.
     * @param {string} params.type - El tipo de los elementos del arreglo.
     * @param {number} params.size - El tamaño del arreglo.
     * @param {number} params.deep - La profundidad de los elementos anidados en el arreglo.
     * @param {Array} params.value - Los valores o elementos dentro del arreglo.
     */
    constructor({type, size, deep, value}) {
        this.type = type
        this.deep = deep
        this.size = size
        // "value" son los elementos
        this.value = value
        this.functions = {
            'indexOf': new OakIndexOf(this),
            'join': new OakJoin(this),
            'length': new OakLength(this)
         }
    }

    /**
     * Crea una copia profunda del arreglo, copiando sus elementos.
     * 
     * @returns {OakArray} Una nueva instancia de OakArray con los mismos valores.
     */
    copy() {
        const copyValues = this.value.map((element) => {
            if (element instanceof OakArray) {
                return element.copy()
            } else {
                return element
            }
        })

        return new OakArray({type: this.type, deep: this.deep, size: this.size, value: copyValues})
    }

    /**
     * Método no implementado para obtener una propiedad del arreglo.
     * 
     * @returns {undefined} Siempre retorna undefined.
     */
    getProperty() {
        return undefined
    }
 
    /**
     * Obtiene una función asociada con el arreglo por su nombre.
     * 
     * @param {string} name - El nombre de la función a obtener.
     * @returns {Function} La función asociada con el nombre proporcionado.
     */
    getFunction(name) {
        return this.functions[name]
    }

    // TODO: Validar el tipo aqui o en el interprete?
    /**
     * Establece un valor en un índice específico del arreglo.
     * 
     * @param {number} index - El índice en el que se desea establecer el valor.
     * @param {Object} node - El nuevo valor a establecer en el índice.
     * @param {Object} location - La ubicación del nodo
     * @returns {Object} El valor establecido en el índice.
     * @throws {OakError} Si el índice está fuera de los límites del arreglo.
     */
    set(index, node, location) {
        if (index + 1 > this.size) {
            return undefined
        }

        this.value[index] = node
        return this.value[index]
    }

    /**
     * Obtiene un valor en un índice específico del arreglo.
     * 
     * @param {number} index - El índice del valor que se desea obtener.
     * @returns {Object|undefined} El valor en el índice, o undefined si está fuera de los límites.
     */
    get(index, location) {
        if (index + 1 > this.size) {
            return undefined
        }
        
        return this.value[index]
    }
}