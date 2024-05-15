const readlineSync = require('readline-sync');

class Empleado {
    #nombreEmpleado = '';
    #salario = 0;
    #estrato = 0;
    #rural = 1;

    set nombreEmpleado(nuevonombreEmpleado){
        this.#nombreEmpleado = nuevonombreEmpleado;
    }
    get nombreEmpleado(){
        return this.#nombreEmpleado;
    }

    set salario(nuevosalario){
        this.#salario = nuevosalario;
    }
    get salario(){
        return this.#salario;
    }

    set estrato(nuevoestrato){
        this.#estrato = nuevoestrato;
    }
    get estrato(){
        return this.#estrato;
    }

    set rural(nuevorural){
        this.#rural = nuevorural;
    }
    get rural(){
        return this.#rural;
    }

    constructor(nombreEmpleado, salario, estrato, rural){
        if(nombreEmpleado == undefined){
            throw new Error('El nombre del empleado es requerido');}

        if(salario < 1 || isNaN(salario)){
            throw new Error('Recuerda el salario del empleado no puede ser 0 o un valor negativo');}

        if(estrato < 1 || estrato > 6 || isNaN(estrato)){
            throw new Error('Recuerda que el estrato debe ser un valor numerico entre 1 y 6');
        }
        if(rural < 1 || rural > 2){
            throw new Error('Recuerda que el campo rural debe ser si(1)/no(2)');
        }
        this.#nombreEmpleado = nombreEmpleado;
        this.#salario = salario;
        this.#estrato = estrato;
        this.#rural = rural;
    }
}

class NodoEmpleado {
    valor = null;
    siguiente = null;
}

class ListaEmpleados {
    cabeza = null;

    insertar(empleado){
        const nuevoNodo = new NodoEmpleado();
        nuevoNodo.valor = empleado;

        if(this.cabeza === null){
            this.cabeza = nuevoNodo;
        } else {
            let nodoTmp = this.cabeza;
            while(nodoTmp.siguiente !== null){
                nodoTmp = nodoTmp.siguiente;
            }
            nodoTmp.siguiente = nuevoNodo;
        }
    }

    mostrarTodosLosEmpleados(){
        if(this.cabeza == null){
            console.log(`No hay empleados para mostrar, no hay nodos en la lista`);
        }
        else {
            let nodoTmp = this.cabeza;
            let i = 1;
            while(nodoTmp != null){
                console.log(`Datos del empleado numero ${i}`);
                console.log(`Nombre: ${nodoTmp.valor.nombreEmpleado}:`);
                console.log(`Salario: ${nodoTmp.valor.salario}:`);
                console.log(`Estrato: ${nodoTmp.valor.estrato}:`);
                console.log(`Rural: ${nodoTmp.valor.rural}:`);
                nodoTmp = nodoTmp.siguiente;
                i++;
            }
        }
    }

    nominaTotlaItems(){
        if(this.cabeza == null){
            console.log(`No hay empleados para mostrar, no hay nodos en la lista`);
        }
        else {
            let nodoTmp = this.cabeza;
            let i = 1;
            let totalNomina = 0;
            while(nodoTmp != null){
                totalNomina += nodoTmp.valor.salario;
                nodoTmp = nodoTmp.siguiente;
                i++;
            }
            console.log(`La nomina total de todos los empleados es: ${totalNomina}`);
        }
    }

