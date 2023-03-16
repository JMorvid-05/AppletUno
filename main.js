var numU = 0,
    numD = 0,
    txt = ["¡No se aceptan campos vacíos!", "¡No se permite el 0!"];


function removerCorrecto(letraClase) {
    $("#simbolo" + letraClase).removeClass("fa-check");
    $("#simbolo" + letraClase).removeClass("text-success");
    $("#espacio" + letraClase).removeClass("border-success");
    $("#numero" + letraClase).removeClass("is-valid");
}

function removerExclamacion(letraClase) {
    $("#espacio" + letraClase).removeClass("border-warning");
    $("#simbolo" + letraClase).removeClass("fa-exclamation");
    $("#simbolo" + letraClase).removeClass("text-warning");
    $("#numero" + letraClase).removeClass("border-warning");

}

function removerError(letraClase) {
    $("#simbolo" + letraClase).removeClass("fa-times");
    $("#simbolo" + letraClase).removeClass("text-danger");
    $("#espacio" + letraClase).removeClass("border-danger");
    $("#numero" + letraClase).removeClass("is-invalid");
}

function simboloExclamacion(letraClase) {
    $("#simbolo" + letraClase).addClass("fa-exclamation");
    $("#simbolo" + letraClase).addClass("text-warning");
    $("#espacio" + letraClase).addClass("border-warning");
    $("#numero" + letraClase).addClass("border-warning");
    //$("#btnHallar").prop("disabled", true);
}

function simboloCorrecto(letraClase) {
    $("#simbolo" + letraClase).addClass("fa-check");
    $("#simbolo" + letraClase).addClass("text-success");
    $("#espacio" + letraClase).addClass("border-success");
    $("#numero" + letraClase).addClass("is-valid");
}

function simboloError(letraClase) {
    $("#simbolo" + letraClase).addClass("fa-times");
    $("#simbolo" + letraClase).addClass("text-danger");
    $("#espacio" + letraClase).addClass("border-danger");
    $("#numero" + letraClase).addClass("is-invalid");
}

function calcularProbabilidad(buenos, defectuosos) {
    let mensajes = []
    const total = buenos + defectuosos;
    console.log(buenos,defectuosos);

    // Probabilidad de encontrar el último tubo defectuoso en la segunda prueba
    const prob2 = (defectuosos / total) * ((defectuosos - 1) / (total - 1));
    mensajes.push('Probabilidad de encontrar el último tubo defectuoso en la segunda prueba: ' + prob2.toFixed(2));
    // Probabilidad de encontrar el último tubo defectuoso en la tercera prueba
    const prob3 = (defectuosos / total) * (buenos / (total - 1)) * ((defectuosos - 1) / (total - 2));
    mensajes.push('Probabilidad de encontrar el último tubo defectuoso en la tercera prueba: ' + prob3.toFixed(2));
    // Probabilidad de encontrar el último tubo defectuoso en la cuarta prueba
    const prob4 = (defectuosos / total) * (buenos / (total - 1)) * (buenos - 1) / (total - 2) * ((defectuosos - 1) / (total - 3));
    mensajes.push('Probabilidad de encontrar el último tubo defectuoso en la cuarta prueba: ' + prob4.toFixed(2));
    // Suma de las tres probabilidades
    const suma = prob2 + prob3 + prob4;
    mensajes.push('Probabilidad total de encontrar los dos tubos defectuosos en el lote: ' + suma.toFixed(2));

    for (let i = 0; i < mensajes.length; i++) {
        $(".operaciones").append("<p class='resultado'>" + mensajes[i] + "</p>");

    }
}



//============inicio
simboloExclamacion("U");
simboloExclamacion("D");
$('.msjErrorU').hide();
$('.msjErrorD').hide();



//if ($("#hola").hasClass("msjErrorD")) {

//==================
$("#btnHallar").click(function () {
    numeroU = parseInt(numU);
    numeroD = parseInt(numD);
    if (numeroU > 0 && numeroD > 0) {
        $(".resultado").remove();
        calcularProbabilidad(numeroU, numeroD);
    }

});

$('#numeroU').on('blur', function () {
    numU = $(this).val();
    if (!numU > 0) {
        removerExclamacion("U");
        simboloError("U");
        $(".msjErrorU .txtU").text(txt[0]);
        $('.msjErrorU').show();
    } else if (numU < 1) {
        removerExclamacion("U");
        simboloError("U");
        $(".msjErrorU .txtU").text(txt[1]);
        $('.msjErrorU').show();
    }
    else {
        removerExclamacion("U");
        removerError("U");
        simboloCorrecto("U");
        $('.msjErrorU').hide();
    }


});
$('#numeroD').on('blur', function () {
    numD = $(this).val();
    if (!numD > 0) {
        removerExclamacion("D");
        simboloError("D");
        $(".msjErrorD .txtD").text(txt[0]);
        $('.msjErrorD').show();
    } else if (numD < 1) {
        removerExclamacion("D");
        simboloError("D");
        $(".msjErrorD .txtD").text(txt[1]);
        $('.msjErrorD').show();
    }
    else {
        removerExclamacion("D");
        removerError("D");
        simboloCorrecto("D");
        $('.msjErrorD').hide();
    }


});


$('.numero').on('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});
var campoU = document.getElementById('numeroU');
campoU.addEventListener('input', function () {
    if (this.value.length > 2)
        this.value = this.value.slice(0, 2);
});
var campoD = document.getElementById('numeroD');
campoD.addEventListener('input', function () {
    if (this.value.length > 2)
        this.value = this.value.slice(0, 2);
});
