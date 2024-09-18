import { Callable } from "./oaklang.callable.js";
import { OakError } from "./oaklang.error.js";
import { Instance } from "./oaklang.instance.js";
import { SysClass } from "./sysclass.js";
import nodes from "./oaklang.nodes.impl.js"

/**
 * Clase que representa un objeto base en OakLang.
 * Hereda de SysClass y proporciona funcionalidades para manejar objetos y sus propiedades.
 */
export class OakObject extends SysClass {
    /**
     * Crea una nueva instancia de OakObject.
     * Inicializa las propiedades y funciones del objeto, incluyendo la función 'keys'.
     */
    constructor() {
        super({}, {})
        this.properties = {}
        this.functions = {'keys': new ObjectKeys()}
    }

    /**
     * Recupera una función del objeto OakObject.
     * 
     * @param {string} name - El nombre de la función.
     * @returns {Callable|undefined} La función si existe, o undefined si no se encuentra.
     */
    getFunction(name) {
        return this.functions[name]
    }    
}

class ObjectKeys extends Callable {
    /**
     * Devuelve la cantidad de argumentos esperados por la función `keys`.
     * 
     * @returns {number} El número de argumentos esperados, que es 1.
     */
    arity() {
        return 1
    }

    /**
     * Invoca la función `keys`, que interpreta el primer argumento como una instancia y devuelve las claves de sus propiedades.
     * 
     * @param {Object} interpreter - El intérprete que ejecuta el código.
     * @param {Array} args - Los argumentos pasados a la función `keys`.
     * @throws {OakError} Si no se proporciona un argumento o si el argumento no es una instancia válida.
     * @returns {nodes.Literal} Un nodo literal que contiene una cadena con las claves del objeto.
     */
    invoke({interpreter, args}) {
        if(args.length != this.arity()) throw new OakError(null, `arguments ${args.lenght > this.arity() ? 'are greater than expected' : 'missing expected ' + this.arity()}`)
          
        const arg = args[0].interpret(interpreter)

        if(!(arg instanceof Instance)) throw new OakError(null, `Can't get properties of a not Struct type`)
        
        const props = Object.keys(arg.properties)
        const keys = Object.keys(arg.properties).join(', ')
        const result = new nodes.Literal({type: 'string', value: `[${keys}]` })

        console.log(result)
        return result
    }
}