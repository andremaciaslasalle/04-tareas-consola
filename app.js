require("colors");

//const {mostrarMenu,pausa } = require("./helpers/mensajes");
const {inquirerMenu,pausa,leerInput } = require("./helpers/inquirer");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");

const main = async() =>{
    let menu = "";
    const tareas = new Tareas();
    do{
        menu = await inquirerMenu();
        switch(menu){
            case "1":
                const descripcion = await leerInput("Descripción:");
                tareas.crearTarea(descripcion);
                break;
            case "2":
                console.log(tareas._listado);
                break;
        }
        await pausa();
    }while(menu!=="0");
}
main();