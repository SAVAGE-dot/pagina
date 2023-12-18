var IdTienda = 0;
var StrNombreTienda;

document.getElementById("registrar_boton").addEventListener("click",
function(){
    registrar_datos();
}); 
document.getElementById("enviar_edicion").addEventListener("click",
function(){
    actualizar_producto();
}); 
getEstados();
getTiendas();
function registrar_datos(){
   
    let tienda_id = document.getElementById("tienda_id").value;
    let codigo = document.getElementById("codigo").value.trim();
    let codigo_compuesto = document.getElementById("codigo_compuesto").value.trim();
    let serie = document.getElementById("serie").value.trim();
    let correlativo = document.getElementById("correlativo").value.trim();
    let estado=document.querySelector('input[name="estado"]:checked').value;
    let monto = document.getElementById("monto").value.trim();

     if (codigo === '') {
    alert("Oops! parece que no escribiste bien el codigo");
    } else if (!/^[a-zA-Z0-9]+(\s{1,2})?$/.test(codigo)) {
    alert("El campo codigo");
        return;
    } else if (codigo_compuesto === '') {
    alert("Oops! parece que no escribiste bien el codigo compuesto");
    } else if (!/^[a-zA-Z0-9]+(\s{1,2})?$/.test(codigo_compuesto)) {
    alert("El campo codigo compuesto");
        return;
    } else if (serie === '') {
    alert("Oops! parece que no escribiste bien la serie ");
    } else if (!/^[a-zA-Z0-9]+(\s{1,2})?$/.test(serie)) {
    alert("El campo serie");
        return;
    } else if (correlativo === '') {
    alert("Solo se permiten letras en el Nombre del Correlativo");
    } else if (!/^[a-zA-Z0-9]+(\s{1,2})?$/.test(correlativo)) {
    alert("El campo correlativo");
        return;
    } else if (monto === '') {
    alert("Solo se permiten números en el monto");
    } else if (!/^\d+(\.\d+)?$/.test(monto)) {
    alert("El campo monto");
        return;
    }

		var formData = new FormData();
        formData.append('tienda_id', tienda_id);
        formData.append('codigo', codigo);
        formData.append('codigo_compuesto', codigo_compuesto);
        formData.append('serie', serie);
        formData.append('correlativo', correlativo);
        formData.append('estado', estado);
        formData.append('monto', monto);

		fetch("../Routes/Admin/create", { method: 'POST', body: formData })
		.then(function (response) {
		  return response;
		})
		.then(function (body) {
            listarTiendas();
            limpiarForm();

		});
}

