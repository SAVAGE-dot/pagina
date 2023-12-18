document.getElementById("login").addEventListener("click",
function(){
    consultarUsuario();
});



function consultarUsuario(){
    let usuario = document.getElementById("alias").value;
    let contraseña  = document.getElementById("password").value;

    var formData = new FormData();
    formData.append('alias', usuario);
    formData.append('password', contraseña);
    
    fetch("../Routes/usuario/iniciarsesion", { method : 'POST', body : formData})
    .then(function(response){
        return response.json();

    })
    .then(function (body){

        if (body.success){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
              });
            window.location.href = "../Views/index.php"
        }else {
            Swal.fire({
                icon: "error",
                text: "Credenciales Incorrectas!",
              });
        }
    });
}

