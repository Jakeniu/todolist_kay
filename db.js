const DB = {
    db: null,

    init(){
        return new Promise((resolve)=>{
            const req = indexedDB.open("task_v8",1);

            req.onupgradeneeded = e=>{
                let db = e.target.result;
                db.createObjectStore("tasks",{keyPath:"id"});
            };

            req.onsuccess = e=>{
                this.db = e.target.result;
                resolve();
            };
        });
    },

    getAll(){
        return new Promise(res=>{
            const tx = this.db.transaction("tasks","readonly");
            const store = tx.objectStore("tasks");
            const req = store.getAll();

            req.onsuccess = () => {
                res(req.result || []);
            };
        });
    },

    saveAll(tasks){
        const tx = this.db.transaction("tasks","readwrite");
        const store = tx.objectStore("tasks");

        store.clear();
        tasks.forEach(t => store.put(t));
    }
};
