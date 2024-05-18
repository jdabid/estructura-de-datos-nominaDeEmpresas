const readlineSync = require('readline-sync');

let totales = 0;
let empleadoMasCuesta = 0;
let totalPasajes = 0;
let totalSecundaria = 0;

class Empleado {
    #nombreEmpleado = '';
    #salario = 0;
    #estrato = 0;
    #rural = 1;
    #extranjero = 1;
    #hijos = 1;
    #genero = 1;

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

    set genero(nuevogenero){
        this.#genero = nuevogenero;
    }
    get genero(){
        return this.#genero;
    }

    constructor(nombreEmpleado, salario, estrato, rural, extranjero, hijos, genero){
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
        if(genero < 1 || genero > 2){
            throw new Error('Recuerda que el campo genero debe ser 1(Hombre)-2(Mujer)');
        }

        this.#nombreEmpleado = nombreEmpleado;
        this.#salario = salario;
        this.#estrato = estrato;
        this.#rural = rural;
        this.#extranjero = extranjero;
        this.#hijos = hijos;
        this.#genero = genero;
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
                    nodoTmp.valor.salarioEstrato1 = (nodoTmp.valor.salario * 0.15);
                    //console.log(`El salario del empleado ${nodoTmp.valor.nombreEmpleado} con subsidop por estrato 1 es: ${nodoTmp.valor.salarioEstrato1}`);
                    console.log(`El subsidop por estrato 1 del empleado ${nodoTmp.valor.nombreEmpleado} es: ${nodoTmp.valor.salarioEstrato1}`);
                    console.dir(`**********************************************************`);
                    salarioEstrato1 += nodoTmp.valor.salario + nodoTmp.valor.salarioEstrato1;
                }
                else if(nodoTmp.valor.estrato == 2){
                    nodoTmp.valor.salarioEstrato2 = (nodoTmp.valor.salario * 0.10);
                    console.log(`El subsidop por estrato 2 del empleado ${nodoTmp.valor.nombreEmpleado} es: ${nodoTmp.valor.salarioEstrato2}`);
                    console.dir(`**********************************************************`);
                    salarioEstrato2 += nodoTmp.valor.salario + nodoTmp.valor.salarioEstrato2;
                }
                else if(nodoTmp.valor.estrato == 3){
                    nodoTmp.valor.salarioEstrato3 = (nodoTmp.valor.salario * 0.05);
                    console.log(`El subsidop por estrato 3 del empleado ${nodoTmp.valor.nombreEmpleado} es: ${nodoTmp.valor.salarioEstrato3}`);
                    console.dir(`**********************************************************`);
                    salarioEstrato3 += nodoTmp.valor.salario + nodoTmp.valor.salarioEstrato3;
                }
                else {
                    console.log(`El empleado ${nodoTmp.valor.nombreEmpleado} no tiene subsidio por concepto de estrato`);
                    totalNominaSubsidioEstrato += nodoTmp.valor.salario;
                }

