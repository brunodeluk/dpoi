async function onInit() {
    const id = new URLSearchParams(window.location.search).get('id');
    if (id !== null) {
        const user = await getUser(id);
        toHtml(user);
    }
}

function toHtml(user) {
    const listRef = document.getElementById('placeholder');
    Object.keys(user).forEach((key) => {
        const dt = document.createElement('dt');
        dt.innerText = String(key);
        listRef.appendChild(dt);
        const dd = document.createElement('dd');
        dd.innerText = String(user[key]);
        listRef.appendChild(dd);
    });
}