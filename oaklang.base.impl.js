/**
 * @typedef {Object} Location
 * @property {Object} start
 * @property {number} start.offset
 * @property {number} start.line
 * @property {number} start.column
 * @property {Object} end
 * @property {number} end.offset
 * @property {number} end.line
 * @property {number} end.column
 */

/**
 * @typedef {Object} Environment
 * @property {number} scope 
 * @property {Environment} parent
 */
export class Environment {
    /**
     * @param {number} scope Nivel del scope
     * @param {Environment} parent Ambiente padre si hay
     */
    constructor(scope, parent) {
        /**
         * Nivel del scope
         * @type {number}
         * @public
         */
        this.scope = scope;

        /**
         * Ambiente padre si hay
         * @type {Environment}
         * @public
         */
        this.parent = parent;
    }
}

/**
 * @typedef {Object} BaseVisitor
 */
export class BaseVisitor {
    /**
     * Implementar numero
     * 
     * @method
     * @name BaseVisitor#visitNumero
     * @param {BaseNode} node Nodo a visitar
     * @throws {Error} Clase base no está implementada
     */
    visitNumero(node) {
        throw new Error("Sin implementar");
    }
}

/**
 * @typedef {Object} BaseNode Clase base para cualquier expresión
 * @property {Location} location Ubicación del nodo en el código fuente
 */
export class BaseNode {
    /**
     * @param {Location} location Ubicación del nodo en el código fuente
     */
    constructor(location) {
        /**
         * Ubicación del nodo en el código fuente
         * @type {Location}
         * @public
         */
        this.location = location;
    }

    /**
     * Procesar nodo utilizando visitor
     * @method
     * @name BaseNode#accept
     * @param {BaseVisitor} visitor Implementación de visitor
     * @throws {Error} Clase base no está implementada
     */
    accept(visitor) {
        throw new Error("Sin implementar");
    }
}