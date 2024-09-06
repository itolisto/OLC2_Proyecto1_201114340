import { BaseNode } from "./oaklang.base.impl.js";

export class NumberNode extends BaseNode {

    constructor(location, props) {
        super(location);
        this.props = props;
    }

    /**
     * @type {BaseNode['accept']}
     */
    accept(visitor) {
        return visitor.visitNumero(this);
    }
}