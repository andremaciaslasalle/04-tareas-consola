require("colors");

//const {mostrarMenu,pausa } = require("./helpers/mensajes");
const {inquirerMenu,pausa } = require("./helpers/inquirer");

const main = async() =>{
    let menu = "";
    do{
        menu = await inquirerMenu();
        console.log({menu});
        await pausa();
    }while(menu!=="0");
}
main();