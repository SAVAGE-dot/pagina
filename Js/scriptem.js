var IdEmpresas = 0;

document.getElementById("registrar").addEventListener("click",
function(){
    registrar_empresas();
});

document.getElementById("edicion").addEventListener("click",
function (){
    actualizar_empresas();
});

getMarcas()


function registrar_empresas(){
    let empresa_id = document.getElementById("empresa_id").value;
    let nombre = document.getElementById("nombre").value.trim();
    let direccion = document.getElementById("direccion").value.trim();
    let codigo = document.getElementById("codigo").value.trim();

    if (nombre === ''){
        alert("Oops! parece que no escribiste bien el nombre");
    }else if(!/^[a-zA-Z0-9\s]+$/.test(nombre)) {
        alert("El campo nombre");
        return;
    }else if (direccion === ''){
        alert("Oops! parece que no escribiste bien la direccion");
    }else if(!/^[\w\s\d.,]+$/i.test(direccion)){
        alert("El campo direccion");
        return;
    }else if (codigo === '') {
        alert("Oops! parece que no escribiste bien el codigo");
    }else if (!/^[a-zA-Z0-9]+$/.test(codigo)) {
        alert("El campo codigo");
        return;
    }

    var formData = new FormData();
    formData.append('empresa_id', empresa_id);
    formData.append('nombre', nombre);
    formData.append('direccion', direccion);
    formData.append('codigo', codigo);

    fetch("../Routes/Emp/create", { method : 'POST', body : formData})
    .then(function(response){
        return response;
    })
    .then(function (body){
        listarEmpresas();
        limpiarForm();
    });
}

function editar_empresas(empresas){
    IdEmpresas = empresas.id
    document.getElementById("empresa_id").value = empresas.marca
    document.getElementById("nombre").value = empresas.nombre
    document.getElementById("direccion").value = empresas.direccion
    document.getElementById("codigo").value = empresas.codigo

    mostrarBotonActualizar();
}

function actualizar_empresas(){
    let empresa_id = document.getElementById("empresa_id").value;
    let nombre = document.getElementById("nombre").value;
    let direccion = document.getElementById("direccion").value;
    let codigo = document.getElementById("codigo").value;

    var formData = new FormData();
    formData.append('empresa_id', empresa_id);
    formData.append('nombre', nombre);
    formData.append('direccion', direccion);
    formData.append('codigo', codigo);
    formData.append('id', IdEmpresas);

    fetch("../Routes/Emp/editar", {method : 'POST', body : formData})
    .then(function (response) {
        return response;
    })
    .then(function (body) {
        listarEmpresas();
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

function mostrarBotonActualizar() {
    const botonesEdicion = document.querySelectorAll('.edicion');

    botonesEdicion.forEach((boton) => {
        boton.style.display = 'block';
    });
}

function desactivar_empresa(update){
    var formData = new FormData();
    formData.append('id', update);
    fetch("../Routes/Emp/defuse" , { method : 'POST', body : formData})
    .then(function (response) {
        return response;
    })
    .then(function (body) {
        listarEmpresas();
    })
    .catch(error => {
        console.error('Error:', error)
    });
}

function activar_empresa(update){
    var formData = new FormData();
    formData.append('activacion', update);
    fetch("../Routes/Emp/activate" , { method : 'POST', body : formData})
    .then(function (response) {
        return response;
    })
    .then(function (body) {
        listarEmpresas();
    })
    .catch(error => {
        console.error('Error:', error)
    });
}

function getMarcas(empresas){
    fetch("../Routes/Mar/listar", { method: 'POST' })
   .then(function (response) {
     return response.json();
   })
   .then(function (empresas) {
       let selectHTML = "";
       for (let index = 0; index < empresas.length; index++) {
            selectHTML += `<option value="${empresas[index].Id}">
                                ${empresas[index].nombre}
                           </option>`;
       }
       document.getElementById("empresa_id").innerHTML = selectHTML;
   }).catch(err=>{
       console.error(err);
   });
}

function limpiarForm(){
    // document.getElementById("tienda_id").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("codigo").value = "";
    
}

function listarEmpresas(){
    fetch("../Routes/Emp/listar").then((response) =>{
        if (response.ok) {
            return response.json();
        }
        throw new Error ('Ocurrio un error inesperado');
    })
    .then((empresas) => {
        let cuerpohtml="";
    for(let indice = 0; indice < empresas.length; indice++) {
        if(empresas[indice].estado ==="1"){
            cuerpohtml = cuerpohtml+`
            <tr>
                <th scope="row">${empresas[indice].id}</th>
                <td>${empresas[indice].marca}</td>
                <td>${empresas[indice].nombre}</td>
                <td>${empresas[indice].direccion}</td>
                <td>${empresas[indice].codigo}</td>
                <td>${empresas[indice].estado ? (empresas[indice].estado === '1' ? 'Activo' : 'Inactivo') : 'Error'}</td>
                <td>
                <button type="button" class="btn btn-outline-warning" onclick=\'editar_empresas(${JSON.stringify(empresas[indice])}); mostrarBotonActualizar();\'>EDITAR</button>
                <button type="button" class="btn btn-outline-danger" onclick="desactivar_empresa('${empresas[indice].id}')">ELIMINAR</button>
                <button type="button" class="btn btn-outline-success" onclick="activar_empresa('${empresas[indice].id}')">ACTIVAR</button>
                </td>
            </tr>
            `;
        }else{
            cuerpohtml = cuerpohtml+`
            <tr>
                <th scope="row">${empresas[indice].id}</th>
                <td>${empresas[indice].marca}</td>
                <td>${empresas[indice].nombre}</td>
                <td>${empresas[indice].direccion}</td>
                <td>${empresas[indice].codigo}</td>
                <td>${empresas[indice].estado ? (empresas[indice].estado === '1' ? 'Activo' : 'Inactivo') : 'Error'}</td>
                <td>
                <button type="button" class="btn btn-outline-warning" onclick=\'editar_empresas(${JSON.stringify(empresas[indice])}); mostrarBotonActualizar();\'>EDITAR</button>
                <button type="button" class="btn btn-outline-danger" onclick="desactivar_empresa('${empresas[indice].id}')">ELIMINAR</button>
                <button type="button" class="btn btn-outline-success"  onclick="activar_empresa('${empresas[indice].id}')">ACTIVAR</button>
                </td>
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
listarEmpresas()