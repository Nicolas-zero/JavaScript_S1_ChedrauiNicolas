export const perfiles = async (data) =>{
    let plantilla = '';
    for(let i= 0;i<data.length;i++){
        plantilla = plantilla + `<article class="people_menu">
            <div class="foto">
                <img src="${data[i].avatar}" alt="">
            </div>
            <div class="information">
                <h3>${data[i].name_full}</h3>
                <p><strong>${data[i].description}</strong></p>
            </div>
        </article>`;
    }
    return plantilla;
}