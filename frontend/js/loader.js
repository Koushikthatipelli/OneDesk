function createLoader() {

    if (document.getElementById("globalLoader")) return;

    document.body.insertAdjacentHTML(
        "beforeend",
        `
<div id="globalLoader" class="loader-overlay">

    <div class="loader-box">

        <img
            src="images/logo.png"
            class="loader-logo"
            alt="OneDesk Logo">

        <div class="loader-ring"></div>

        <div id="loaderMessage" class="loader-text">
            Loading...
        </div>

        <div class="loader-sub">
            Please wait...
        </div>

    </div>

</div>
`
    );

}

createLoader();

function showLoader(message = "Loading...") {

    document.getElementById("loaderMessage").textContent = message;

    document.getElementById("globalLoader").classList.add("active");

}

function hideLoader() {

    document.getElementById("globalLoader").classList.remove("active");

}