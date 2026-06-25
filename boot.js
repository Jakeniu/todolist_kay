window.onload = async () => {

    await App.init();

    UI.render(tasks);

    setInterval(() => {

        UI.render(tasks);
        Reminder.check();

    }, 1000);

    document.getElementById("search")
        .oninput = () => App.search();

    console.log("✅ V8.1 FINAL RUNNING");
};
