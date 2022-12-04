import { testimonial } from '../model/Testimoniales.js'

const guardarTestimonial = async (req, res) => {
   //Validar que el formulario tenga información
   const {nombre, correo, mensaje} = req.body

   const errores = []

   if(nombre.trim() === ''){
      errores.push({mensaje: 'El nombre está vacio'})
   }
   if(correo.trim() === ''){
    errores.push({mensaje: 'El correo está vacio'})
   }
   if(mensaje.trim() === ''){
    errores.push({mensaje: 'El correo está vacio'})
   }
   if(errores.length > 0){

    //Consultar testimoniales existentes
    const allTestimoniales = await testimonial.findAll()

       res.render('testimoniales', {
           pagina: 'Testimoniales',
           errores,
           nombre,
           correo,
           mensaje,
           allTestimoniales,
       })
   }else{ 
    //Almacenarlo en la base de datos
       try {
         await testimonial.create({
            nombre,
            correo,
            mensaje
         })

         res.redirect('/testimoniales')
       } catch (error) {
         console.log(error)
       }
   }
}

export {
    guardarTestimonial
}