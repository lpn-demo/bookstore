let baseUrl = 'http://localhost:3001/api';


function load(token) {
    let url = '/getDataCart';

    if (token !== null) {
        url += `?token=${token}`;
    }

    return fetch(baseUrl + url)
        .then((response) => response.json());
}

function add(token, products) {
    let url = `/putDataCart`;
    let data = {
        products : products,
        token: token
    }
    return fetch((baseUrl + url), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((resolve) => resolve.json())
}

function remove(token, id){
    let url = `/delDataCart`;
    let data = {
        id : id,
        token: token
    }
    return fetch((baseUrl + url), {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((resolve) => resolve.json())
}


function clean(token){
    let url = `/cleanDataCart`;
    let data = {
        token: token
    }
    return fetch((baseUrl + url), {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((resolve) => resolve.json())
}

export { load, add, remove, clean };