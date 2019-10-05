let baseUrl = 'http://localhost:3001/api';

function login(email, password){
	let url = `/login?`;
  if(email !== '' && email !== undefined && email !== null){
    url += `&email=${email}`;
  }
  if(password !== '' && password !== undefined && password !== null){
    url += `&password=${password}`;
  }
	return fetch(baseUrl+url)
					.then((resolve) => resolve.json())
	
}

function userLoad(token){
	let url = `/userLoad?token=${token}`;
	return fetch(baseUrl+url)
					.then((resolve) => resolve.json())
	
}

function registration(data){
	let url = '/registration';	
	return fetch(baseUrl+url,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
		body: JSON.stringify(data)
  }).then((resolve) => resolve.json());
  
}

function reset(email, oldpassword, newpassword){
	let url = '/reset';
  let data = {
    email: email,
		oldpassword: oldpassword,
		newpassword: newpassword
  }

	return fetch(baseUrl+url,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
		body: JSON.stringify(data)
	}).then((resolve) => resolve.json())
}


export { registration, reset, login, userLoad};