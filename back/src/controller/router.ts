import { Router, request } from 'express';
import { BusinessLogic } from '../interfaces/business';

// force BigInt to be serialized as string in the JSON serialization
(BigInt.prototype as any).toJSON = function() { return this.toString() }

const createRouter = (bl: BusinessLogic) => {
  // create an express router and export it
  const router = Router();

  // default route returns a ok status
  router.get('/', (req, res) => {
    res.sendStatus(200);
  });


  router.get('/transactions/:id', async (req, res) => {
    console.log("Calling getTransaction", req.params.id);
    try {
      const t = await bl.web3.getTransaction(req.params.id);
      console.log("Transaction found", t)
      res.json(t);
    } catch (error: unknown) {
      res.status(500).json({error: (error as Error).message});
      console.error("Error in getTransaction", error);
    }
  });

  router.post('/transfer', async (req, res) => {
    try {
      const tx = await bl.web3.createTransferTransaction(req.body.from, req.body.to, BigInt(req.body.amount))
      const signedTx = await bl.store.signTx(req.body.from, tx);
      const hash = await bl.web3.sendSignedTransaction(signedTx);
      res.json({hash})
    } catch (error) {
      res.status(500).json({error: (error as Error).message});
      console.error("Error in making a transfer", error);
    }
  });

  router.post('/wallets/new', async (req, res) => {
    console.log("Calling newWallet");
    try {
      const w = bl.store.newWallet();
      console.log("wallet created and stored", w);
      res.json(w);
    } catch (error: unknown) {
      res.status(500).json({error: (error as Error).message});
      console.error("Error in newWallet", error);
    }
  });

  router.get('/wallets', async (req, res) => {
    console.log("Calling listWallets");
    try {
      const list = bl.store.list();
      res.json(list);
    } catch (error: unknown) {
      res.status(500).json({error: (error as Error).message});
      console.error("Error in listWallets", error);
    }
  });

  router.get('/wallets/:address/balance', async (req, res) => {
    console.log("Calling getBalance", req.params.address);
    try {
      const b = await bl.web3.getBalance(req.params.address);
      res.json({wallet: req.params.address, balance: b});
    } catch (error: unknown) {
      res.status(500).json({error: (error as Error).message});
      console.error("Error in getBalance", error);
    }
  });
  // export the router
  return router;

}

export default createRouter;