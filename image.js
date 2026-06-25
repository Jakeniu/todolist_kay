const ImageTool = {

compress(file, cb){

    const reader = new FileReader();

    reader.onload = e=>{

        const img = new Image();

        img.onload = ()=>{

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            let w = img.width;
            let h = img.height;
            const max = 300;

            if(w>h){
                if(w>max){
                    h *= max/w;
                    w = max;
                }
            }else{
                if(h>max){
                    w *= max/h;
                    h = max;
                }
            }

            canvas.width = w;
            canvas.height = h;

            ctx.drawImage(img,0,0,w,h);

            cb(canvas.toDataURL("image/jpeg",0.7));
        };

        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
},

preview(src){

    const div = document.createElement("div");
    div.className="mask";

    div.innerHTML = `<img src="${src}" />`;

    div.onclick = ()=>div.remove();

    document.body.appendChild(div);
}

};
