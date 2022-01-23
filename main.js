class cuenta {
    constructor(titular, contraseña, saldo) {
        this.titular = titular;
        this.contraseña = contraseña;
        this.saldo = saldo;
    }
    getTitular() {
        return this.titular;
    }
    getContraseña() {
        return this.contraseña;
    }
    getSaldo() {
        return this.saldo;
    }
    verificarContraseña(contraseña) {
        if (this.contraseña == contraseña) {
            return true;
        }
        else {
            return false;
        }
    }
    ingrsearMonto(monto) {
        let nuevoSaldo = this.saldo + monto;
        if (nuevoSaldo < 990) {
            this.saldo = nuevoSaldo;
            return true;
        }
        else {
            return false;
        }
    }
    retirarMonto(monto) {
        let nuevoSaldo = this.saldo - monto;
        let mensaje;
        if (nuevoSaldo > 10) {
            this.saldo = nuevoSaldo;
            return true;
        }
        else {
            return false;
        }
    }
}
let cuenta1 = new cuenta("Estéfany", "arigato", 230);
let cuenta2 = new cuenta("Juan", "jumacapy", 560);
let cuenta3 = new cuenta("Betty", "bevegran", 759);
let cuentas = [cuenta1, cuenta2, cuenta3];

//Pasa de donde estan las cuentas a la parte donde te pide la contraseña
function pasarPassword(idCuenta) {
    //Desaparezca las cuentas
    let cuentasContenedor = document.getElementById("cuentas-contenedor");
    cuentasContenedor.style.display = "none";
    //Aparezca donde pide la contraseña
    let password = document.getElementById("password");
    password.style.display = "block";
    //Conseguimos el nombre del titular
    let idTitular = idCuenta + "-titular";
    let cuentaSeleccionada = document.getElementById(idTitular);
    let titular = cuentaSeleccionada.innerText;
    document.getElementById("nombre-titular").value = titular;
    let indice=obtenerIndice();
    console.log(cuentas[indice].getContraseña());
}
//Obtiene el índice de la cuenta con la que se está trabajando
function obtenerIndice(){
    let titular = document.getElementById("nombre-titular").value;
    let indice;
    for (let i = 0; i < 3; i++) {
        if (cuentas[i].getTitular() == titular) {
            indice = i;
            break;
        }
    }
    return indice;
}
//Verifica si la contraseña ingresada por el usuario es correcta
function evaluarContraseña() {
    let indice=obtenerIndice();
    let contraseñaIngresada = document.getElementById("contraseña").value;
    if (cuentas[indice].verificarContraseña(contraseñaIngresada)) {
        document.getElementById("password").style.display = "none";
        document.getElementById("opciones-cuenta").style.display = "block";
        //
        document.getElementById("contraseña").value = "";
    }
    else {
        alert("Contraseña incorrecta")
        document.getElementById("contraseña").value = "";
    }
}
//Permite al usuario consultar su saldo
function consultarSaldo() {
    document.getElementById("opciones-cuenta").style.display = "none";
    document.getElementById("saldo-cuenta").style.display = "block";
    let indice=obtenerIndice();
    let saldo = cuentas[indice].getSaldo();
    document.getElementById("saldo-cuenta-actual").value = saldo + " dolares";
}
//Pasa de los botones de opciones a pedir el monto a depositar
function pasarADepositar() {
    document.getElementById("opciones-cuenta").style.display = "none";
    document.getElementById("ingresar-monto").style.display = "block";
}
//Verifica si es posible hacer el deposito, lo hace de ser posible y si no, te permite intentarlo nuevamente
function ingresar() {
    let indice=obtenerIndice();
    let monto = Number(document.getElementById("monto").value);
    if (cuentas[indice].ingrsearMonto(monto)) {
        document.getElementById("ingresar-monto").style.display = "none";
        document.getElementById("informacion-deposito").style.display = "block";
        document.getElementById("monto-depositado").value = monto + " dolares";
        document.getElementById("monto-actual").value = cuentas[indice].getSaldo() + " dolares";
        //
        document.getElementById("monto").value = "";
    }
    else {
        alert("Operación denegada, supera los 990 dolares");
        document.getElementById("monto").value = "";
    }
}
//Pasa de los botones de opciones a pedir el monto a retirar
function pasarARetirar() {
    document.getElementById("opciones-cuenta").style.display = "none";
    document.getElementById("retirar-monto").style.display = "block";
}
//Verifica si es posible hacer el retiro, lo hace de ser posible y si no, te permite intentarlo nuevamente
function retirar() {
    let indice=obtenerIndice();
    let monto = Number(document.getElementById("monto-retirar").value);
    if (cuentas[indice].retirarMonto(monto)) {
        document.getElementById("retirar-monto").style.display = "none";
        document.getElementById("informacion-retiro").style.display = "block";
        document.getElementById("monto-retirado").value = monto + " dolares";
        document.getElementById("monto-despues-retiro").value = cuentas[indice].getSaldo() + " dolares";
        //
        document.getElementById("monto-retirar").value = "";
    }
    else {
        alert("Operación denegada, queda menos de 10 dolares");
        document.getElementById("monto-retirar").value = "";
    }
}
//--------------------------------
function obtenerIndiceActivo(){
    let divContenedor=document.getElementsByClassName("contenedor");
    for(let i=0;i<divContenedor.length;i++){
        if(divContenedor[i].style.display=="block"){
            indice=i;
            break;
        }
    }
    return indice;
}
function regresarCuentas(){
    let divContenedor=document.getElementsByClassName("contenedor");
    let indice=obtenerIndiceActivo();
    divContenedor[indice].style.display="none";
    document.getElementById("cuentas-contenedor").style.display="flex";
}
function regresarOpcionesCuenta(){
    let divContenedor=document.getElementsByClassName("contenedor");
    let indice=obtenerIndiceActivo();
    divContenedor[indice].style.display="none";
    document.getElementById("opciones-cuenta").style.display="block";
}
