function funcionBuscador() {
    // Script para la barra de búsqueda
    // según el input del teclado, se compara con el título de los elementos
    // mostrados por pantalla
    var input, filtro, cartas, splitArray, textoCarta, i;
    input = document.getElementById('inputBuscador');
    filtro = input.value.toUpperCase();
    cartas = document.getElementsByClassName('lista-plantas');

    for (i = 0; i < cartas.length; i++) {
        splitArray = cartas[i].innerText.split("\n");
        textoCarta = splitArray[0];

        if (textoCarta.toUpperCase().indexOf(filtro) > -1) {
            cartas[i].style.display = "";
        } else {
            cartas[i].style.display = "none";
        }
    }
}