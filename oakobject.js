import { Callable } from "./callable.js";
import { OakError } from "./oakerror.js";
import { Instance } from "./instance.js";
import { OakArray } from "./oakarray.js";
import nodes from "./oaklang.nodes.impl.js"
import { SysClass } from "./sysclass.js";

export class OakObject extends SysClass {
    constructor() {
        super({}, {})

        this.properties = {}
        this.functions = {'keys': new ObjectKeys()}
    }

    getFunction(name) {
        return this.functions[name]
    }    
}

class ObjectKeys extends Callable {
    arity() {
        return 1
    }

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