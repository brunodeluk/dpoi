const CREDENTIALS = 'brunod';
const BASE_URL = 'http://dpoi2012api.appspot.com/api/1.0';

function customFetch(endpoint, method = 'GET', body = undefined) {
    interceptor.onRequest({
        endpoint: endpoint,
        method: method,
        body: body
    });

    return fetch(`${BASE_URL + endpoint}`, { 
            method: method, 
            mode: 'cors',
            body: body 
        })
        .then(res => {
            interceptor.onResponse(res);
            return res;
        })
        .then(res => res.json())
        .then(json => {
            if (json.status.code == 3 || json.status.code == 4) {
                throw Error(json.status.msg);
            }

            return json.payload;
        });
}

const listUsers = () => customFetch(`/list?credential=${CREDENTIALS}`);
const getUser = (id) => customFetch('/user');
const saveUser = (user) => customFetch(`/create?credential=${CREDENTIALS}&` + user, 'POST');
const deleteUser = (id) => customFetch(`/delete?credential=${CREDENTIALS}&id=${id}`, 'POST');


function updateUser(user) {

}

