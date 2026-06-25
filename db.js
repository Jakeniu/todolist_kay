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
            let tx = this.db.transaction("tasks","readonly");
            let store = tx.objectStore("tasks");
            let req = store.getAll();
            req.onsuccess = ()=>res(req.result);
        });
    },

    saveAll(data){
        let tx = this.db.transaction("tasks","readwrite");
        let store = tx.objectStore("tasks");
        store.clear();
        data.forEach(t=>store.put(t));
    }
};
