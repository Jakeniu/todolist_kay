let tasks = [];

const App = {

async init(){

    await DB.init();
    tasks = await Storage.load();

    this.loop();
},

addTask(){

    tasks.push({
        id:Date.now(),
        name:taskName.value,
        end:new Date(deadline.value).getTime(),
        status:"todo"
    });

    Storage.save(tasks);
},

setStatus(id,status){

    let t = tasks.find(x=>x.id===id);
    if(t) t.status = status;

    Storage.save(tasks);
},

search(){

    let v = search.value;

    let f = tasks.filter(t=>
        t.name.includes(v)
    );

    UI.render(f);
},

loop(){

    setInterval(()=>{

        UI.render(tasks);

        Reminder.check(tasks);

    },1000);

    this.bind();
},

bind(){

    search.oninput=()=>this.search();
}

};

App.init();
