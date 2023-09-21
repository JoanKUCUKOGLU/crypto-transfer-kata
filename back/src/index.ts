import express from 'express';
import createRouter from './controller/router';
import { Web3 } from './business/web3';

// Access to the Kerleano testnet
const impl = new Web3("https://cacib-saturn-test.francecentral.cloudapp.azure.com");

// automatically refilled with 1 CRC when it goes below 0.1 CRC
// address is 0x81744044a79528e087bDD5B87cf46Bea34735646
const wallet1Pk = "0x28cd10f20859994826b68824502bb96351d2c970cac4ae294e096cce3d182d12";
const w = impl.walletFromPrivateKey(wallet1Pk);
// console.log("wallet", w);
impl.getBalance(w.address).then(b => console.log("wallet 1 balance", w.address, ':', b)); 


// create an express app
const app = express();

// allows any cors origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', "*")
  next();
});

app.use(express.json());
app.use(createRouter({web3: impl}));

// run the express app
app.listen(3000, () => {
  console.log('server started on port 3000');
});

