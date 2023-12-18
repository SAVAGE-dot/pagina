var idUsuario = 0;
document.getElementById("registrar").addEventListener("click",
function(){
    registrar_usuarios();
});

document.getElementById("edicion").addEventListener("click",
function(){
    actualizar_usuario();
})

getRoles();

function registrar_usuarios(){
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let alias = document.getElementById("alias").value.trim();
    let password = document.getElementById("contraseña").value.trim();
    let rol = document.getElementById("roles").value;

    if(nombre === ''){
        alert("Tu Nombre no puede estar vacio");
        return
    }else if(apellido === ''){
        alert("Tu Apellido no puede estar vacio");
        return;
    }else if(alias === ''){
        alert("Tu Username no puede estar vacio");
        return;
    }else if(password === ''){
        alert("Tu Contraseña no puede estar vacia");
        return;
    }else if(!/^(?=.*[0-9])(?=.*[a-zA-Z'])(?!.*[^a-zA-Z0-9']).{8,20}$/.test(password)) {
        alert("Recuerda que tu contraseña debe tener entre 8 y 20 caracteres y un '");
        return;
    }

    var formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('alias', alias);
    formData.append('contraseña', password);
    formData.append('idRol', rol);

    fetch("../Routes/usu/create", { method : 'POST', body : formData})
    .then(function(response) {
        return response;
    })
    .then(function(body){
        listarUsuarios();
    })



}

function editar_usuario(usuario){
    idUsuario = usuario.id

    document.getElementById("nombre").value=usuario.nombre
    document.getElementById("apellido").value=usuario.apellidos
    document.getElementById("alias").value=usuario.alias
    document.getElementById("contraseña").value=usuario.contraseña
    document.getElementById("roles").value=usuario.idRoles

    mostrarBotonActualizar();
}

function actualizar_usuario(){

    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let alias = document.getElementById("alias").value;
    let password = document.getElementById("contraseña").value;
    let rol = document.getElementById("roles").value;

    var formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('alias', alias);
    formData.append('contraseña', password)
    formData.append('idRoles', rol);
    formData.append('id', idUsuario);


    fetch("../Routes/usu/editar", { method: 'POST', body : formData})
    .then(function (response) {
        return response;
        
    })
    .then(function (body) {
        listarUsuarios();
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

function getRoles(roles){
    fetch("../Routes/roles/listar", {method: 'POST'})
    .then(function (response) {
        return response.json();
    })
    .then(function (roles) {
        let selectHTML = "";
        for (let index = 0; index < roles.length; index++) {
            selectHTML += `<option value="${roles[index].id}">
                           ${roles[index].rol}
                          </option>`;
        }
        document.getElementById("roles").innerHTML = selectHTML;
    }).catch(err=>{
        console.error(err);
    });
}

function limpiarForm(){
    document.getElementById("nombre").value="";
    document.getElementById("apellido").value="";
    document.getElementById("alias").value= "";
    document.getElementById("contraseña").value= "";
    document.getElementById("roles").value= "";
}

function desactivar_usu(update){
    var formData = new FormData();
    formData.append('usudef',update);
    fetch ("../Routes/usu/defuse", { method: 'POST', body : formData})
    .then(function (response) {
        return response;
    })
    .then(function (body) {
        listarUsuarios();
    })
    .catch(error => {
        console.error('Error', error)
    });
} 

function activar_usu(update){
    var formData = new FormData();
    formData.append('usuact',update);
    fetch ("../Routes/usu/activate", { method: 'POST', body : formData})
    .then(function (response) {
        return response;
    })
    .then(function (body) {
        listarUsuarios();
    })
    .catch(error => {
        console.error('Error', error)
    });
}

function listarUsuarios(){
    fetch("../Routes/usu/listar")
    .then((response) => {
    if (response.ok) {
        return response.json();
    }
    throw new Error("Ocurrio un Error");
    })
    .then((usuarios) => {
        let cuerpohtml="";
    for (let index = 0; index < usuarios.length; index++) {
        if (usuarios[index].estado === "1"){
            cuerpohtml=cuerpohtml+`
            <tr>
                <th scope="row">${usuarios[index].id}</th>
                <td>${usuarios[index].nombre}</td>
                <td>${usuarios[index].apellidos}</td>
                <td>${usuarios[index].alias}</td>
                <td>${usuarios[index].contraseña}</td>
                <td>${usuarios[index].idRoles}</td>                
                <td>${usuarios[index].descripcion}</td>
                <td>${usuarios[index].estado ? (usuarios[index].estado === '1' ? 'Activo' : 'Inactivo') : 'Sin estado'}</td>
                <td>
                <button type="button" class="btn btn-outline-warning" onclick=\'editar_usuario(${JSON.stringify(usuarios[index])})\'><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg></button>
                <button type="button" class="btn btn-outline-danger" onclick="desactivar_usu('${usuarios[index].id}'); mostrarBotonActualizar();"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" class="bi bi-person-x-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
              </svg></button>
                <button type="button" class="btn btn-outline-success" onclick="activar_usu('${usuarios[index].id}'); mostrarBotonActualizar();"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" class="bi bi-person-fill-check" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4"/>
              </svg></button>
                </td>
            </tr>
            `;
        }else{
            cuerpohtml=cuerpohtml+`
            <tr>
                <th scope="row">${usuarios[index].id}</th>
                <td>${usuarios[index].nombre}</td>
                <td>${usuarios[index].apellidos}</td>
                <td>${usuarios[index].alias}</td>
                <td>${usuarios[index].contraseña}</td>
                <td>${usuarios[index].idRoles}</td> 
                <td>${usuarios[index].descripcion}</td>
                <td>${usuarios[index].estado ? (usuarios[index].estado === '1' ? 'Activo' : 'Inactivo') : 'Sin estado'}</td>
                <td>
                <button type="button" class="btn btn-outline-warning" onclick=\'editar_usuario(${JSON.stringify(usuarios[index])})\'><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                  </svg></button>
                <button type="button" class="btn btn-outline-danger" onclick="desactivar_usu('${usuarios[index].id}'); mostrarBotonActualizar();"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" class="bi bi-person-x-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
                </svg></button>
                  <button type="button" class="btn btn-outline-success" onclick="activar_usu('${usuarios[index].id}'); mostrarBotonActualizar();"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" class="bi bi-person-fill-check" viewBox="0 0 16 16">
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                  <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4"/>
                </svg></button>
                </td>
            </tr>
            `;
        }
    }
    document.getElementById("tabla-cuerpo").innerHTML=cuerpohtml;
    })
    .catch((error) => {
        console.log(error)
    });
}
listarUsuarios()