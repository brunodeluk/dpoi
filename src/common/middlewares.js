// por ahora lo dejo asi pero se podria tener un prograsBarInterceptor, un printInterceptor, etc.

// print middleware

interceptor.register(new HTTPMiddleware(
    (request) => {
        console.log('👉 request', JSON.stringify(request, null, 2));
    },
    (response) => {
        console.log('👈 response', JSON.stringify(response, null, 2));
    }
));

// progress dialog middleware

interceptor.register(new HTTPMiddleware(
    () => showProgressBar(true),
    () => showProgressBar(false)
));

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
