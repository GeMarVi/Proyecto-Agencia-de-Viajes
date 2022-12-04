import { Viajes } from '../model/Viajes.js'
import { testimonial } from '../model/Testimoniales.js'

//Render va a escanear los archivos y en views encontrará el archvo nosotros de pug

const paginaInicio = async (req,res) => {
    
    //Consulta la DB viajes y testimoniales simultaneamente
    const promiseDB = [];

          promiseDB.push( Viajes.findAll({ limit: 3 }))
          promiseDB.push( testimonial.findAll({ limit: 3 }))
    
    try {
        const resultado = await Promise.all(promiseDB)

        res.render('inicio', {
            pagina: 'inicio',
            clase: 'home',
            viajes: resultado[0] ,
            allTestimoniales: resultado[1]
        })
    } catch (error) {
        console.log(error)
    }
}

const paginaNosotros = (req,res) => { 
    res.render('nosotros',{
        pagina: 'Nosotros'
    }) 
}

const paginaViajes = async (req,res) =>{ 
    //Consultar DB
    const viajes = await Viajes.findAll() 
    console.log(viajes)

    res.render('viajes',{
        pagina: 'Próximos viajes',
        viajes  //pasamos como propiedad del objeto el arreglo de viajes
    }) 
}

const paginasTestimoniales = async(req,res) =>{ 
    try {
        const allTestimoniales = await testimonial.findAll()
        res.render('testimoniales',{
            pagina: 'Testimoniales',
            allTestimoniales,
        }) 
    } catch (error) {
        console.log(error)
    }
   
}
//Muestra un viaje por su slug
const paginaDetalleViaje = async (req,res) => {
    
    const { slug } = req.params

    try {
       const resultado =  await Viajes.findOne({ where: { slug } })

       res.render('viaje', {
        pagina: 'Información Viaje',
        resultado
       })
    } catch (error) {
        console.log(error)
    }

}


export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginasTestimoniales,
    paginaDetalleViaje
}
