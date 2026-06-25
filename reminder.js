const Reminder = {

check(){

    const now = Date.now();

    tasks.forEach(t=>{

        if(t.status === "done") return;

        const diff = t.end - now;

        if(diff <= 0 && !t.notified){

            alert("⏰ 到期：" + t.name);
            t.notified = true;
        }

        if(diff > 0 && diff <= 86400000 && !t.warned){

            alert("⚠️ 24小时提醒：" + t.name);
            t.warned = true;
        }

    });

    DB.saveAll(tasks);
}

};

window.Reminder = Reminder;
