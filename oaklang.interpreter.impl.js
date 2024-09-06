import { BaseVisitor, Environment } from "./oaklang.base.impl.js";

export class InterpreterVisitor extends BaseVisitor {

    constructor() {
        super();
        this.env = new Environment();
        this.output = '';
    }

    /**
     * @type {BaseVisitor['visitNumero']}
     */
    visitNumero(node) {
        return node.valor;
    }
}