    subsidioEstrato(){
        let salarioEstrato1 = 0;
        let salarioEstrato2 = 0;
        let salarioEstrato3 = 0;
        let totalNominaSubsidioEstrato = 0;

        if(this.cabeza == null){
            console.log(`No hay empleados para mostrar, no hay nodos en la lista`);
        }
        else {
            let nodoTmp = this.cabeza;
            let i = 1;
            while(nodoTmp != null){
                if(nodoTmp.valor.estrato == 1){
                    //nodoTmp.valor.salarioEstrato1 = nodoTmp.valor.salario * 0.15;
                    nodoTmp.valor.salarioEstrato1 = nodoTmp.valor.salario + (nodoTmp.valor.salario * 0.15);
                    console.log(`El salario del empleado ${nodoTmp.valor.nombreEmpleado} con subsidop por estrato 1 es: ${nodoTmp.valor.salarioEstrato1}`);
                    salarioEstrato1 += nodoTmp.valor.salarioEstrato1;
                }
                else if(nodoTmp.valor.estrato == 2){
                    nodoTmp.valor.salarioEstrato2 = nodoTmp.valor.salario + (nodoTmp.valor.salario * 0.10);
                    console.log(`El salario del empleado ${nodoTmp.valor.nombreEmpleado} con subsidop por estrato 2 es: ${nodoTmp.valor.salarioEstrato2}`);
                    salarioEstrato2 += nodoTmp.valor.salarioEstrato2;
                }
                else if(nodoTmp.valor.estrato == 3){
                    nodoTmp.valor.salarioEstrato3 = nodoTmp.valor.salario + (nodoTmp.valor.salario * 0.05);
                    console.log(`El salario del empleado ${nodoTmp.valor.nombreEmpleado} con subsidop por estrato 3 es: ${nodoTmp.valor.salarioEstrato3}`);
                    salarioEstrato3 += nodoTmp.valor.salarioEstrato3;
                }
                else {
                    console.log(`El empleado ${nodoTmp.valor.nombreEmpleado} no tiene subsidio por concepto de estrato`);
                    totalNominaSubsidioEstrato += nodoTmp.valor.salario;
                }

                nodoTmp = nodoTmp.siguiente;
                i++;
            }totalNominaSubsidioEstrato += salarioEstrato1 + salarioEstrato2 + salarioEstrato3;
            console.log(`La nomina total de todos los empleados con subsidio por estrato es: ${totalNominaSubsidioEstrato}`);
        }
    }

    subsidioRural(){
        let salarioSiRural = 0;
        let totalNominaSubsidioRural = 0;

        if(this.cabeza == null){
            console.log(`No hay empleados para mostrar, no hay nodos en la lista`);
        }
        else {
            let nodoTmp = this.cabeza;
            let i = 1;
            while(nodoTmp != null){
                if(nodoTmp.valor.rural == 1){
                    nodoTmp.valor.salarioSiRural = nodoTmp.valor.salario + 35000;
                    console.log(`El salario del empleado ${nodoTmp.valor.nombreEmpleado} con subsidop rural es: ${nodoTmp.valor.salarioSiRural}`);
                    salarioSiRural += nodoTmp.valor.salarioSiRural;
                }
                else {
                    console.log(`El empleado ${nodoTmp.valor.nombreEmpleado} no vive en zona rural`);
                    totalNominaSubsidioRural += nodoTmp.valor.salario;
                }

                nodoTmp = nodoTmp.siguiente;
                i++;
            }totalNominaSubsidioRural += salarioSiRural;
            console.log(`La nomina total de todos los empleados con subsidio rural es: ${totalNominaSubsidioRural}`);
        }
    }
}

const listaEmpleados = new ListaEmpleados();

let continuar = true;
while(continuar){
    const nombreEmpleado = readlineSync.question('Ingrese el nombre del empleado: ');
    const salario = +readlineSync.question('Ingrese el salario del empleado: ');
    const estrato = +readlineSync.question('Ingrese el estrato del empleado: ');
    const rural = readlineSync.question('El empleado vive en zona rural? (s(1)/n(2)): ');

    const empleado = new Empleado(nombreEmpleado, salario, estrato, rural);
    listaEmpleados.insertar(empleado);

    const respuesta = readlineSync.question('Desea agregar otro empleado? (s/n): ');
    if(respuesta === 'n'){
        continuar = false;
    }
}

listaEmpleados.mostrarTodosLosEmpleados();
listaEmpleados.nominaTotlaItems();
listaEmpleados.subsidioEstrato();
listaEmpleados.subsidioRural();



