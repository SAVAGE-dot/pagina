var IdCodigo = 0;

document.getElementById("registrar").addEventListener("click",
function(){
    registrar_codigos();
});

document.getElementById("edicion").addEventListener("click",
function(){
    actualizar_codigos();
});

function registrar_codigos(){

    let codigo = document.getElementById("codigo").value.trim();
    let nombre = document.getElementById("nombre").value.trim();
    let paquete_id = document.getElementById("paquete_id").value.trim();
    let monto = document.getElementById("monto").value;

    if(codigo === '') {
        alert("Oops! parece que no escribiste bien el codigo");
    }else if (!/^[a-zA-Z0-9]+$/.test(codigo)){
        alert("El campo codigo");
        return;
    }else if (nombre === ''){
        alert("Oops! parece que no escribiste bien el nombre");
    }else if(!/^[a-zA-Z0-9]+$/.test(nombre)) {
        alert("El campo nombre");
        return;
    }else if (paquete_id === ''){
        alert("Oops! parece que no escribiste bien el ID del Paquete");
    }else if(!/^[A-Z]{2}-\d{4}$/.test(paquete_id)){
        alert("El campo Paquete ID");
        return;
    }else if (monto === '') {
        alert("Oops! parece que no escribiste bien el monto");
    }else if (!/^[a-zA-Z0-9]+$/.test(monto)) {
        alert("El campo monto");
        return;
    }

    var formData = new FormData();
    formData.append('codigo', codigo);
    formData.append('nombre', nombre);
    formData.append('paquete_id', paquete_id);
    formData.append('monto', monto);

    fetch("../Routes/Cod/create", { method: 'POST', body: formData })
    .then(function (response){
        return response;
    })
    .then(function (body) {
        listarCodigos(); 
        limpiarForm();
    });
}

function editar_codigos(codigos){
    IdCodigo = codigos.Id    

    document.getElementById("codigo").value = codigos.codigo
    document.getElementById("nombre").value = codigos.nombre
    document.getElementById("paquete_id").value = codigos.paquete_id    
    document.getElementById("monto").value = codigos.monto

    mostrarBotonActualizar();
}

function actualizar_codigos(){
    
    let codigo = document.getElementById("codigo").value;
    let nombre = document.getElementById("nombre").value;
    let paquete_id = document.getElementById("paquete_id").value;
    let monto = document.getElementById("monto").value;

    var formData = new FormData();
    formData.append('codigo', codigo);
    formData.append('nombre', nombre);
    formData.append('paquete_id', paquete_id);
    formData.append('monto', monto);
    formData.append('id', IdCodigo);

    fetch ("../Routes/Cod/editar", { method: 'POST', body: formData })
    .then(function (response) {
        return response;
      })
      .then(function (body) {
          listarCodigos();
          limpiarForm();
          
          alert("Se actualizo con Exito")

          const botonesEdicion = document.querySelectorAll('.edicion');
          botonesEdicion.forEach((boton) => {
              boton.style.display = 'none';
          });

      });
}

function limpiarForm(){
    document.getElementById("codigo").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("paquete_id").value = "";
    document.getElementById("monto").value = "";
}

function mostrarBotonActualizar() {
    const botonesEdicion = document.querySelectorAll('.edicion');

    botonesEdicion.forEach((boton) => {
        boton.style.display = 'block';
    });
}


function listarCodigos(){
    fetch("../Routes/Cod/listar").then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Ocurrio un error');
    })
    .then((codigos) => {
        let cuerpohtml="";
    for(let indice = 0; indice < codigos.length; indice++) {
        if (codigos[indice].estado === "1"){
            cuerpohtml= cuerpohtml+`
        <tr>
            <th scope="row">${codigos[indice].Id}</th>
            <td>${codigos[indice].codigo}</td>
            <td>${codigos[indice].nombre}</td>
            <td>${codigos[indice].monto}</td>
            <td>${codigos[indice].estado ? (codigos[indice].estado ==='1' ? 'Habilitado' : 'Deshabilitado'): 'ERROR'}</td>
            <td>${codigos[indice].paquete_id}</td>
            <td>
                <button type="button" class="btn btn-outline-warning" onclick=\'editar_codigos(${JSON.stringify(codigos[indice])}); mostrarBotonActualizar();\'>EDITAR</button>
            </td>
        </tr>
        `;
        }else{
            cuerpohtml= cuerpohtml+`
            <tr>
                <th scope="row">${codigos[indice].Id}</th>
                <td>${codigos[indice].codigo}</td>
                <td>${codigos[indice].nombre}</td>
                <td>${codigos[indice].monto}</td>
                <td>${codigos[indice].estado ? (codigos[indice].estado ==='1' ? 'Habilitado' : 'Deshabilitado'): 'ERROR'}</td>
                <td>${codigos[indice].paquete_id}</td>
                <td>
                <button type="button" class="btn btn-outline-warning" onclick=\'editar_codigos(${JSON.stringify(codigos[indice])}); mostrarBotonActualizar();\'>EDITAR</button>
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
listarCodigos()
