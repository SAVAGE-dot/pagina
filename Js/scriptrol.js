var IdRoles = 0;
document.getElementById("registrar_rol").addEventListener("click",
function(){
    registrar_roles();
});

document.getElementById("edicion").addEventListener("click",
function(){
    actualizar_roles();
});

function registrar_roles(){
    let rol = document.getElementById("rol").value.trim();

    if(rol === ''){
        alert("Oops! parece que no escribiste bien el Rol")
    }else if(!/^[a-zA-Z]+(?:\s[a-zA-Z]+){0,2}$/.test(rol)){
        alert("No se permiten caracteres especiales");
        return;
    }

    var formData = new FormData();
    formData.append('rol', rol);

    fetch("../Routes/roles/create", { method: 'POST', body: formData })
    .then(function (response){
        return response;
    })
    .then(function (body){
        listarRoles();
        limpiarForm();
    });
}

function editar_roles(roles){
    IdRoles = roles.id

    document.getElementById("rol").value = roles.rol

    mostrarBotonActualizar();
}

function actualizar_roles(){
    let rol = document.getElementById("rol").value;

    var formData = new FormData();
    formData.append('rol', rol);
    formData.append('id', IdRoles);

    fetch("../Routes/roles/editar", {method: 'POST', body: formData })
    .then(function (response) {
        return response;
      })
      .then(function (body) {
          listarRoles();
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
    document.getElementById("rol").value = "";
}

function mostrarBotonActualizar() {
    const botonesEdicion = document.querySelectorAll('.edicion');

    botonesEdicion.forEach((boton) => {
        boton.style.display = 'block';
    });
}

function desactivar_rol(update){
    var formData = new FormData();
    formData.append('roldef', update);
    fetch ("../Routes/roles/defuse" , { method : 'POST', body : formData})
    .then(function (response) {
        return response;
    })
    .then(function (body) {
        listarRoles();
    })
    .catch(error => {
        console.error('Error:', error)
    });
}

function activar_rol(update){
    var formData = new FormData();
    formData.append('rolact', update);
    fetch("../Routes/roles/activate" , { method : 'POST', body : formData})
    .then(function (response) {
        return response;
    })
    .then(function (body) {
        listarRoles();
    })
    .catch(error => {
        console.error('Error:', error)
    });
}

function listarRoles(){
    fetch("../Routes/roles/listar").then((response) => {
        if(response.ok) {
            return response.json();
        }
        throw new Error ('Ocurrio un error inesperado')
    })
    .then((roles) => {
        console.log("Datos recibidos:", roles);
        let cuerpohtml="";
    for(let index = 0; index < roles.length; index++){
        if(roles[index].estado === "1"){
            cuerpohtml= cuerpohtml+`
            <tr>
                <th scope="row">${roles[index].id}</th>
                <td>${roles[index].rol}</td>
                <td>${roles[index].estado ? (roles[index].estado ==='1' ? 'Activo' : 'Desactivado'): 'ERROR'}</td>
                <td>
                    <button type="button" class="btn btn-outline-warning" onclick=\'editar_roles(${JSON.stringify(roles[index])}); mostrarBotonActualizar();\'><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                  </svg></button>
                  <button type="button" class="btn btn-outline-danger" onclick="desactivar_rol('${roles[index].id}'); mostrarBotonActualizar();"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" class="bi bi-person-x-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
                </svg></button>
                  <button type="button" class="btn btn-outline-success" onclick="activar_rol('${roles[index].id}'); mostrarBotonActualizar();"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" class="bi bi-person-fill-check" viewBox="0 0 16 16">
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                  <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4"/>
                </svg></button>
                </td>
            </tr>
            `;
            }else{
                cuerpohtml= cuerpohtml+`
                <tr>
                <th scope="row">${roles[index].id}</th>
                <td>${roles[index].rol}</td>
                <td>${roles[index].estado ? (roles[index].estado ==='1' ? 'Activo' : 'Desactivado'): 'ERROR'}</td>
                <td>
                    <button type="button" class="btn btn-outline-warning" onclick=\'editar_roles(${JSON.stringify(roles[index])}); mostrarBotonActualizar();\'><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                  </svg></button>
                  <button type="button" class="btn btn-outline-danger" onclick="desactivar_rol('${roles[index].id}'); mostrarBotonActualizar();"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" class="bi bi-person-x-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
                </svg></button>
                  <button type="button" class="btn btn-outline-success" onclick="activar_rol('${roles[index].id}'); mostrarBotonActualizar();"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" class="bi bi-person-fill-check" viewBox="0 0 16 16">
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                  <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4"/>
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
listarRoles()