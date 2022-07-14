$(document).ready(function(){
    var funcion;
    buscar_prov();

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
                        <button class="avatar btn btn-sm btn-info" title="Cambiar avatar">
                            <i class="fas fa-image"></i>
                        </button>

                        <button class="avatar btn btn-sm btn-success" title="Editar proveedor">
                            <i class="fas fa-pencil-alt"></i>
                         </button>

                        <button class="avatar btn btn-sm btn-danger" title="Eliminar proveedor">
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


    $(document).on('keyup','#buscar_proveedor',function(){
        let valor = $(this).val();
        if(valor !=""){
            buscar_prov(valor);
        } else {
            buscar_prov();
        }
    })
});