require("colors");

const { guardarDB,leerDB } = require("./helpers/guardarArchivo");
//const {mostrarMenu,pausa } = require("./helpers/mensajes");
const {inquirerMenu,pausa,leerInput,listadoTareasBorrar,confirmar,mostrarListadoCheckList } = require("./helpers/inquirer");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");

const main = async() =>{
    let menu = "";
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }
    do{
        menu = await inquirerMenu();
        switch(menu){
            case "1": //crear tarea
                const descripcion = await leerInput("Descripción:");
                tareas.crearTarea(descripcion);
                break;
            case "2": //listar tareas
                tareas.listadoCompleto();
                break;
            case "3": //listar tareas completadas
                tareas.listarPendientesCompletadas(true);
                break;
            case "4": //listar tareas pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case "5": //completar tareas
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toogleCompletadas(ids);
                break;
            case "6": //borrar tareas
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== "0"){
                    const ok = await confirmar(`¿Está seguro?`);
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log("Tarea borrada");
                    }
                }
                break;
        }
        guardarDB(tareas.listadoArr);
        await pausa();
    }while(menu!=="0");
}
main();