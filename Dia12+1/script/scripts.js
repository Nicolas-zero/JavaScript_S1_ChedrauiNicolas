document.addEventListener('DOMContentLoaded',()=>{
    const datosContenedor = document.querySelector('.opciones');

    async function fetchData(){
        const res = await fetch('https://66df3340de4426916ee3dd7e.mockapi.io/tareas');
        data = await res.json();
        return data;
    }
    function displayCapsula(data){

        datosContenedor.innerHTML=``;
        data.forEach(cap =>{
            const capDiv=document.createElement('div');
            if(cap.status="On hold"){
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
            datosContenedor.appendChild(capDiv);
        })
    }

    fetchData().then(data=>{
        console.log(data);
        displayCapsula(data);
    })
})