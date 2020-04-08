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
        .then(res => res.json())
        .then(json => {
            interceptor.onResponse(json);
            return json;
        })
        .then(json => {
            if (json.status.code == 3 || json.status.code == 4) {
                throw Error(json.status.msg);
            }

            return json.payload;
        });
}

const listUsers = () => customFetch(`/list?credential=${CREDENTIALS}`);
const listUsersWithDelay = () => customFetch(`/list_delay?credential=${CREDENTIALS}`);
const getUser = (id) => customFetch(`/view?credential=${CREDENTIALS}&id=${id}`);
const saveUser = (user) => customFetch(`/create?credential=${CREDENTIALS}&${user}`, 'POST');
const updateUser = (id, user) => customFetch(`/update?credential=${CREDENTIALS}&id=${id}&${user}`, 'POST');
const deleteUser = (id) => customFetch(`/delete?credential=${CREDENTIALS}&id=${id}`, 'POST');


