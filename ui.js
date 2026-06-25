const UI = {

allow(e){ e.preventDefault(); },

drag(e){
    e.dataTransfer.setData("id", e.target.dataset.id);
},

drop(e,status){
    App.setStatus(
        Number(e.dataTransfer.getData("id")),
        status
    );
},

render(list){

    ["todo","doing","done"].forEach(id=>{
        document.getElementById(id).innerHTML =
            `<h3>${id}</h3>`;
    });

    list.forEach(t=>{

        const div = document.createElement("div");
        div.className="task";
        div.dataset.id = t.id;
        div.draggable = true;
        div.ondragstart = UI.drag;

        const diff = t.end - Date.now();

        let color =
            diff < 86400000 ? "red" :
            diff < 172800000 ? "yellow" : "blue";

        div.innerHTML = `
            <div>${t.name}</div>
            <div class="timer ${color}">
                ${format(diff)}
            </div>
        `;

        document.getElementById(t.status).appendChild(div);
    });
}

};

function format(ms){
    if(ms<=0) return "已结束";

    let s = Math.floor(ms/1000);
    let d = Math.floor(s/86400); s%=86400;
    let h = Math.floor(s/3600); s%=3600;
    let m = Math.floor(s/60);
    let sec = s%60;

    return (d?d+"天":"")+(h?h+"小时":"")+(m?m+"分":"")+sec+"秒";
}

window.UI = UI;
