$(document).ready(function(){
    buscar_tip();
    var funcion;
    var edit = false; //VARIABLE DE BANDERA

    $('#form-crear-tipo').submit(e=>{

        let nombre_tipo=$('#nombre-tipo').val();
        let id_editado=$('#id_editar_tip').val();
        if(edit == false){
            funcion='crear';
        }else {
            funcion ='editar';
        }
        

        $.post('../controlador/TipoController.php',{nombre_tipo,id_editado,funcion},(response)=>{
            //console.log(response);
            if(response == 'add'){
                $('#add-tipo').hide('slow');
                $('#add-tipo').show(1000);
                $('#add-tipo').hide(2000);
                $('#form-crear-tipo').trigger('reset');
                buscar_tip();

            } 
            if(response == 'noadd'){
                $('#noadd-tipo').hide('slow');
                $('#noadd-tipo').show(1000);
                $('#noadd-tipo').hide(2000);
                $('#form-crear-tipo').trigger('reset');

            }

            if(response == 'edit'){
                $('#edit-tip').hide('slow');
                $('#edit-tip').show(1000);
                $('#edit-tip').hide(2000);
                $('#form-crear-tipo').trigger('reset');
                buscar_tip(); 
            }
            edit == false;
        })
        e.preventDefault();
    });

    function buscar_tip(consulta){
        funcion='buscar';
        $.post('../controlador/TipoController.php',{consulta,funcion},(response)=>{
            /*La variable tipos viene del html con id="laboratorios" ubicado en tbody */
            const tipos = JSON.parse(response);
            let template ='';
            tipos.forEach(tipo => {
               template+=`
                       <tr tipId="${tipo.id}" tipNombre="${tipo.nombre}">
                       <td>
                            <button class="editar-tip btn btn-success" title="Editar laboratorio" type="button" data-toggle="modal" data-target="#creartipo">
                               <i class="fas fa-pencil-alt"></i>
                            </button>
                            <button class="borrar-tip btn btn-danger" title="Borrar laboratorio">
                               <i class="fas fa-trash-alt"></i>
                            </button>
                       </td>
                           <td>${tipo.nombre}</td> 
                       </tr> 
               ` ;
            });
            $('#tipos').html(template);
        })
    }

    /*FUNCION PARA EL BUSCADOR DINAMICO*/
    $(document).on('keyup','#buscar-tipo',function(){
       let valor = $(this).val();
       if(valor!=''){
         buscar_tip(valor);
       } else{
         buscar_tip();
       }
    })

    /*ELIMINAR LABORATORIO */
    $(document).on('click','.borrar-tip',(e)=>{

        funcion="borrar";
        const elemento=$(this)[0].activeElement.parentElement.parentElement;
        const id = $(elemento).attr('tipId');
        const nombre = $(elemento).attr('tipNombre');
        
        
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger mr-1'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Desea eliminar el laboratorio '+nombre+'?',
            text: "No podrás revertir la acción!",
            icon:'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, deseo eliminar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                $.post('../controlador/TipoController.php',{id,funcion},(response)=>{
                    edit == false;
                    if(response == 'borrado'){
                        swalWithBootstrapButtons.fire(
                            'Eliminado!',
                            'El tipo '+nombre+' fue eliminado',
                            'success'
                          )
                          buscar_tip();
                    } else{
                        swalWithBootstrapButtons.fire(
                            'No se pudo eliminar!',
                            'El tipo '+nombre+' no fue eliminado porque está siendo usado en un producto.',
                            'error'
                          ) 
                    }
                })
              
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                  'Cancelado!',
                  'El tipo '+nombre+' no fue eliminado',
                  'error'
                )  
            }
          })
    })

    /*EDITAR LABORATORIO */
    $(document).on('click','.editar-tip',(e)=>{

        const elemento=$(this)[0].activeElement.parentElement.parentElement;
        const id = $(elemento).attr('tipId');
        const nombre = $(elemento).attr('tipNombre');
        $('#id_editar_tip').val(id);
        $('#nombre-tipo').val(nombre);
        edit = true;
        
    })


}); 