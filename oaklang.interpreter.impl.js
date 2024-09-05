import { BaseVisitor } from "./oaklang.base.impl.js";

export class InterpreterVisitor extends BaseVisitor {

    constructor() {
        super();
        // this.entornoActual = new Entorno();
        this.output = '';
    }

    /**
     * @type {BaseVisitor['visitNumero']}
     */
    visitNumero(node) {
        
    }
}