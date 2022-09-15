//uso export porque la voy a usar fuera del archivo
export class Todo{

    constructor( tarea ){

        this.tarea = tarea;

        this.id    = new Date().getTime();
        this.completato = false;
        this.creado = new Date(); 

    }
}