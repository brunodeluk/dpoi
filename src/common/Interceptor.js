function Interceptor() {
    this.requestCallback = undefined;
    this.responseCallback = undefined;    
}

Interceptor.prototype = {
    onRequestCallback: function(callback) {
        this.requestCallback = callback;
    },
    onResponseCallback: function(callback) {
        this.responseCallback = callback;
    },
    onRequest: function(o) {
        this.requestCallback(o);
    },
    onResponse: function(o) {
        this.responseCallback(o);
    }
}

const interceptor = new Interceptor();
 