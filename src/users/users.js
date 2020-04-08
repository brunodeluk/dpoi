

async function onInit() {
    
    try {
        showTable(false);
        const users = await fetchUsers();
        populateTable(users);
        showTable(true);
    }
    catch (e) {
        displayError(e?.message || "Could not fetch users, please try again later.");
    }
}

function fetchUsers() {
    return listUsers()
        .then(payload => {
            return payload.items.map(user => new User(user));
        });
}

function displayError(error) {
    const alertBoxRef = document.getElementById('users_table_error_message');
    alertBoxRef.innerText = error;
    alertBoxRef.style.display = 'block';
}

function showLoading(isLoading) {
    const loadingRef = document.getElementById('loading');
    loadingRef.style.display = isLoading ? 'block' : 'none';
}

function showTable(status) {
    const usersTableRef = document.getElementById('users_table');
    usersTableRef.style.display = status ? 'table' : 'none';
}

function populateTable(users) {
    const tableBodyRef = document.getElementById('users_table_body');
    users.forEach(user => {
        const rowRef = document.createElement('tr');
        addCell(rowRef, user.name);
        addCell(rowRef, user.lastname);
        addCell(rowRef, user.email);
        addCell(rowRef, user.phone);
        addCell(rowRef, '📃');
        addCell(rowRef, '✏');
        addCell(rowRef, '❌').onclick = () => deleteUser(user.id);
        tableBodyRef.appendChild(rowRef);
    });
    
}

function addCell(parent, value) {
    const columnRef = document.createElement('td');
    columnRef.innerHTML = value;
    parent.appendChild(columnRef);
    return columnRef;
}

function resetTable() {
    document.getElementById('users_table_body').innerHTML = null;
}

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
    saveUser(user)
        .then(async () => {
            const users = await fetchUsers();
            resetTable();
            populateTable(users);
        })
        .catch(err => console.error(err));
}

