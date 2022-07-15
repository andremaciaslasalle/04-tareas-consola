const Tarea = require("./tarea");

class Tareas{
    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })
        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea( id = ""){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    crearTarea(desc){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray(tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    listadoCompleto(){
       /*  const lista = this.listadoArr;
        let contador = "";
        let estatus = "";
        for(let i=0; i<lista.length;i++){
            if(lista[i].completadoEn != null){
                contador = `${i+1}`.green;
                estatus = "Completada".green;
            }else{
                contador = `${i+1}`;
                estatus = "Pendiente".red;
            }
            console.log(`${contador}. ${lista[i].desc} :: ${estatus}`);
        } */
        console.log("");
        this.listadoArr.forEach((tarea,idx) =>{
            const i = `${idx+1}.`.green;
            const {desc,completadoEn } = tarea;
            const estado = (completadoEn)?"Completada".green:"Pendiente".red;
            console.log(`${i} ${desc} :: ${estado}`);
        });
    }

    listarPendientesCompletadas(completadas=true){
        console.log("");
        let contador = 0;
        this.listadoArr.forEach(tarea => {
            const {desc,completadoEn} = tarea;
            if(completadas && completadoEn){
                contador += 1;
                const i = `${contador}.`.green;
                console.log(`${i} ${desc} :: ${completadoEn.green}`);
            }else if(!completadas && !completadoEn){
                contador += 1;
                const i = `${contador}.`.green;
                console.log(`${i} ${desc} :: ${"Pendiente".red}`);
            }
        })
    }

    toogleCompletadas( ids =[]){
        ids.forEach(id =>{
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });
        this.listadoArr.forEach(tarea =>{
            if( !ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn=null;
            }
        });
    }

}

module.exports = Tareas