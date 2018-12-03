const fs = require('fs')

let listadoPorHacer = []

const getListado = (estado) => {

    cargarDB()
        //return listadoPorHacer
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.completado === estado
    })

    if (nuevoListado.length === 0) {
        //console.log(`No se encontraron actividades con valor de completado: ${estado}`);
        throw new Error(`No se encontraron actividades con valor de completado: ${estado}`, true)
    } else {
        return nuevoListado
    }

}

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer)
    fs.writeFile('db/data.json', data, (err) => {
        if (err) {
            throw new Error('No se pudo grabar ', err)
        }
        console.log(`${data} almacenado correctamente`);
    })
}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json')
            //console.log(listadoPorHacer)
            //console.log('leido.')
    } catch (error) {
        listadoPorHacer = []
    }
}

const crear = (descripcion) => {

    cargarDB()

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer)
    guardarDB()
    return porHacer
}

const actualizar = (descripcion, completado = true) => {

    cargarDB()
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)

    if (index >= 0) {
        listadoPorHacer[index].completado = completado
        console.log(listadoPorHacer[index]);
        guardarDB()
        return true
    } else {
        return false
    }
}

const borrar = (descripcion) => {

    cargarDB()
        /* let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)
        if (index >= 0) {
            listadoPorHacer[index] = ''
            return true
        } else {
            console.log(index)
            return false
        }
        */
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    })

    if (listadoPorHacer.length === nuevoListado.length) {
        return false
    } else {
        listadoPorHacer = nuevoListado
        guardarDB()
        return true
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}