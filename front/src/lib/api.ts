const apiUrl = 'http://localhost:3000';
const headers = {
    'Content-Type': 'application/json',
};


async function get(path: string) {
    const r = await fetch(`${apiUrl}${path}`, {
        method: 'GET',
        headers,
    });
    if( r.ok ) {
        return r.json();
    } else {
        throw new Error(`Error GET ${path} ${r.status} ${r.statusText}`);
    }
}

async function post(path: string, body: any) {
    const r = await fetch(`${apiUrl}${path}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    });
    if( r.ok ) {
      return r.json();
  } else {
      throw new Error(`Error POST ${path} ${r.status} ${r.statusText}`);
  }
}

export function getTransaction(id: string) {
    return get(`/transactions/${id}`);
}

export function newWallet(): Promise<any> {
  return post('/wallets/new', {});
}

export function transfer(from:string, to: string, amount: number) {
  return post('/transfer', {from, to, amount: `${amount}`})
}