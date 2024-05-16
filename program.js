const readlineSync = require('readline-sync');

class Empleado {
    #nombreEmpleado = '';
    #salario = 0;
    #estrato = 0;
    #rural = 1;
    #extranjero = 1;
    #hijos = 1;

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

    set extranjero(nuevoextranjero){
        this.#extranjero = nuevoextranjero;        
    }
    get extranjero(){
        return this.#extranjero;
    }

    set hijos(nuevoshijos){
        this.#hijos = nuevoshijos;
    }
    get hijos(){
        return this.#hijos;
    }

    constructor(nombreEmpleado, salario, estrato, rural, extranjero, hijos){
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
        if(extranjero < 1 || extranjero > 2){
            throw new Error('Recuerda que el campo extranjero debe ser si(1)/no(2)');
        }
        if(hijos < 1 || hijos > 2){
            throw new Error('Recuerda que el campo hijos debe ser 1(SI)-2(NO)');
        }

        this.#nombreEmpleado = nombreEmpleado;
        this.#salario = salario;
        this.#estrato = estrato;
        this.#rural = rural;
        this.#extranjero = extranjero;
        this.#hijos = hijos;
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
                console.log(`Extranjero: ${nodoTmp.valor.extranjero}:`);
                console.log(`Hijos: ${nodoTmp.valor.hijos}:`);
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

    subsidioExtranjero(){
        let salarioSiExtranjero = 0;
        let totalNominaSubsidioExtranjero = 0;

        if(this.cabeza == null){
            console.log(`No hay empleados para mostrar, no hay nodos en la lista`);
        }
        else {
            let nodoTmp = this.cabeza;
            let i = 1;
            while(nodoTmp != null){
                if(nodoTmp.valor.extranjero == 1){
                    nodoTmp.valor.salarioSiExtranjero = nodoTmp.valor.salario + 200000;
                    console.log(`El salario del empleado ${nodoTmp.valor.nombreEmpleado} con subsidop extranjero es: ${nodoTmp.valor.salarioSiExtranjero}`);
                    salarioSiExtranjero += nodoTmp.valor.salarioSiExtranjero;
                }
                else {
                    console.log(`El empleado ${nodoTmp.valor.nombreEmpleado} no es extranjero`);
                    totalNominaSubsidioExtranjero += nodoTmp.valor.salario;
                }

                nodoTmp = nodoTmp.siguiente;
                i++;
            }totalNominaSubsidioExtranjero += salarioSiExtranjero;
            console.log(`La nomina total de todos los empleados con subsidio por concepto extranjero es: ${totalNominaSubsidioExtranjero}`);
        }
    }

    subsidioTieneHijos(){
        let salarioPrimariaX = 0;
        let salarioSecundariaZ = 0;
        let salarioUniversidadY = 0;
        let totalNominaSubsidioTieneHijos = 0;

        let cantidadPrimaria = 0;
        let cantidadSecundaria = 0;
        let cantidadUniversidad = 0;

        if(this.cabeza == null){
            console.log(`No hay empleados para mostrar, no hay nodos en la lista`);
        }
        else {
            let nodoTmp = this.cabeza;
            let i = 1;
            while(nodoTmp != null){

                if (nodoTmp.valor.hijos == 2) {
                    console.log(`El empleado ${nodoTmp.valor.nombreEmpleado} NO tiene hijos que estudian`);
                } else {
                    console.log(`El empleado ${nodoTmp.valor.nombreEmpleado} SI tiene hijos que estudian`);
                    let cantidadHijosEstudian = +readlineSync.question('Ingrese la cantidad de hijos que estudian: ');
                    console.log(`La cantidad de hijos que estudian del empleado ${nodoTmp.valor.nombreEmpleado} es: ${cantidadHijosEstudian}`);
                    let primaria = +readlineSync.question('El empleado tiene hijos en primaria? 1(SI)-2(NO): ');
                    while (primaria < 1 || primaria > 2) {
                        console.log('La respuesta debe ser 1(SI)-2(NO)');
                        primaria = +readlineSync.question('El empleado tiene hijos en primaria? 1(SI)-2(NO): ');                        
                    }
                    if (primaria == 2) {
                        console.dir('El empleado NO tiene hijos en primaria');
                    }else{
                        console.dir('El empleado SI tiene hijos en primaria');
                        cantidadPrimaria = +readlineSync.question('Ingrese la cantidad de hijos en primaria: ');
                        
                        while (cantidadPrimaria > cantidadHijosEstudian) {
                        console.log('La cantidad de hijos en primaria no puede ser mayor a la cantidad de hijos que estudian');
                        cantidadPrimaria = +readlineSync.question('Ingrese la cantidad de hijos en primaria: ');                        
                        }
                        nodoTmp.valor.cantidadPrimaria = cantidadPrimaria;
                         
                        nodoTmp.valor.salarioPrimariaX = nodoTmp.valor.salario + (nodoTmp.valor.cantidadPrimaria * 1000);
                        console.log(`El salario del empleado ${nodoTmp.valor.nombreEmpleado} con subsidio por estudiante primaria es: ${nodoTmp.valor.salarioPrimariaX}`);
                        salarioPrimariaX += nodoTmp.valor.salarioPrimariaX;
                    }
                    if ((cantidadHijosEstudian - cantidadPrimaria) == 0) {
                        console.log('El empleado no tiene hijos en secundaria ni en universidad');                        
                    } else {
                        let secundaria = +readlineSync.question('El empleado tiene hijos en secundaria? 1(SI)-2(NO): ');
                        while (secundaria < 1 || secundaria > 2) {
                            console.log('La respuesta debe ser 1(SI)-2(NO)');
                            secundaria = +readlineSync.question('El empleado tiene hijos en secundaria? 1(SI)-2(NO): ');                        
                        }
                        if (secundaria == 2) {
                            console.dir('El empleado NO tiene hijos en secundaria');
                        }else{
                            console.dir('El empleado SI tiene hijos en secundaria');
                            cantidadSecundaria = +readlineSync.question('Ingrese la cantidad de hijos en secundaria: ');
                            while (cantidadSecundaria > (cantidadHijosEstudian - cantidadPrimaria)) {
                            console.log('La cantidad de hijos en secundaria no puede ser mayor a la cantidad de hijos que estudian');
                            cantidadSecundaria = +readlineSync.question('Ingrese la cantidad de hijos en secundaria: ');                        
                            }
                            nodoTmp.valor.cantidadSecundaria = cantidadSecundaria;
                            nodoTmp.valor.salarioSecundariaZ = nodoTmp.valor.salario + (nodoTmp.valor.cantidadSecundaria * 2000);
                            console.log(`El salario del empleado ${nodoTmp.valor.nombreEmpleado} con subsidio por estudiante secundaria es: ${nodoTmp.valor.salarioSecundariaZ}`);
                            salarioSecundariaZ += nodoTmp.valor.salarioSecundariaZ;                        
                        }

                        if ((cantidadHijosEstudian - cantidadPrimaria - cantidadSecundaria) == 0) {
                            console.log('El empleado NO tiene hijos en universidad');                            
                        } else {
                            console.dir('El empleado SI tiene hijos en universidad');
                            cantidadUniversidad = +readlineSync.question('Ingrese la cantidad de hijos en universidad: ');
                            while (cantidadUniversidad > (cantidadHijosEstudian - cantidadPrimaria - cantidadSecundaria)) {
                                console.log('La cantidad de hijos en universidad no puede ser mayor a la cantidad de hijos que estudian');
                                cantidadUniversidad = +readlineSync.question('Ingrese la cantidad de hijos en universidad: ');
                            }
                            nodoTmp.valor.cantidadUniversidad = cantidadUniversidad;
                            nodoTmp.valor.salarioUniversidadY = nodoTmp.valor.salario + (nodoTmp.valor.cantidadUniversidad * 3000);
                            console.log(`El salario del empleado ${nodoTmp.valor.nombreEmpleado} con subsidio por estudiante universidad es: ${nodoTmp.valor.salarioUniversidadY}`);
                            salarioUniversidadY += nodoTmp.valor.salarioUniversidadY;                            
                        }                                                    
                    }
                }
                nodoTmp = nodoTmp.siguiente;
                i++;
            }totalNominaSubsidioTieneHijos += salarioPrimariaX + salarioSecundariaZ + salarioUniversidadY;
            console.log(`La nomina total de todos los empleados con subsidio por escolaridad es: ${totalNominaSubsidioTieneHijos}`);
        }
    }

    //hombre - mujeres
}



const listaEmpleados = new ListaEmpleados();

let continuar = true;
while(continuar){
    const nombreEmpleado = readlineSync.question('Ingrese el nombre del empleado: ');
    const salario = +readlineSync.question('Ingrese el salario del empleado: ');
    const estrato = +readlineSync.question('Ingrese el estrato del empleado: ');
    const rural = readlineSync.question('El empleado vive en zona rural? (s(1)/n(2)): ');
    const extranjero = readlineSync.question('El empleado es extranjero? 1(SI)-2(NO): ');
    const hijos = readlineSync.question('El empleado tiene hijos que estudien? 1(SI)-2(NO): ');

    const empleado = new Empleado(nombreEmpleado, salario, estrato, rural, extranjero, hijos);
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
listaEmpleados.subsidioExtranjero();
listaEmpleados.subsidioTieneHijos();