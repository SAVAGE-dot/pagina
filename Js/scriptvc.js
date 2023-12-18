const inputGiftCard = document.getElementById('idgiftcard');
const buscarBtn = document.getElementById('buscarBtn');

var idavcgiftcard = 0;
var cantidadcanales = 0;
var canalesList = [];
var idcodcomp = 0;

var idVale = 0;


document.getElementById("actualizar").addEventListener("click", function(){
    actualizargif();
});

getCanales();

// Aquí cambiamos el evento 'keyup' por 'input'
// document.getElementById('idgiftcard').addEventListener('input', function(event) {
//     buscarGift();
// });

document.getElementById('idgiftcard').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
      buscarGift();
  }
});

function buscarGift() {
    let valorBusqueda = document.getElementById('idgiftcard').value;
    var formData = new FormData();
    formData.append('idgiftcard', valorBusqueda);

    if (valorBusqueda !== '' && valorBusqueda) {
        fetch("../Routes/Admin/getcod", {
                method: 'POST',
                body: formData
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(body) {
                // console.log(body);
                let cuerpohtml = "";
                if (body.length > 0) {
                    body.forEach(function(item) {
                        cuerpohtml += `
                            <tr>
                                <td>${item.id}</td>
                                <td>${item.codcomp}</td>
                                <td><button type="button" class="btn btn-outline-info" onclick=\'seleccionarGiftCard(${JSON.stringify(item)});\'>Seleccionar</button></td>
                            </tr>`;
                    });
                    document.getElementById("cuerpo-tabla").innerHTML = cuerpohtml;
                } else {
                    document.getElementById("cuerpo-tabla").innerHTML = "<tr><td colspan='3'>No hay resultados</td></tr>";
                }
            })
            .catch(error => {
                console.error(error);
            });
    } else {
        document.getElementById("cuerpo-tabla").innerHTML = "<tr><td colspan='3'>Ingresa un Nombre Primero</td></tr>";
    }
}

function seleccionarGiftCard(item) {    
for (let index = 0; index < item.canales.length; index++) {
    const canalId = item.canales[index].id;

    idVale = item.id;

    document.getElementById("cn" + canalId).checked = true;
    mostrarInput("cn" + canalId);
    document.getElementById("paquete" + canalId).value = item.canales[index].codigo;
    document.getElementById("paquete2" + canalId).value = item.canales[index].idbd;
    console.log(idVale);
  }
}




function actualizargif(){
    let rojo = [];
    for (let index = 0; index < canalesList.length; index++) {
        let items = {};
        items["id"] = canalesList[index].id;
        items["name"] = canalesList[index].name;
        if(document.getElementById("cn" + canalesList[index].id).checked){
            // console.log(canalesList[index].name + " : esta seleccionado")
            items["codigo"] = document.getElementById("paquete" + canalesList[index].id).value;
            items["idbd"] = document.getElementById("paquete2" + canalesList[index].id).value;
            items["estado"] = 1
        }else{
            // console.log(canalesList[index].name + " : no esta seleccionado") 
            items["idbd"] = 0
            items["codigo"] = document.getElementById("paquete" + canalesList[index].id).value;
            items["estado"] = 0
        }
        rojo.push(items);
    }
    console.log(rojo);

    let parse=JSON.stringify(rojo);
    console.log(parse)
    var formData = new FormData ();
    formData.append('id', idavcgiftcard);
    formData.append('name', parse);
    formData.append('idVale', idVale);

    fetch("../routes/vc/update", { method : 'POST', body : formData})
    .then(function (response) {
        return response;
    })
    .then(function (body) {
        listarvc();
    })
    .catch(error(error=>{
        console.log(error);
    }));
}

function getCanales(){
  fetch("../Routes/vc/canal", {method :'POST'})
  .then(function (response) {
    return response.json();
  })
  .then(function (body) {
    let cuerpohtml=""; 
    cantidadcanales = body.length;
    for (let index = 0; index < body.length; index++) {
      let attributos={};
      attributos["id"]=body[index].id;
      attributos["name"]=body[index].name;
      canalesList.push(attributos);

      cuerpohtml=cuerpohtml+`
      <div class="col-5 col-sm-3">
      <div class="form-group row align-items-center">
          <label class="col-sm-5 col-form-label" for="cn${body[index].id}">
              ${body[index].name}
          </label>
          <div class="col-sm-5">
              <div class="input-group"> <input class="form-control mostrar" type="text" id="paquete${body[index].id}" style="width: 55px; display: none;">
                  <div class="input-group-text">
                    <input class="form-check-input mx-2" type="checkbox" onclick="mostrarInput('cn${body[index].id}')" value="${body[index].id}" id="cn${body[index].id}" name="checkti">
                  </div>
                    <input class="form-control mostrar" type="text" id="paquete2${body[index].id}" style="width: 25px; display: none;">
              </div>
          </div>
      </div>
  </div>
  </div>
      `
    }
    document.getElementById("contenedor-canales").innerHTML=cuerpohtml;
  }).catch(error=>{
    console.error(error);
  });
}

function mostrarInput(checkboxId){
    const checkbox = document.getElementById(checkboxId);
    const inputId = "paquete" + checkbox.value;
    const input = document.getElementById(inputId);
    const input2Id = "paquete2" + checkbox.value;
    const input2 = document.getElementById(input2Id);

    if (input) {
        if (checkbox.checked) {
            input.style.display = 'block';
        } else {
            input.style.display = 'none';          
        }
    }
}


function listarvc(){
    fetch("../Routes/vc/listar")
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Ocurrio un Error");
    })
    .then((valec) => {
        let cuerpohtml="";
        for(let index =0; index < valec.length; index++) {
            if (valec[index].estado === "1") {
                cuerpohtml=cuerpohtml+`
                <tr>
                    <th scope="row">${valec[index].id}</th>
                    <td>${valec[index].idvale}</td>
                    <td>${valec[index].codpaquete}</td>
                    <td>${valec[index].idcanal}</td>
                    <td>${valec[index].codigocompuesto}</td>
                    <td>${valec[index].precio}</td>
                    <td>${valec[index].estado ? (valec[index].estado === '1' ? 'Activo' : 'Inactivo') : 'Sin estado'}</td>
                    <td>
                    <button type="button" class="btn btn-outline-warning" onclick=\'editar_usuario(${JSON.stringify(valec[index])})\'><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                  </svg></button>
                    <button type="button" class="btn btn-outline-danger" onclick="desactivar_usu('${valec[index].id}'); mostrarBotonActualizar();"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" class="bi bi-person-x-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
                  </svg></button>
                    <button type="button" class="btn btn-outline-success" onclick="activar_usu('${valec[index].id}'); mostrarBotonActualizar();"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" class="bi bi-person-fill-check" viewBox="0 0 16 16">
                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4"/>
                  </svg></button>
                    </td>
                </tr>
                `;
            }else{
                cuerpohtml=cuerpohtml+`
                <tr>
                <th scope="row">${valec[index].id}</th>
                <td>${valec[index].idvale}</td>
                <td>${valec[index].codpaquete}</td>
                <td>${valec[index].idcanal}</td>
                <td>${valec[index].codigocompuesto}</td>
                <td>${valec[index].precio}</td>
                <td>${valec[index].estado ? (valec[index].estado === '1' ? 'Activo' : 'Inactivo') : 'Sin estado'}</td>
                    <td>
                    <button type="button" class="btn btn-outline-warning" onclick=\'editar_usuario(${JSON.stringify(valec[index])})\'><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                      </svg></button>
                    <button type="button" class="btn btn-outline-danger" onclick="desactivar_usu('${valec[index].id}'); mostrarBotonActualizar();"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" class="bi bi-person-x-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
                    </svg></button>
                      <button type="button" class="btn btn-outline-success" onclick="activar_usu('${valec[index].id}'); mostrarBotonActualizar();"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" class="bi bi-person-fill-check" viewBox="0 0 16 16">
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
listarvc()