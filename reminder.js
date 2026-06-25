const Reminder = {

check(tasks){

    const now = Date.now();

    tasks.forEach(t=>{

        if(t.status==="done") return;

        let diff = t.end - now;

        if(diff<=0 && !t.notified){
            Notification.requestPermission().then(()=>{
                new Notification("任务到期",{
                    body:t.name
                });
            });

            t.notified = true;
        }

    });

}

};
