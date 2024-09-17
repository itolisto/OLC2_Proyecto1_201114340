import { BaseVisitor } from "./oaklang.base.impl.js";
import { Callable } from "./oaklang.callable.js";
import { OakError } from "./oakerror.js";
import nodes from "./oaklang.nodes.impl.js"

/**
 * Clase para buscar el índice de un valor en un array.
 * Extiende la clase `Callable`.
 */
export class OakIndexOf extends Callable {
    /**
     * Crea una instancia de OakIndexOf.
     *
     * @param {Array} array - El array en el que se va a buscar.
     */
    constructor(array) {
        super()
        this.array = array
    }

    /**
     * Devuelve la cantidad de argumentos que esta función acepta.
     * 
     * @returns {number} El número de argumentos esperados.
     */
    arity() {
        return 1
    }

    /**
     * Ejecuta la función buscando el índice de un valor en el array.
     * 
     * @param {BaseVisitor} interpreter - El intérprete para ejecutar la función.
     * @param {Array} args - Los argumentos pasados a la función.
     * @returns {Object} El índice del valor en el array como un literal de tipo `int`.
     * @throws {OakError} Si el número de argumentos es incorrecto.
     */
    invoke({interpreter, args}) {
        if (args.length != this.arity()) {
            throw new OakError(null, `arguments ${args.lenght > this.arity() ? 'are greater than expected' : 'missing expected ' + this.arity()}`)
        }

        const value = args[0].interpret(interpreter).value
        const arrayValues = this.array.value.map((entry) => entry.value)
        const index = arrayValues.indexOf(value)
        const result = new nodes.Literal({type: 'int', value: index})

        console.log(result)
        return result
    }
}

/**
 * Clase para unir los valores de un array en una cadena.
 * Extiende la clase `Callable`.
 */
export class OakJoin extends Callable {
    /**
     * Crea una instancia de OakJoin.
     *
     * @param {Array} array - El array cuyos valores se van a unir.
     */
    constructor(array) {
        super()
        this.array = array
    }

    /**
     * Devuelve la cantidad de argumentos que esta función acepta.
     * 
     * @returns {number} El número de argumentos esperados (0).
     */
    arity() {
        return 0
    }

    /**
     * Ejecuta la función uniendo los valores del array en una cadena.
     * 
     * @param {BaseVisitor} interpreter - El intérprete para ejecutar la función.
     * @param {Array} args - Los argumentos pasados a la función.
     * @returns {Object} La cadena resultante como un literal de tipo `string`.
     * @throws {OakError} Si el número de argumentos es incorrecto.
     */
    invoke({interpreter, args}) {
        if (args.length != this.arity()) {
            throw new OakError(null, `arguments ${args.lenght > this.arity() ? 'are greater than expected' : 'missing expected ' + this.arity()}`)
        }

        const arrayValues = this.array.value.map((entry) => entry.value)
        const fusion = arrayValues.join(',')
        const result = new nodes.Literal({type: 'string', value: fusion})

        console.log(result)
        return result
    }
}

/**
 * Clase para obtener la longitud de un array.
 * Extiende la clase `Callable`.
 */
export class OakLength extends Callable {
    /**
     * Crea una instancia de OakLength.
     *
     * @param {Array} array - El array cuya longitud se va a calcular.
     */
    constructor(array) {
        super()
        this.array = array
    }

    /**
     * Devuelve la cantidad de argumentos que esta función acepta.
     * 
     * @returns {number} El número de argumentos esperados (0).
     */
    arity() {
        return 0
    }

    /**
     * Ejecuta la función devolviendo la longitud del array.
     * 
     * @param {BaseVisitor} interpreter - El intérprete para ejecutar la función.
     * @param {Array} args - Los argumentos pasados a la función.
     * @returns {Object} La longitud del array como un literal de tipo `int`.
     * @throws {OakError} Si el número de argumentos es incorrecto.
     */
    invoke({interpreter, args}) {
        if (args.length != this.arity()) {
            throw new OakError(null, `arguments ${args.lenght > this.arity() ? 'are greater than expected' : 'missing expected ' + this.arity()}`)
        }
        
        const length = this.array.value.length
        const result = new nodes.Literal({type: 'int', value: length})

        console.log(result)
        return result
    }
}

export default {
    OakIndexOf,
    OakJoin,
    OakLength
}