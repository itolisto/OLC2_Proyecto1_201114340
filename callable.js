export class Callable {

    arity() {
        throw new Error('arity not implemented');
    }

    /*
     * "interpreter" es una referencia a la instancia del Interpreter que usamos para parsear los nodos,
     * la propiedad "args" son los argumentos de la funcion que se va a ejecutar.
     */
    invoke({interpreter, args}) {
        throw new Error('invoke not implemented');
    }
}