function eliminar_registro(update){
    var formData = new FormData();
    formData.append('idProducto', update);
    fetch(`../Routes/Admin/delete`, {
        method: 'POST' ,
        body : formData
    })
    .then(function (response) {
        return response;
      })
    .then(function (body) {
          listarTiendas();

    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function activar_registro(update){
    var formData = new FormData();
    formData.append('activacion', update);
    fetch(`../Routes/Admin/activar`, {
        method: 'POST' ,
        body : formData
    })
    .then(function (response) {
        return response;
      })
    .then(function (body) {
          listarTiendas();

    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function getTiendas(){
    console.log("Obteniendo tiendas...");
    fetch("../Routes/Admin/tiendas", { method: 'POST' })
   .then(function (response) {
     return response.json();
   })
   .then(function (tiendas) {
       let selectHTML = ""; // Variable para almacenar las opciones del select
       for (let index = 0; index < tiendas.length; index++) {
            selectHTML += `<option value="${tiendas[index].id}">
                                ${tiendas[index].Nombre_tienda}
                           </option>`;
       }
       document.getElementById("tienda_id").innerHTML = selectHTML;
   }).catch(err=>{
       console.error(err);
   });
}

function getEstados(){
    console.log("Obteniendo tiendas...");
    fetch("../Routes/Admin/tiendas", { method: 'POST' })
   .then(function (response) {
     return response.json();
   })
   .then(function (tiendas) {
       let selectHTML = ""; // Variable para almacenar las opciones del select
       for (let index = 0; index < tiendas.length; index++) {
            selectHTML += `<option value="${tiendas[index].id}">
                                ${tiendas[index].Nombre_tienda}
                           </option>`;
       }
       document.getElementById("tienda_id").innerHTML = selectHTML;
   }).catch(err=>{
       console.error(err);
   });
}

function editar_registro(tiendas){
    IdTienda = tiendas.Id
    console.log(tiendas.Id)
    document.getElementById("tienda_id").value=tiendas.Id_tienda
    document.getElementById("codigo").value=tiendas.Codigo
    document.getElementById("codigo_compuesto").value=tiendas.Codigo_compuesto
    document.getElementById("serie").value=tiendas.Serie
    document.getElementById("correlativo").value=tiendas.Correlativo
    document.getElementById("estado-"+tiendas.Estado).checked = true
    document.getElementById("monto").value=tiendas.Monto

}

function actualizar_producto(){
    let tienda_id = document.getElementById("tienda_id").value;
    let codigo = document.getElementById("codigo").value;
    let codigo_compuesto = document.getElementById("codigo_compuesto").value;
    let serie = document.getElementById("serie").value;
    let correlativo = document.getElementById("correlativo").value;
    let estado = document.querySelector('input[name="estado"]:checked').value;
    let monto = document.getElementById("monto").value;

    var formData = new FormData();
    formData.append('tienda_id', tienda_id);	
    formData.append('codigo', codigo);
    formData.append('codigo_compuesto', codigo_compuesto);
    formData.append('serie', serie);
    formData.append('correlativo', correlativo);
    formData.append('estado', estado);
    formData.append('monto', monto);
    formData.append('id', IdTienda);	
        

		fetch("../Routes/Admin/editar", { method: 'POST', body: formData })
		.then(function (response) {
		  return response;
		})
		.then(function (body) {
            listarTiendas();

		});

}

function limpiarForm(){
    // document.getElementById("tienda_id").value = "";
    document.getElementById("codigo").value = "";
    document.getElementById("codigo_compuesto").value= "";
    document.getElementById("serie").value = "";
    document.getElementById("correlativo").value= "";
    // document.querySelector('input[name="estado"]:checked').value;
    document.getElementById("monto").value= "";

}

function listarTiendas(){
    fetch("../Routes/Admin/listar").then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((tiendas) => {   
            let cuerpohtml="";     
        for (let index = 0; index < tiendas.length; index++) {   
            if (tiendas[index].Estado === "0"){
                cuerpohtml=cuerpohtml+`
            <tr>
                <th scope="row">${tiendas[index].Id}</th>
                <td>${tiendas[index].Id_tienda}</td>
                <td>${tiendas[index].Nombre_tienda}</td>
                <td>${tiendas[index].Codigo}</td>
                <td>${tiendas[index].Codigo_compuesto}</td>
                <td>${tiendas[index].Serie}</td>
                <td>${tiendas[index].Correlativo}</td>
                <td>${tiendas[index].Monto}</td>
                <td>${tiendas[index].Estado ? (tiendas[index].Estado === '1' ? 'Esta por Consumir' : 'Esta por Vender') : 'Sin estado'}</td>
                <td>
                <button type="button" class="btn btn-outline-warning" onclick=\'editar_registro(${JSON.stringify(tiendas[index])})\'>EDITAR</button>
                </td>
            </tr>
            `;
        }else{
            cuerpohtml=cuerpohtml+`
            <tr>
            <th scope="row">${tiendas[index].Id}</th>
            <td>${tiendas[index].Id_tienda}</td>
            <td>${tiendas[index].Nombre_tienda}</td>
            <td>${tiendas[index].Codigo}</td>
            <td>${tiendas[index].Codigo_compuesto}</td>
            <td>${tiendas[index].Serie}</td>
            <td>${tiendas[index].Correlativo}</td>
            <td>${tiendas[index].Monto}</td>
            <td>${tiendas[index].Estado ? (tiendas[index].Estado === '1' ? 'Esta por Consumir' : 'Esta por Vender') : 'Sin estado'}</td>
                <td>
                    <button type="button" class="btn btn-outline-warning" onclick=\'editar_registro(${JSON.stringify(tiendas[index])})\'>EDITAR</button>
                </td>
            </tr>
            `;
        }
        }
        document.getElementById("cuerpo-tabla").innerHTML=cuerpohtml;
      })
      .catch((error) => {
        console.log(error)
      });  
}
listarTiendas()