import express from 'express'  //Instanciamos express 
import {paginaInicio, 
    paginaNosotros, 
    paginaViajes, 
    paginasTestimoniales,
    paginaDetalleViaje } from '../controllers/paginasController.js' //Importamos desde el controlador
import { guardarTestimonial } from '../controllers/testimonialController.js'

const router = express.Router() //Utilizamos el router de express

//Aqui tenemos tres vistas
router.get('/', paginaInicio)

router.get('/nosotros', paginaNosotros)

router.get('/viajes', paginaViajes)

router.get('/viajes/:slug', paginaDetalleViaje) //Slug es un comodin

router.get('/testimoniales', paginasTestimoniales)
router.post('/testimoniales', guardarTestimonial)

export default router
