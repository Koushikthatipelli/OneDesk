if(!document.getElementById("toastContainer")){

    document.body.insertAdjacentHTML(

        "beforeend",

        `<div id="toastContainer" class="toast-container"></div>`

    );

}

function showToast(type,message){

    const icons={

        success:"✅",

        error:"❌",

        warning:"⚠️"

    };

    const toast=document.createElement("div");

    toast.className=`toast ${type}`;

    toast.innerHTML=`

        <div class="toast-icon">

            ${icons[type]}

        </div>

        <div class="toast-message">

            ${message}

        </div>

    `;

    document
        .getElementById("toastContainer")
        .appendChild(toast);

    setTimeout(()=>{

        toast.style.animation="slideOut .3s forwards";

        setTimeout(()=>{

            toast.remove();

        },300);

    },3000);

}

function showSuccess(message){

    showToast("success",message);

}

function showError(message){

    showToast("error",message);

}

function showWarning(message){

    showToast("warning",message);

}