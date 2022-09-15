import { Todo } from "../classes";
import { todoList } from "../index";

//referencias en el html
const divTodoList = document.querySelector('.todo-list');
const  txtInput = document.querySelector('.new-todo');
const  btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {

    const htmlTodo = `
        <li class="${(todo.completado ? 'completed' : '')}" data-id="${todo.id}">        
            <div class="view">
                <input class="toggle" type="checkbox" ${(todo.completado ? 'checked' : '')}>
                <label>${ todo.tarea }</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`;



    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;

}


//eventos
//keyup es cuando el usuario suelta la tecla
txtInput.addEventListener('keyup', (event) => {
    if( event.keyCode === 13 && txtInput.value.length > 0){
        const nuevoTodo = new Todo(txtInput.value);
        console.log(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }

});


divTodoList.addEventListener('click', (event) => {

    //para saber que elemento usa: console.log(event.target.localName) y de ahi podemos construir 
    //una const 
    const nombreElemento = event.target.localName; //input, label, button
    //referencia al li
    const todoElemento = event.target.parentElement.parentElement;
    //buscamos el id de cada tarea
    const todoId = todoElemento.getAttribute('data-id');


    if (nombreElemento.includes('input')){  //es decir, si hizo click en el check

        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');

    } else if(nombreElemento.includes('button')){ //hay que borrar el todo
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }

    
   
});

btnBorrar.addEventListener('click', () => {

    todoList.borrarCompletados();

    for(let i = divTodoList.children.length-1; i >= 0; i--){
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }

    }


});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if ( !filtro) {return;}

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');


    for( const elemento of divTodoList.children ){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
            break;


        }
    }



})
