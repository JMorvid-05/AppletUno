var numU = 0,
    numD = 0,
    txt = ["¡No se aceptan campos vacíos!", "¡No se permite el 0!"];
var probs = [];
var allCharts = [];

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
    console.log(buenos, defectuosos);
    const prob1 = defectuosos / total;
    // Probabilidad de encontrar el último tubo defectuoso en la segunda prueba
    const prob2 = (defectuosos / total) * ((defectuosos - 1) / (total - 1));
    mensajes.push('Probabilidad de encontrar el último tubo defectuoso en la segunda prueba: ' + prob2.toFixed(3));
    let miFormula = "\\frac{" + defectuosos + "}{" + total + "} \\cdot \\frac{" + (defectuosos - 1) + "}{" + (total - 1) + "} =" + prob2.toFixed(3);
    let ecuacionUno = document.getElementById("ecuacionUno");
    katex.render(miFormula, ecuacionUno);

    // Probabilidad de encontrar el último tubo defectuoso en la tercera prueba
    const prob3 = (defectuosos / total) * (buenos / (total - 1)) * ((defectuosos - 1) / (total - 2));
    mensajes.push('Probabilidad de encontrar el último tubo defectuoso en la tercera prueba: ' + prob3.toFixed(3));
    miFormula = "\\frac{" + defectuosos + "}{" + total + "} \\cdot \\frac{" + (buenos) + "}{" + (total - 1) + "} \\cdot \\frac{" + (defectuosos - 1) + "}{" + (total - 1) + "} =" + prob3.toFixed(3);
    ecuacionUno = document.getElementById("ecuacionDos");
    katex.render(miFormula, ecuacionDos);
    // Probabilidad de encontrar el último tubo defectuoso en la cuarta prueba
    const prob4 = (defectuosos / total) * (buenos / (total - 1)) * (buenos - 1) / (total - 2) * ((defectuosos - 1) / (total - 3));
    mensajes.push('Probabilidad de encontrar el último tubo defectuoso en la cuarta prueba: ' + prob4.toFixed(3));
    miFormula = "\\frac{" + defectuosos + "}{" + total + "} \\cdot \\frac{" + (buenos) + "}{" + (total - 1) + "} \\cdot \\frac{" + (buenos - 1) + "}{" + (total - 2) + "} \\cdot \\frac{" + (defectuosos - 1) + "}{" + (total - 3) + "} =" + prob4.toFixed(3);
    ecuacionUno = document.getElementById("ecuacionTres");
    katex.render(miFormula, ecuacionTres);
    // Suma de las tres probabilidades
    const suma = prob2 + prob3 + prob4;
    mensajes.push('Probabilidad total de encontrar los dos tubos defectuosos en el lote: ' + suma.toFixed(3));
    katex.render(prob2.toFixed(3)+"+"+prob3.toFixed(3)+"+"+prob4.toFixed(3)+"="+suma.toFixed(3),ecuacionCuatro);
    probs.push(prob2);
    probs.push(prob3);
    probs.push(prob4);
    probs.push(suma);

    /*for (let i = 0; i < mensajes.length; i++) {
        $(".operaciones").append("<p class='resultado'>" + mensajes[i] + "</p>");
    }*/


    Chart.helpers.each(Chart.instances, function (instance) {
        instance.destroy();
    });

    Chart.instances = {};
    charts(prob1, prob2, prob3, prob4, suma);



}


function charts(prob1, prob2, prob3, prob4, suma) {

    allCharts.forEach(function (chart) {
        chart.destroy();
    });





    var grafico1 = document.getElementById('grafico1');
    var grafico2 = document.getElementById('grafico2');
    var grafico3 = document.getElementById('grafico3');
    var grafico4 = document.getElementById('grafico4');


    console.log(prob1 + "" + prob2 + "" + prob3 + "" + prob4);


    // Crear los datos y opciones para los gráficos

    var opcionesGrafico1 = {
        responsive: false,
        maintainAspectRatio: false
    };


    var opcionesGrafico2 = {
        responsive: false,
        maintainAspectRatio: false
    };


    var opcionesGrafico3 = {
        responsive: false,
        maintainAspectRatio: false
    };
    var opcionesGrafico4 = {
        responsive: false,
        maintainAspectRatio: false
    };
    var datosGrafico1 = {
        labels: ['Encontrado', 'No encontrado'],
        datasets: [{
            data: [prob2, (1 - prob2)],
            backgroundColor: ['#FF6384', '#36A2EB']
        }]
    };
    var datosGrafico2 = {
        labels: ['Encontrado', 'No encontrado'],
        datasets: [{

            data: [prob3, (1 - prob3)],
            backgroundColor: ['#9CFF2E', '#3B9AE1']
        }]
    };
    var datosGrafico3 = {
        labels: ['Encontrado', 'No encontrado'],
        datasets: [{

            data: [prob4, (1 - prob4)],
            backgroundColor: ['#F6F1F1', '#19A7CE']
        }]
    };
    var datosGrafico4 = {
        labels: ['Probabilidad Total', 'Restante'],
        datasets: [{

            data: [suma, (1 - suma)],
            backgroundColor: ['#F73D93', '#9A0680']
        }]
    };

    var graficoPastel1 = new Chart(grafico1, {
        type: 'pie',
        data: datosGrafico1,
        options: opcionesGrafico1,
        ID: '0'

    });
    allCharts.push(graficoPastel1);

    var graficoPastel2 = new Chart(grafico2, {
        type: 'pie',
        data: datosGrafico2,
        options: opcionesGrafico2,
        ID: '1'

    });
    allCharts.push(graficoPastel2);

    var graficoPastel3 = new Chart(grafico3, {
        type: 'pie',
        data: datosGrafico3,
        options: opcionesGrafico3,
        ID: '2'
    });
    allCharts.push(graficoPastel3);
    var graficoPastel4 = new Chart(grafico4, {
        type: 'pie',
        data: datosGrafico4,
        options: opcionesGrafico4,
        ID: '3'
    });
    allCharts.push(graficoPastel4);



}




//====================CHARTJS
// Obtener los elementos canvas





// Crear los gráficos utilizando Chart.js








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
    if (this.value.length > 8)
        this.value = this.value.slice(0, 8);
});
var campoD = document.getElementById('numeroD');
campoD.addEventListener('input', function () {
    if (this.value.length > 8)
        this.value = this.value.slice(0, 8);
});
