require("colors");

const {mostrarMenu,pausa } = require("./helpers/mensajes");

const main = async() =>{
    let menu = "";
    do{
        menu = await mostrarMenu();
        console.log({menu});
        if(menu!=="0") await pausa();
    }while(menu!=="0");
}
main();