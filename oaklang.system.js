import { Callable } from "./oaklang.callable.js";
import { OakError } from "./oaklang.error.js";
import { SysClass } from "./oaklang.system.base.js";
import nodes from "./oaklang.nodes.impl.js"

/**
 * Representa el sistema principal en OakLang, responsable de manejar las propiedades y funciones del sistema.
 * Hereda de SysClass.
 */
export class OakSystem extends SysClass {
    /**
     * Crea una nueva instancia de OakSystem.
     * Define las propiedades del sistema, como el flujo de salida.
     */
    constructor() {
        super({}, {})
        this.properties = {'out': new OakOutputStream()}
        this.functions = {}
    }

    /**
     * Intenta asignar un valor a una propiedad del sistema, pero todas las propiedades son constantes, lo que genera un error.
     * 
     * @param {string} name - El nombre de la propiedad.
     * @param {Object} node - El nodo con el valor a asignar.
     * @throws {OakError} Si se intenta reasignar una propiedad constante o si la propiedad no existe.
     */
    set(name, node) {
        if(this.properties[name] != undefined) {
            throw new OakError(null, `Illegal reassign, ${name} is constant`)
        } else {
            throw new OakError(null, `Illegal set, property doesn't exists`)
        }
    }

    /**
     * Recupera una función del sistema.
     * 
     * @param {string} name - El nombre de la función.
     * @returns {undefined} No hay funciones en el sistema por defecto.
     */
    getFunction(name) {
        return undefined
    }

    /**
     * Recupera una propiedad del sistema.
     * 
     * @param {string} name - El nombre de la propiedad.
     * @returns {Object|undefined} La propiedad si existe, o undefined si no se encuentra.
     */
    getProperty(name) {
        return this.properties[name]
    }
}

/**
 * Clase que representa el flujo de salida en el sistema OakLang.
 * Hereda de SysClass.
 */
class OakOutputStream extends SysClass {
    /**
     * Crea una nueva instancia de OakOutputStream.
     * Define la función `println` para imprimir datos.
     */
    constructor() {
        super({} , {'println' : new Println()})
    }

    /**
     * Intenta asignar una propiedad, pero OakOutputStream no tiene propiedades modificables.
     * 
     * @param {string} name - El nombre de la propiedad.
     * @param {Object} node - El nodo con el valor a asignar.
     * @throws {OakError} Siempre lanza un error ya que las propiedades no pueden ser modificadas.
     */
    set(name, node) {
        throw new OakError(null, `Illegal set, Class OakOutputStream doesn't have any properties`)
    }

    /**
     * Recupera una función de OakOutputStream.
     * 
     * @param {string} name - El nombre de la función.
     * @returns {Object|undefined} La función si existe, o undefined si no se encuentra.
     */
    getFunction(name) {
        return this.functions[name]
    }

    /**
     * Intenta recuperar una propiedad, pero OakOutputStream no tiene propiedades.
     * 
     * @param {string} name - El nombre de la propiedad.
     * @returns {undefined} Siempre devuelve undefined ya que no hay propiedades en OakOutputStream.
     */
    getProperty(name) {
        return undefined
    }
}

/**
 * Clase que representa la función `println` en OakLang para OakOutputStream.
 * Hereda de Callable y permite imprimir datos al flujo de salida.
 */
class Println extends Callable {
    /**
     * Devuelve la cantidad de argumentos esperados por la función `println`.
     * 
     * @returns {undefined} No se define arity, ya que `println` puede recibir cualquier número de argumentos.
     */
    arity() {
        return undefined
    }

    /**
     * Invoca la función `println`, que interpreta y concatena los valores de los argumentos y los imprime en el sistema.
     * Solo permite imprimir valores literales (primitivos).
     * 
     * @param {Object} interpreter - El intérprete que ejecuta el código.
     * @param {Array} args - Los argumentos pasados a `println`, que se interpretarán y concatenarán.
     * @throws {OakError} Si alguno de los argumentos no es un valor primitivo.
     * @returns {void} Imprime el resultado concatenado al flujo de salida.
     */
    invoke({interpreter, args}) {
        if(args.length == 0) return
 
        let result = args.reduce((prevArg, currentArg, index) => {
            let result
            const currentVal = currentArg.interpret(interpreter)
            
            if(!((currentVal instanceof nodes.Literal))) {
                throw new OakError(null, `only primitive vals can be printned, ${currentVal.type} may be array or object`)
            }

            if (prevArg != undefined)  result = `${prevArg} ${currentVal.value}`
            else result = currentVal.value
            
            return result
        },
        undefined
        )

        result = result + '\n'
        interpreter.output += result
        console.log(result)

        return
    }
}