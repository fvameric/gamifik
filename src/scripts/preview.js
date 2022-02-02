// si existe algún cambio en el input de #imagen
// carga esa imagen subida para previsualizarla en #preview

$("#imagen").change(function () {
    previsualizar(this);
});
function previsualizar(imagen) {
    if (imagen.files && imagen.files[0]) {
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
            $('#preview').html('<img src="' + e.target.result + '" width="150" height="auto"/>');
        };
        fileReader.readAsDataURL(imagen.files[0]);
    }
}