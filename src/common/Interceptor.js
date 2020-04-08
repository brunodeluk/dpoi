function HTTPMiddleware(req, res) {
    this.requestCallback = req;
    this.responseCallback = res;    
}

function Interceptor() {
    this.interceptors = [];
}

Interceptor.prototype = {
    register: function(o) {
        this.interceptors.push(o);
    },
    unregister: function(o) {
        const index = this.interceptors.indexOf(o);
        if (index !== -1) this.interceptors = [...this.interceptors.slice(index), ...this.interceptors.slice(index + 1)];
    },
    onRequest: function(o) {
        this.interceptors.forEach(i => {
            i.requestCallback(o);
        })
    },
    onResponse: function(o) {
        this.interceptors.forEach(i => {
            i.responseCallback(o);
        });
    }
}

const interceptor = new Interceptor();
 