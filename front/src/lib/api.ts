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

export async function transfer(from:string, to: string, amount: number) {
  const r = await post('/transfer', {from, to, amount: `${amount}`})
  return r.hash;
}

export function listWallets(): Promise<string[]> {
    return get('/wallets');
}

export async function getBalance(address: string): Promise<string> {
    const r = await get(`/wallets/${address}/balance`);
    return r.balance;
}