const select = document.getElementById("categoria");
const lblError = document.getElementById('error');
const lblTotalAPagar = document.getElementById('cantTotal');
const $elementos = document.querySelectorAll(".previeneEnvio");

//funcion que valida que todos los campos esten completos sino da un aviso de error para verificar datos
function validaCampos() {
    let campovacio = false;

    $elementos.forEach(elemento => {
        if (elemento.value == '' && (elemento.type == 'text' || elemento.type == 'number' || elemento.type == 'email')) {
            elemento.classList.add("border-danger", 'border-3');
            campovacio = true;
            return false;
        }
        else if (elemento.type == 'email' && elemento.validity.typeMismatch) {
            //esta validacion no es muy buena, no reconoce la 'Ñ' y no valida que termine con el dominio correcto ni verifica que la cuenta exista
            elemento.classList.add('border-danger', 'border-3')
            campovacio = true
        }
        else if(elemento.type == 'number' && elemento.value<0){
            campovacio = true
            elemento.classList.add('border-danger', 'border-3')
        }
        else {
            elemento.classList.remove('border-danger')
            elemento.classList.add('border-success', 'border-3')
        }

    });
    if (campovacio) {
        lblError.innerHTML = "VERIFICAR TODOS LOS DATOS!"
        lblTotalAPagar.innerHTML = "";
    }
    else {
        lblError.innerHTML = "";
        calculaTotal();
    }
    return campovacio;
}
//________________________________________________________________________________________________________________________________

//funcion que calcula el total segun categoria y solo si todos los campos fueron validados correctamente
function calculaTotal() {
    let descuento = 0;
    let totalAPagar = 0;
    let precioTickets = 200;
    let cantTickets = document.getElementById('cantTickets').value;
    switch (select.selectedIndex) {
        case 0:
            //Opcion General sin descuento
            totalAPagar = precioTickets * cantTickets - ((precioTickets * cantTickets) * descuento);
            break;
        case 1:
            //Opcion Estudiante con descuento del 80%
            descuento = 0.8;
            totalAPagar = precioTickets * cantTickets - ((precioTickets * cantTickets) * descuento);
            break;
        case 2:
            //Opcion Trainee con descuento del 50%
            descuento = 0.5;
            totalAPagar = precioTickets * cantTickets - ((precioTickets * cantTickets) * descuento);
            break;
        case 3:
            //Opcion Junior con descuento del 15%
            descuento = 0.15;
            totalAPagar = precioTickets * cantTickets - ((precioTickets * cantTickets) * descuento);
            break;
        case defaul:
            //Opcion Estudiante break;
            document.getElementById('error').innerHTML = "ERROR GENERAL, CONTACTARSE CON EL PROGRAMADOR"
    }
    lblTotalAPagar.innerHTML = totalAPagar;
}
//________________________________________________________________________________________________________________________________

//previeneEnvio prohive el envio del formulario con la tecla enter
$elementos.forEach(elemento => {
    elemento.addEventListener("keydown", (evento) => {
        if (evento.key == "Enter") {
            // Prevenir
            evento.preventDefault();
            return false;
        }
    });
});
//________________________________________________________________________________________________________________________________
