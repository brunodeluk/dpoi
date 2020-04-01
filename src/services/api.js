const CREDENTIALS = 'brunod';
const BASE_URL = 'http://dpoi2012api.appspot.com/api/1.0';

function customFetch(endpoint, method = 'GET', body = undefined) {
    return fetch(`${BASE_URL + endpoint}`, { 
            method: method, 
            mode: 'cors',
            body: body 
        })
        .then(res => res.json())
        .then(json => {
            if (json.status.code !== 1) {
                throw Error(json.status.msg);
            }

            return json.payload;
        });
}

const listUsers = () => customFetch(`/list?credential=${CREDENTIALS}`);
const getUser = (id) => customFetch('/user');

function deleteUser(id) {

}

function saveUser(user) {

}

function updateUser(user) {

}

