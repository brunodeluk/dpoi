class User {
    constructor(firstname, lastname, email, phone) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
    }
}

async function onInit() {
    try {
        setLoading(true);
        const users = await fetchUsers();
        populateTable(users);
    }
    catch (e) {
        // si tenemos un error, tenemos que dar feedback
        displayError("Could not fetch users, please try again later.");
    }
    finally {
        setLoading(false);
    }
}

function fetchUsers() {
    return listUsers()
        .then(payload => {
            return payload.items.map(user => 
                new User(user.firstname, 
                    user.lastname, 
                    user.mail,
                    user.phone)
            );
        });
}

function displayError(error) {
    const alertBoxRef = document.getElementById('users_table_error_message');
    alertBoxRef.innerText = error;
    alertBoxRef.style.display = 'block';
}

function setLoading(isLoading) {
    const usersTableRef = document.getElementById('users_table');
    usersTableRef.style.display = isLoading ? 'none' : 'table';
    const loadingRef = document.getElementById('loading');
    loadingRef.style.display = isLoading ? 'block' : 'none';
}

function populateTable(users) {
    const tableBodyRef = document.getElementById('users_table_body');
    users.forEach(user => {
        const rowRef = document.createElement('tr');
        let columnRef = undefined;
        Object.values(user).forEach((value) => {
            columnRef = document.createElement('td');
            columnRef.innerHTML = value?.toString();
            rowRef.appendChild(columnRef);
        });
        
        columnRef = document.createElement('td');
        columnRef.innerHTML = '📃';
        rowRef.appendChild(columnRef);

        columnRef = document.createElement('td');
        columnRef.innerHTML = '✏';
        rowRef.appendChild(columnRef);

        columnRef = document.createElement('td');
        columnRef.innerHTML = '❌';
        rowRef.appendChild(columnRef);

        tableBodyRef.appendChild(rowRef);
    });
    
}

function resetTable() {
    document.getElementById('users_table_body').innerHTML = null;
}

onInit();

