const UI = {

allow(e){ e.preventDefault(); },

drag(e){
    e.dataTransfer.setData("id",e.target.dataset.id);
},

drop(e,status){
    App.setStatus(Number(e.dataTransfer.getData("id")),status);
},

render(tasks){

    ["todo","doing","done"].forEach(id=>{
        document.getElementById(id).innerHTML =
            `<h3>${id}</h3>`;
    });

    tasks.forEach(t=>{

        const div = document.createElement("div");
        div.className="task";
        div.draggable=true;
        div.dataset.id=t.id;
        div.ondragstart=this.drag;

        const diff = t.end - Date.now();

        let color =
            diff<86400000?"red":
            diff<172800000?"yellow":"blue";

        div.innerHTML=`
            <div>${t.name}</div>
            <div class="timer ${color}">
                ${Math.floor(diff/1000)}s
            </div>
        `;

        document.getElementById(t.status).appendChild(div);
    });
}

};
