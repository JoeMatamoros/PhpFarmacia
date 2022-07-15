$(document).ready(function(){
    var funcion;
    buscar_prov();

    /*FUNCION PARA CREAR PROVEEDOR */
     $('#form-crear').submit(e=>{
        let nombre = $('#nombre').val();
        let telefono = $('#telefono').val();
        let correo = $('#correo').val();
        let direccion = $('#direccion').val();
        funcion = 'crear';

        $.post('../controlador/ProveedorController.php',{nombre,telefono,correo,direccion,funcion},(response)=>{
           /* Mostrar la respuesta de la base de datos
            console.log(response);*/
            if(response == 'add'){
                $('#add-prov').hide('slow');
                $('#add-prov').show(1000);
                $('#add-prov').hide(2000);
                $('#form-crear').trigger('reset');   
            }

            if(response == 'noadd' ){
                $('#noadd-prov').hide('slow');
                $('#noadd-prov').show(1000);
                $('#noadd-prov').hide(2000);
                $('#form-crear').trigger('reset');
            }   

        });
        e.preventDefault();
    })

    function buscar_prov(consulta) {
        funcion = "buscar";
        $.post('../controlador/ProveedorController.php',{consulta,funcion},(response)=>{
            //console.log(response);
            const proveedores = JSON.parse(response);
            let template = '';
            proveedores.forEach(proveedor=>{
                template += `
                <div provId="${proveedor.id}" provNombre="${proveedor.nombre}" provTelefono="${proveedor.telefono}" provCorreo="${proveedor.correo}" provDireccion="${proveedor.direccion}" provAvatar="${proveedor.avatar}" class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
                    <div class="card bg-light d-flex flex-fill">
                    <div class="card-header text-muted border-bottom-0">
                        <h1 class="badge badge-success">Proveedor</h1>
                    </div>
                    <div class="card-body pt-0">
                        <div class="row">
                        <div class="col-7">
                            <h2 class="lead"><b>${proveedor.nombre}</b></h2>
                            <ul class="ml-4 mb-0 fa-ul text-muted">
                                <li class="small"><span class="fa-li"><i class="fas fa-lg fa-building"></i></span>Dirección: ${proveedor.direccion}</li>
                                <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span>Telefono: ${proveedor.telefono}</li>
                                <li class="small"><span class="fa-li"><i class="fas fa-lg fa-at"></i></span>Telefono: ${proveedor.correo}</li>
                            </ul>
                        </div>
                        <div class="col-5 text-center">
                            <img src="${proveedor.avatar}" alt="user-avatar" class="img-circle img-fluid">
                        </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="text-right">
                        <button class="avatar btn btn-sm btn-info" title="Cambiar avatar" type="button" data-toggle="modal" data-target="#cambiologo" aria-hidden="true">
                            <i class="fas fa-image"></i>
                        </button>

                        <button class="editar btn btn-sm btn-success" title="Editar proveedor">
                            <i class="fas fa-pencil-alt"></i>
                         </button>

                        <button class="borrar btn btn-sm btn-danger" title="Eliminar proveedor">
                            <i class="fas fa-trash"></i>
                        </button>
                        </div>
                    </div>
                    </div>
              </div>
                `;
            });
            $('#proveedores').html(template);
            
        })
    }

    /*BUSCADOR DINAMICO*/
    $(document).on('keyup','#buscar_proveedor',function(){
        let valor = $(this).val();
        if(valor !=""){
            buscar_prov(valor);
        } else {
            buscar_prov();
        }
    })

    /*PASAR DATOS DE PROVEEDOR AL HTML*/
    $(document).on('click','.avatar',(e)=>{
        funcion = "cambiar_logo";
        const elemento = $(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
        const id = $(elemento).attr('provId');
        const nombre = $(elemento).attr('provNombre');
        const avatar = $(elemento).attr('provAvatar');

       $('#logoactual').attr('src', avatar);
       $('#nombre_logo').html(nombre);
       $('#funcion').val(funcion);
       $('#id_logo_prov').val(id);
       $('#avatar').val(avatar);
    
    });

    /*FUNCION PARA CAMBIAR AVATAR */
    $('#form-logo').submit(e=>{
        let formData = new FormData($('#form-logo')[0]);
        $.ajax({
            url:'../controlador/ProveedorController.php',
            type:'POST',
            data:formData,
            cache:false,
            processData:false,
            contentType:false
        }).done(function(response){
         const json = JSON.parse(response);
         if(json.alert == 'edit'){
             $('#logoactual').attr('src',json.ruta);
             $('#form-logo').trigger('reset');
             $('#edit-prov').hide('slow');
             $('#edit-prov').show(1000);
             $('#edit-prov').hide(2000);
            buscar_prov();
         } else{
            $('#noedit-prov').hide('slow');
            $('#noedit-prov').show(1000);
            $('#noedit-prov').hide(2000);
            $('#form-logo').trigger('reset');
         }
          
        });
        e.preventDefault();
    });

    /*FUNCION PARA ELIMINAR */
    $(document).on('click','.borrar',(e)=>{

        funcion="borrar";
        const elemento=$(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
        //console.log(elemento);
        const id = $(elemento).attr('provId');
        const nombre = $(elemento).attr('provNombre');
        const avatar = $(elemento).attr('provAvatar');
        
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger mr-1'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Desea eliminar el proveedor '+nombre+'?',
            text: "No podrás revertir la acción.",
            imageUrl:''+avatar+'',
            imageWidth:100,
            imageHeight:100,
            showCancelButton: true,
            confirmButtonText: 'Si, deseo eliminar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                $.post('../controlador/ProveedorController.php',{id,funcion},(response)=>{
                    
                    if(response == 'borrado'){
                        swalWithBootstrapButtons.fire(
                            'Eliminado!',
                            'El proveedor '+nombre+' fue eliminado',
                            'success'
                          )
                          buscar_prov();
                    } else{
                        swalWithBootstrapButtons.fire(
                            'No se pudo eliminar!',
                            'El proveedor '+nombre+' no fue eliminado porque está siendo usado en un producto.',
                            'error'
                          ) 
                    }
                })
              
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                  'Cancelado!',
                  'El proveedor '+nombre+' no fue eliminado',
                  'error'
                )  
            }
          })
    })


});