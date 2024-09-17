/**
 * Clase base para todas las funciones invocables en OakLang.
 * Define la interfaz que deben implementar las funciones, con los métodos `arity` e `invoke`.
 */
export class Callable {
    /**
     * Devuelve la cantidad de argumentos que esta función acepta.
     * Debe ser implementado por las subclases.
     * 
     * @throws {Error} Si no se ha implementado el método en una subclase.
     * @returns {number} La cantidad de argumentos que la función espera.
     */
    arity() {
        throw new Error('arity not implemented');
    }

    /**
     * Ejecuta la función con un intérprete y los argumentos proporcionados.
     * Debe ser implementado por las subclases.
     * 
     * @param {Object} params - Parámetros de la función.
     * @param {Object} params.interpreter - Instancia del intérprete que se utiliza para ejecutar los nodos.
     * @param {Array} params.args - Los argumentos que se pasan a la función para su ejecución.
     * @throws {Error} Si no se ha implementado el método en una subclase.
     * @returns {*} El resultado de la ejecución de la función.
     */
    invoke({interpreter, args}) {
        throw new Error('invoke not implemented');
    }
}