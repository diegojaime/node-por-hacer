const descripcion = {
    demand: true,
    alias: 'd'
}

const completado = {
    demand: true,
    alias: 'c',
    default: true,
    desc: 'Marca como completada o pendiente la tarea'
}



const argv = require('yargs')
    .command('crear', 'Crea un elemento por hacer', { descripcion })
    .command('actualizar', 'Actualiza el estado completado de una tarea', { descripcion, completado })
    .command('borrar', 'Borra una tarea por hacer', { descripcion })
    .command('listar', 'Despliega las tareas con el estado especificado', { completado })
    .help()
    .argv

module.exports = {
    argv
}