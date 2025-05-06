document.addEventListener('DOMContentLoaded',()=>{
    const datosContenedor = document.querySelector('.opciones');
    const taskInput= document.getElementById('taskInput');
    const addTaskButton = document.getElementById('newTask');

    async function fetchData(){
        const res = await fetch('https://66df3340de4426916ee3dd7e.mockapi.io/tareas');
        data = await res.json();
        return data;
    }
    function displayCapsula(data){

        datosContenedor.innerHTML=``;
        data.forEach(cap =>{
            const capDiv=document.createElement('div');
            if(cap.status=="On hold"){
                console.log(cap.status);
                capDiv.innerHTML=`<div class="capsula">
            <div class="infoText">
                <p>${cap.task}</p>
            </div>
            <div class="botones">
                <div class="terminado">
                    <img src="./storage/img/pngwing.com (2).png" alt="" data-id="${cap.id}" class="completado">
                </div>
                <div class="eliminado">
                    <img src="./storage/img/pngwing.com (4).png" data-id="${cap.id}" alt="" class="eliminado">
                </div>

            </div>
        </div>`;
            }
            else{
                if(cap.status=="ready"){
                    capDiv.innerHTML=`<div class="capsulaNegativa">
            <div class="infoTextNegativa">
                <p>${cap["task"]}</p>
            </div>
            <div class="botonesNegativa">
                <div class="terminadoNegativa">
                    <img src="./storage/img/pngwing.com (2).png" alt="" data-id="${cap.id}" class="completado">
                </div>
                <div class="eliminadoNegativa">
                    <img src="./storage/img/pngwing.com (4).png" data-id="${cap.id}" alt="" class="eliminado">
                </div>

            </div>
        </div>`;
                }
            }
            datosContenedor.appendChild(capDiv);
        })
        document.querySelectorAll('.completado').forEach(button=>{
            button.addEventListener('click',botonCompletado);
        });
        document.querySelectorAll('.eliminado').forEach(button=>{
            button.addEventListener('click',botonEliminado);
        });
    }
    

    async function botonCompletado(event){
        
        const id=event.target.getAttribute('data-id');
        console.log(id);
        await fetch(`https://66df3340de4426916ee3dd7e.mockapi.io/tareas/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                status:'ready'
            })
        });
        const data = await fetchData();
        displayCapsula(data);

    }
    async function botonEliminado(event){
        const id=event.target.getAttribute('data-id');
        console.log(id);
        await fetch(`https://66df3340de4426916ee3dd7e.mockapi.io/tareas/${id}`,{
            method:'DELETE'});
        const data = await fetchData();
        displayCapsula(data);
    }
    async function addNewTask(){
        const task = taskInput.value;
        if(task.trim()===''){
            return true;
        }
        else{
            await fetch(`https://66df3340de4426916ee3dd7e.mockapi.io/tareas/`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    task,status:'On hold'
                })

            });
            taskInput.value='';
            const data = await fetchData();
            displayCapsula(data);
        }
    }
    addTaskButton.addEventListener('click',addNewTask);
    fetchData().then(data=>{
        console.log(data);
        displayCapsula(data);
    })
})