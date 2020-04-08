// si estariamos trabajando con modulos
// interceptor seria un singleton

interceptor.onRequestCallback((request) => {
    showProgressBar(true);
});

interceptor.onResponseCallback((response) => {
    showProgressBar(false);
});


function showProgressBar(show) {
    const progressBar = document.getElementById("progressBar");
    if (progressBar !== null) {
        if (show) {
            progressBar.classList.remove("hide");
        }
        else {
            progressBar.classList.add("hide");
        }
    }
}
