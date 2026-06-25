const Storage = {

    async load(){
        return await DB.getAll();
    },

    save(tasks){
        DB.saveAll(tasks);
    }
};
