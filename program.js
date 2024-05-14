const readlineSync = require('readline-sync');

/*const userName = readlineSync.question('May I have your name? ');
console.log(`Hi ${userName}!`);*/

class Empleado {
    nombreEmpleado = '';
    salario = 0;
    estrato = 0;
    //rural = false;
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

        if(this.cabeza == null){
            console.log(`No hay empleados para mostrar, no hay nodos en la lista`);
        }
        else {
            let nodoTmp = this.cabeza;
            let i = 1;
            while(nodoTmp != null){
                if(nodoTmp.valor.estrato === 1){
                    nodoTmp.valor.salarioEstrato1 = nodoTmp.valor.salario * 0.15;
                    console.log(`El salario del empleado ${nodoTmp.valor.nombreEmpleado} con estrato 1 es: ${nodoTmp.valor.salarioEstrato1}`);
                }
                else if(nodoTmp.valor.estrato === 2){
                    nodoTmp.valor.salarioEstrato2 = nodoTmp.valor.salario * 0.10;
                    console.log(`El salario del empleado ${nodoTmp.valor.nombreEmpleado} con estrato 2 es: ${nodoTmp.valor.salarioEstrato2}`);
                }
                else if(nodoTmp.valor.estrato === 3){
                    nodoTmp.valor.salarioEstrato3 = nodoTmp.valor.salario * 0.05;
                    console.log(`El salario del empleado ${nodoTmp.valor.nombreEmpleado} con estrato 3 es: ${nodoTmp.valor.salarioEstrato3}`);
                }
                else {
                    console.log(`El empleado ${nodoTmp.valor.nombreEmpleado} no tiene subsidio por concepto de estrato`);
                }
                nodoTmp = nodoTmp.siguiente;
                i++;
            }
        }
    }

    
}

const listaEmpleados = new ListaEmpleados();

const empleado1 = new Empleado();
empleado1.nombreEmpleado = 'Pepe';
empleado1.salario = 10000;
empleado1.estrato = 1;
listaEmpleados.insertar(empleado1);

const empleado2 = new Empleado();
empleado2.nombreEmpleado = 'Pedro';
empleado2.salario = 20000;
empleado2.estrato = 6;
listaEmpleados.insertar(empleado2);

const empleado3 = new Empleado();
empleado3.nombreEmpleado = 'Juan';
empleado3.salario = 3000;
empleado3.estrato = 3;
listaEmpleados.insertar(empleado3);

listaEmpleados.mostrarTodosLosEmpleados();
//listaEmpleados.mostrarEmpleadoConMenorSalario();
//listaEmpleados.nominaTotlaItems();
listaEmpleados.subsidioEstrato();
//listaEmpleados.subsidioEstrato();