                nodoTmp = nodoTmp.siguiente;
                i++;
            }totalNominaSubsidioEstrato += salarioEstrato1 + salarioEstrato2 + salarioEstrato3;
            console.log(`La nomina total de todos los empleados con subsidio por estrato es: ${totalNominaSubsidioEstrato}`);
            console.dir(`**********************************************************`);
            totales = totales + totalNominaSubsidioEstrato;
            
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
                    nodoTmp.valor.salarioSiRural = 35000;
                    console.log(`El subsidop rural del empleado ${nodoTmp.valor.nombreEmpleado} es: ${nodoTmp.valor.salarioSiRural}`);
                    salarioSiRural += nodoTmp.valor.salarioSiRural;
                }
                else {
                    console.log(`El empleado ${nodoTmp.valor.nombreEmpleado} no vive en zona rural`);
                    totalNominaSubsidioRural += nodoTmp.valor.salario + nodoTmp.valor.salarioSiRural;
                }

                nodoTmp = nodoTmp.siguiente;
                i++;
            }totalNominaSubsidioRural += salarioSiRural;
            console.log(`La nomina total de todos los empleados con subsidio rural es: ${totalNominaSubsidioRural}`);
            console.dir(`**********************************************************`);
            totales = totales + totalNominaSubsidioRural;
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
                    nodoTmp.valor.salarioSiExtranjero = 200000;
                    console.log(`El subsidio por extranjero del empleado ${nodoTmp.valor.nombreEmpleado} es: ${nodoTmp.valor.salarioSiExtranjero}`);
                    salarioSiExtranjero += nodoTmp.valor.salario + nodoTmp.valor.salarioSiExtranjero;
                }
                else {
                    console.log(`El empleado ${nodoTmp.valor.nombreEmpleado} no es extranjero`);
                    totalNominaSubsidioExtranjero += nodoTmp.valor.salario;
                }

                nodoTmp = nodoTmp.siguiente;
                i++;
            }totalNominaSubsidioExtranjero += salarioSiExtranjero;
            console.log(`La nomina total de todos los empleados con subsidio por concepto extranjero es: ${totalNominaSubsidioExtranjero}`);
            console.dir(`**********************************************************`);
            totales = totales + totalNominaSubsidioExtranjero;
            totalPasajes = totalPasajes + totalNominaSubsidioExtranjero;
        }
    }

    //hombre - mujere
    calcularSalarioHombreMujer(){
        let salarioHombre = 0;
        let salarioMujer = 0;
        let totalNominaSalarioHombre = 0;
        let totalNominaSalarioMujer = 0;

        if(this.cabeza == null){
            console.log(`No hay empleados para mostrar, no hay nodos en la lista`);
        }
        else {
            let nodoTmp = this.cabeza;
            let i = 1;
            while(nodoTmp != null){
                if(nodoTmp.valor.genero == 1){
                    nodoTmp.valor.salarioHombre = nodoTmp.valor.salario;
                    console.log(`El salario hombre es: ${nodoTmp.valor.salarioHombre}`);
                    salarioHombre += nodoTmp.valor.salarioHombre;
                    
                }
                else {
                    nodoTmp.valor.salarioMujer = nodoTmp.valor.salario;
                    console.log(`El salario mujer es: ${nodoTmp.valor.salarioMujer}`);
                    salarioMujer += nodoTmp.valor.salarioMujer;
                    
                }

                nodoTmp = nodoTmp.siguiente;
                i++;
            }
            totalNominaSalarioHombre += salarioHombre;
            totalNominaSalarioMujer += salarioMujer;
            console.log(`La nomina total de todos los hombres es: ${totalNominaSalarioHombre}`);
            console.dir(`**********************************************************`);
            console.log(`La nomina total de todas las mujeres es: ${totalNominaSalarioMujer}`);
            console.dir(`**********************************************************`);
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
                        nodoTmp.valor.salarioPrimariaX = (nodoTmp.valor.cantidadPrimaria * 1000);
                        console.log(`El subsidio por estudiante primaria del empleado ${nodoTmp.valor.nombreEmpleado} es: ${nodoTmp.valor.salarioPrimariaX}`);
                        salarioPrimariaX += nodoTmp.valor.salario + nodoTmp.valor.salarioPrimariaX;
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
                            nodoTmp.valor.salarioSecundariaZ = (nodoTmp.valor.cantidadSecundaria * 2000);
                            console.log(`El subsidio por estudiante secundaria del empleado ${nodoTmp.valor.nombreEmpleado} es: ${nodoTmp.valor.salarioSecundariaZ}`);
                            salarioSecundariaZ += nodoTmp.valor.salario + nodoTmp.valor.salarioSecundariaZ;                        
                        }

                        if ((cantidadHijosEstudian - cantidadPrimaria - cantidadSecundaria) == 0) {
                            console.log('El empleado NO tiene hijos en universidad');                            
                        } else {
                            console.dir('El empleado SI tiene hijos en universidad');
                            cantidadUniversidad = (cantidadHijosEstudian - cantidadPrimaria - cantidadSecundaria);
                            console.dir(`La cantidad de hijos en universidad es: ${cantidadUniversidad}`);
                            nodoTmp.valor.cantidadUniversidad = cantidadUniversidad;
                            nodoTmp.valor.salarioUniversidadY = (nodoTmp.valor.cantidadUniversidad * 3000);
                            console.log(`El subsidio por estudiante universidad del empleado ${nodoTmp.valor.nombreEmpleado} es: ${nodoTmp.valor.salarioUniversidadY}`);
                            salarioUniversidadY += nodoTmp.valor.salario + nodoTmp.valor.salarioUniversidadY;                            
                        }                                                    
                    }
                }
                nodoTmp = nodoTmp.siguiente;
                i++;
            }totalNominaSubsidioTieneHijos += salarioPrimariaX + salarioSecundariaZ + salarioUniversidadY;
            console.log(`La nomina total de todos los empleados con subsidio por escolaridad es: ${totalNominaSubsidioTieneHijos}`);
            totales = totales + totalNominaSubsidioTieneHijos;
            totalSecundaria = totalSecundaria + salarioSecundariaZ;
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
    

    
}



const listaEmpleados = new ListaEmpleados();

let continuar = true;
while(continuar){
    const nombreEmpleado = readlineSync.question('****** Ingrese el nombre del empleado: ');
    const salario = +readlineSync.question('Ingrese el salario del empleado: ');
    const estrato = +readlineSync.question('Ingrese el estrato del empleado: ');
    const rural = readlineSync.question('El empleado vive en zona rural? (s(1)/n(2)): ');
    const extranjero = readlineSync.question('El empleado es extranjero? 1(SI)-2(NO): ');
    const genero = readlineSync.question('El empleado es hombre o mujer? 1(Hombre)-2(Mujer): ');
    const hijos = readlineSync.question('El empleado tiene hijos que estudien? 1(SI)-2(NO): ***************** ');
    

    const empleado = new Empleado(nombreEmpleado, salario, estrato, rural, extranjero, hijos, genero);
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
listaEmpleados.calcularSalarioHombreMujer();
listaEmpleados.subsidioTieneHijos();
console.log(`El total de la nomina con todos los items anteriores es: ${totales}`);
console.log(`El total de los pasajes que gasta la empresa es: ${totalPasajes}`);
console.log(`El total de subsidio secundaria es: ${totalSecundaria}`);
