let tasks = [];

const App = {

async init(){
    await DB.init();
    tasks = await DB.getAll();
},

addTask(){

    const name = taskName.value.trim();
    const time = deadline.value;

    if(!name || !time) return;

    tasks.push({
        id: Date.now(),
        name,
        end: new Date(time).getTime(),
        status: "todo",
        notified:false,
        warned:false
    });

    DB.saveAll(tasks);
},

setStatus(id,status){

    const t = tasks.find(x=>x.id===id);
    if(t) t.status = status;

    DB.saveAll(tasks);
},

search(){

    const v = search.value.toLowerCase();

    const filtered = tasks.filter(t =>
        t.name.toLowerCase().includes(v)
    );

    UI.render(filtered);
}

};

window.App = App;
