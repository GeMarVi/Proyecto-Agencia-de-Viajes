import Sequelize, { DATE, STRING } from 'sequelize';
import db from '../config/db.js';

export const testimonial = db.define('Testimoniales',{
    nombre: {
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    },
    mensaje: {
        type: Sequelize.STRING
    }
})

