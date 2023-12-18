var IdMarcas = 0;

document.getElementById("registrar").addEventListener("click", 
function(){
    registrar_marcas();
});

document.getElementById("edicion").addEventListener("click",
function(){
    actualizar_marcas(); 
    }
);

function registrar_marcas(){

    let nombre = document.getElementById("nombre").value.trim();
    let direccion = document.getElementById("direccion").value.trim();
    let ruc = document.getElementById("ruc").value.trim();

    if(nombre === ''){
        alert("Oops! parece que no escribiste bien el Nombre");
    }else if(!/^[a-zA-Z0-9 .]+$/.test(nombre)){
        alert("El campo nombre");
        return;
    }else if(direccion === ''){
        alert("Oops! parece que no escribiste bien la Direccion");
    }else if(!/^[a-zA-Z0-9 .\-]+$/.test(direccion)){
        alert("El campo direccion");
        return;
    }else if(ruc === ''){
        alert("Oops! parece que no escribiste bien el RUC");
    }else if(!/^[a-zA-Z0-9]+$/.test(ruc)){
        alert("El campo ruc");
        return;
    }

    var formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('direccion', direccion);
    formData.append('ruc', ruc);

    fetch("../Routes/Mar/create", { method: 'POST', body: formData })
    .then(function (response){
        return response;
    })
    .then(function (body){
        listarMarcas();
        limpiarForm();
    });
}

function editar_marcas(marcas){
    IdMarcas = marcas.Id

    document.getElementById("nombre").value = marcas.nombre
    document.getElementById("direccion").value = marcas.direccion
    document.getElementById("ruc").value = marcas.ruc

    mostrarBotonActualizar();
}

function actualizar_marcas(){
    let nombre = document.getElementById("nombre").value;
    let direccion = document.getElementById("direccion").value;
    let ruc = document.getElementById("ruc").value;

    var formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('direccion', direccion);
    formData.append('ruc', ruc);
    formData.append('id', IdMarcas);

    fetch("../Routes/Mar/editar", {method: 'POST', body: formData })
    .then(function (response) {
        return response;
      })
      .then(function (body) {
          listarMarcas();
          limpiarForm();
          
          Swal.fire({
            text: "Se Actualizo con Exito!",
            icon: "success"
          });

          const botonesEdicion = document.querySelectorAll('.edicion');
          botonesEdicion.forEach((boton) => {
              boton.style.display = 'none';
          });

      });
}

function limpiarForm(){
    document.getElementById("nombre").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("ruc").value = "";
}

function mostrarBotonActualizar() {
    const botonesEdicion = document.querySelectorAll('.edicion');

    botonesEdicion.forEach((boton) => {
        boton.style.display = 'block';
    });
}

function listarMarcas(){
    fetch("../Routes/Mar/listar").then((response) =>{
        if(response.ok) {
            return response.json();
        }
        throw new Error('Ocurrio un error inesperado')
    })
    .then((marcas) => {
        let cuerpohtml="";
    for(let index = 0; index < marcas.length; index++){
        if(marcas[index].estado === "1"){
            cuerpohtml= cuerpohtml+`
            <tr>
                <th scope="row">${marcas[index].Id}</th>
                <td>${marcas[index].nombre}</td>
                <td>${marcas[index].direccion}</td>
                <td>${marcas[index].ruc}</td>
                <td>${marcas[index].estado ? (marcas[index].estado ==='1' ? 'Habilitado' : 'Deshabilitado'): 'ERROR'}</td>
                <td>
                    <button type="button" class="btn btn-outline-warning" onclick=\'editar_marcas(${JSON.stringify(marcas[index])}); mostrarBotonActualizar();\'><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                  </svg></button>
                </td>
            </tr>
            `;
            }else{
                cuerpohtml= cuerpohtml+`
                <tr>
                    <th scope="row">${marcas[index].Id}</th>
                    <td>${marcas[index].nombre}</td>
                    <td>${marcas[index].direccion}</td>
                    <td>${marcas[index].ruc}</td>
                    <td>${marcas[index].estado ? (marcas[index].estado ==='1' ? 'Habilitado' : 'Deshabilitado'): 'ERROR'}</td>
                    <td>
                    <button type="button" class="btn btn-outline-warning" onclick=\'editar_marcas(${JSON.stringify(marcas[index])}); mostrarBotonActualizar();\'><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                  </svg></button>
                </tr>
                `;
            }
        }
        document.getElementById("tabla-cuerpo").innerHTML=cuerpohtml;
        })
        .catch((error) =>{
            console.log(error)
        });
}
listarMarcas()