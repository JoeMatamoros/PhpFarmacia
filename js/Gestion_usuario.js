$(document).ready(function(){
    var tipo_usuario = $('#tipo_usuario').val();
    if(tipo_usuario==2){
      $('#button-crear').hide();
    }
    //console.log(tipo_usuario)
    buscar_datos();
    var funcion;
    function buscar_datos (consulta){
        funcion ='buscar_usuarios_adm';
        $.post('../controlador/UsuarioController.php',{consulta,funcion},(response)=>{
           // console.log(response);
           const usuarios = JSON.parse(response);
           let template='';
           usuarios.forEach(usuario=>{
               template+=`
               <div class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
              <div class="card bg-light d-flex flex-fill">
                <div class="card-header text-muted border-bottom-0">
                ${usuario.tipo}
                </div>
                <div class="card-body pt-0">
                  <div class="row">
                    <div class="col-7">
                      <h2 class="lead"><b>${usuario.nombre} ${usuario.apellidos}</b></h2>
                      <p class="text-muted text-sm"><b>Sobre mi: </b>${usuario.adicional} </p>
                      <ul class="ml-4 mb-0 fa-ul text-muted">
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-id-card"></i></span>DNI: ${usuario.dni}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-birthday-cake"></i></span>Edad: ${usuario.edad}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-building"></i></span>Residencia: ${usuario.residencia}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span>Telefono: ${usuario.telefono}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-at"></i></span>Correo: ${usuario.correo}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-smile-wink"></i></span>Sexo: ${usuario.sexo}</li>
                      </ul>
                    </div>
                    <div class="col-5 text-center">
                      <img src="${usuario.avatar}" alt="user-avatar" class="img-circle img-fluid">
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="text-right">`;
                  if(tipo_usuario == 3){
                     if(usuario.tipo_usuario !=3){
                       template+=`
                       <button class="btn btn-danger mr-1">
                         <i class="fas fa-window-close mr-1"></i>Eliminar
                        </button>
                       `; 
                     }
                     if(usuario.tipo_usuario == 2){
                      template+=`
                      <button class="btn btn-primary ml-1">
                        <i class="fas fa-window-close mr-1"></i>Ascender
                       </button>
                      `; 
                     } 
                  }else{
                    if(tipo_usuario == 1 && usuario.tipo_usuario !=1 && usuario.tipo_usuario !=3){
                      template+=`
                      <button class="btn btn-danger">
                        <i class="fas fa-window-close mr-1"></i>Eliminar
                       </button>
                      `; 
                    }
                  }
                  template+=`
                  </div>
                </div>
              </div>
            </div>
               `;
           })
           $('#usuarios').html(template);
        });
    }

    $(document).on('keyup','#buscar', function(){
        let valor = $(this).val();

        if(valor !=""){
            //console.log(valor);
            buscar_datos(valor);
        } else{
            //console.log(valor);
            buscar_datos();
        }
    });

    /*CREAR NUEVO USUARIO*/
    $('#form-crear').submit(e=>{
      let nombre = $('#nombre').val();
      let apellido = $('#apellido').val();
      let edad = $('#edad').val();
      let dni = $('#dni').val();
      let pass = $('#pass').val();

      funcion ='crear_usuario';

      $.post('../controlador/UsuarioController.php',{nombre,apellido,edad,dni,pass,funcion},(response)=>{
        console.log(response);
        if(response == 'add'){
          $('#add').hide('slow');
          $('#add').show(1000);
          $('#add').hide(2000);
          $('#form-crear').trigger('reset');
          buscar_datos();
        } else{
          $('#noadd').hide('slow');
          $('#noadd').show(1000);
          $('#noadd').hide(2000);
          $('#form-crear').trigger('reset');

        }
      });
      e.preventDefault();
    });
})