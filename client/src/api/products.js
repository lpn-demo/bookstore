let baseUrl = 'http://localhost:3001/api';

function all(lang, page, pageSize, search, startDate, endDate){

  let url = `/getData?lang=${lang}`;

  if(search !== '' && search !== undefined && search !== null){
    url += `&search=${search}`;
  }

  if(pageSize !== '' && pageSize !== undefined && pageSize !== null){
    url += `&pageSize=${pageSize}`;
  }

  if(startDate !== '' && startDate !== undefined && startDate !== null 
    && endDate !== '' && endDate !== undefined && endDate !== null){
    url += `&startDate=${startDate}&endDate=${endDate}`;
  }

  if(page !== '' && page !== undefined && page !== null){
    url += `&page=${page}`;
  }


	return fetch(baseUrl+url)
					.then((resolve) => resolve.json())
	
}


function getOne(id){
	let url = `/getOne?id=${id}`;

	return fetch(baseUrl+url)
					.then((resolve) => resolve.json())
	
}

function update(id, update){
	let url = '/updateDB';
  let data = {
    id: id,
    update: update
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

function add(data){
	let url = '/putData';	
	return fetch(baseUrl+url,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
		body: JSON.stringify(data)
  }).then((resolve) => resolve.json());
  
}

function remove(id){
	let url = `/removePost`;
	return fetch(baseUrl+url,{
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: id})
    }).then((resolve) => resolve.json());
	
}

export { all, add, update, remove, getOne};