import { Callable } from "./oaklang.callable.js";
import { OakError } from "./oaklang.error.js";
import { Instance } from "./oaklang.instance.js";
import { OakArray } from "./oaklang.array.js";
import nodes from "./oaklang.nodes.impl.js"

/**
 * Clase que representa una clase en OakLang. Hereda de Callable y define el comportamiento de una clase, incluyendo propiedades y la capacidad de invocación.
 */
export class OakClass extends Callable {
    /**
     * Crea una nueva instancia de OakClass.
     * 
     * @param {Object} type - El tipo de la clase, que incluye información como el nombre y el nivel de arrays.
     * @param {Array} properties - Las propiedades de la clase, cada una con un nombre y tipo.
     */
    constructor(type, properties) {
        super()
        // type{ type, arrayLevel: arrayLevel.length }, name }
        /** @type {Object} */
        this.type = type
        /** @type {Array} */
        this.properties = properties
    }

    /**
     * Devuelve la cantidad de propiedades de la clase.
     * 
     * @returns {number} La cantidad de propiedades en la clase.
     */
    arity() {
        return this.properties.length
    }

    /**
     * Recupera una propiedad de la clase por su nombre.
     * 
     * @param {string} name - El nombre de la propiedad que se busca.
     * @returns {Object|undefined} La propiedad encontrada o `undefined` si no existe.
     */
    getProperty(name) {
        return this.properties.find((prop) => prop.name == name )
    }

    // args[{ id, expression }] las expresiones pueden considerarse "interpretadas" asi que podemos asumir un tipo y valor final
    /**
     * Invoca la clase OakLang con los argumentos proporcionados, verificando que los tipos y cantidades coincidan con las propiedades.
     * 
     * @param {Object} interpreter - El intérprete que ejecuta el código.
     * @param {Array} args - Los argumentos pasados a la clase, con valores y tipos.
     * @param {Object} location - La ubicación en el código para la gestión de errores.
     * @throws {OakError} Si el número o tipo de argumentos no coincide con las propiedades de la clase.
     * @returns {Instance} La instancia de la clase creada con los valores de argumentos proporcionados.
     */
    invoke(interpreter, args, location) {
        // 1. check all args list is same size as props
        if(this.arity() < args.length) throw new OakError(location, `args are more than expected`)
        if(this.arity() > args.length) throw new OakError(location, `provide all properties a value`)
        // 3. return
        return this.createInstance(interpreter, args)
    }

    /**
     * Crea una nueva instancia de la clase con los valores proporcionados.
     * 
     * @param {Object} interpreter - El intérprete que ejecuta el código.
     * @param {Array} args - Los argumentos pasados a la clase, con valores y tipos.
     * @param {Object} location - La ubicación en el código para la gestión de errores.
     * @throws {OakError} Si el tipo o el valor de las propiedades no coincide con las expectativas de la clase.
     * @returns {Instance} La instancia de la clase creada.
     */
    createInstance(interpreter, args, location) {
        const instance = new Instance(this, this.type)

        // iterate to see if name and type is correct to ASSIGN properties a value
        args.forEach((arg) => {
            const assignee = this.properties.find((prop) => prop.name == arg.id)

            if(!assignee) throw new OakError(arg.value.location, `property name ${arg.id} doesnt exists`)
            
            const expectedNode = assignee.type
            const valueNode = arg.value

            if(valueNode == undefined) throw new OakError(location, `invalid assignment expression `)

            // 1. check if a class was declared previously, will need it later
            const structDef = interpreter.environment.get(expectedNode.type)

            const isNullValid = structDef instanceof OakClass

            // check if its an array, check is same type and size of array
            if(expectedNode.arrayLevel > 0) {
                const expectedDeep = "[]".repeat(expectedNode.arrayLevel)

                if(valueNode instanceof OakArray) {
                    const foundDeep = "[]".repeat(arg.value.deep)

                    if(valueNode.deep == expectedNode.arrayLevel) {
                        if(expectedNode.type == valueNode.type) {
                            instance.setProperty(assignee.name, valueNode)
                            return
                        }

                        if(expectedNode.type != valueNode.type && valueNode.type != 'null') {
                            throw new OakError(location, `invalid type, expected ${expectedNode.type+expectedDeep} but found ${valueNode.type+foundDeep} `)   
                        }

                        /** 
                         * special case array is size 0, array type will be null but 
                         * since it can not infer its type but is safe, this is how
                         * we know array is size 0
                         */ 
                        if(valueNode.type == 'null') {
                            if(valueNode.size > 0) {
                                
                            }

                            function checkListIsEmpty(item) {
                                if(item instanceof OakArray) {
                                    for(let a = 0; a< item.size; a += 1) {
                                        if (!checkListIsEmpty(item.get(a))) {
                                            return false
                                        }
                                    }   
                                }

                                // not empty
                                return !(item instanceof nodes.Literal)
                            }

                            for(let i = 0; i < valueNode.size; i += 1) {
                                const isEmpty = checkListIsEmpty(valueNode.get(i))
                                if(!isEmpty) {
                                    if(!isNullValid) {
                                        throw new OakError(location, `invalid type, expected ${expectedNode.type+expectedDeep} but found ${valueNode.type+foundDeep} `)   
                                    }   
                                }
                            }

                            
                        }

                        valueNode.type = expectedNode.type
                        instance.setProperty(assignee.name, valueNode)
                        return
                    }

                    throw new OakError(location, `expected ${expectedNode.type+expectedDeep} but found ${valueNode.type+foundDeep} `)
                }

                throw new OakError(location, `expected ${expectedNode.type+expectedDeep} but ${arg.value.type} found `)
            }

            if(valueNode.deep !== undefined) {
                const foundDeep = "[]".repeat(valueNode.deep)
                throw new OakError(location, `expected ${expectedNode.type} but ${valueNode.type+foundDeep} found `)
            }

            if(valueNode.type == 'null' && isNullValid) {
                valueNode.type = expectedNode.type
                instance.setProperty(assignee.name, valueNode)
                return
            }
    
            // this meand different types of objects
            if(expectedNode.type == valueNode.type && isNullValid) {
                instance.setProperty(assignee.name, valueNode)
                return
            }

            // this means different objects
            if(expectedNode.type != valueNode.type && isNullValid) {
                throw new OakError(location, `expected ${expectedNode.type} but ${valueNode.type} found `)
            }
    
            const left = interpreter.specialTypes[expectedNode.type]
            const right = interpreter.specialTypes[valueNode.type]
    
            // means is either booelan or char, we can just assign if equals without seeing if int fits in float
            if(left == right && left != 'string' && left != undefined) {
                instance.setProperty(assignee.name, valueNode)
                return
            }
    
            // const type = interpreter.calculateType(expectedNode.type, valueNode.type, location)
            // // means is a string, int or float
            // if (expectedNode.type == type || (expectedNode.type == 'float' && type == 'int')) {
            //     const value = new nodes.Literal({type, value: valueNode.value})
            //     instance.set(assignee.name, value)
            //     return
            // }

            if (expectedNode.type == valueNode.type) {
                instance.setProperty(assignee.name, valueNode)
                return
            }
    
            if (expectedNode.type == 'float' && valueNode.type == 'int') {
                const value = new nodes.Literal({type: 'float', value: valueNode.value})
                instance.setProperty(assignee.name, value)
                return
            }
    
            throw new OakError(location, `invalid type, expected ${expectedNode.type} but found ${valueNode.type} `)

        })

        return instance
    }
}