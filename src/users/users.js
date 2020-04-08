async function onInit() {
    
    try {
        showLoading();
        showTable(false);
        const users = await fetchUsers();
        users.forEach(appendUserToTable);
        showTable();
    }
    catch (e) {
        displayError(e?.message || "Could not fetch users, please try again later.");
    }
    finally {
        showLoading(false);
    }
}

function fetchUsers() {
    return listUsers().then(payload => payload.items.map(user => new User(user)));
}

// Este display error se podria sacar un archivo que cree un alert dialog en algun lado

function displayError(error) {
    const alertBoxRef = document.getElementById('users_table_error_message');
    alertBoxRef.innerText = error;
    alertBoxRef.style.display = 'block';
}

function showLoading(isLoading = true) {
    const loadingRef = document.getElementById('loading');
    loadingRef.style.display = isLoading ? 'block' : 'none';
}

function showTable(status = true) {
    const usersTableRef = document.getElementById('users_table');
    usersTableRef.style.display = status ? 'table' : 'none';
}

// se podria sacar esto a una clase que se encarge de renderizar una tabla
// en en un placeholder

function appendUserToTable(user) {
    const tableRef = document
        .getElementById('users_table')
        .getElementsByTagName('tbody')[0];

    const rowRef = tableRef.insertRow();
    addCell(0, rowRef, user.name);
    addCell(1, rowRef, user.lastname);
    addCell(2, rowRef, user.email);
    addCell(3, rowRef, user.phone);
    addCell(4, rowRef, '📃');
    addCell(5, rowRef, '✏').onclick = () => handleOnEdit(user.id);
    addCell(6, rowRef, '❌').onclick = () => deleteUser(user.id);
}

function addCell(index, rowRef, value) {
    const newCell = rowRef.insertCell(index);
    const text = document.createTextNode(value);
    newCell.appendChild(text);
    return newCell;
}

let isUpdating = false;

// new user

function handleOnSubmit(e) {
    e.preventDefault();
    const elements = Array.from(e.target.elements);
    const preUser = {};

    // no tomamos los ultimos dos elementos que son
    // el submit y el cancel
    for (let i = 0; i < elements.length - 2; i++) {
        const element = e.target.elements[elements[i].name]
        preUser[element.name ? element.name : 'marrital'] = element.value;
    }

    const user = new URLSearchParams(preUser).toString();
    const action = isUpdating ? updateUser(preUser.id, user) : saveUser(user);
    action
        .then(res => appendUserToTable(new User(res)))
        .catch(err => console.error(err));
    isUpdating = false;
}

// edit

// esta variable tiene que volar
// es solamente hsata que hagamos mas de una pagina

async function handleOnEdit(userId) {
    isUpdating = true;
    const formRef = document.getElementsByTagName('form')[0];
    const user = await getUser(userId);
    
    for (let i = 0; i < formRef.elements.length - 2; i++) {
        const element = formRef.elements[formRef.elements[i].name];
        element.value = user[formRef.elements[i].name];
    }
}

