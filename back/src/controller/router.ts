import { Router } from 'express';
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


  // export the router
  return router;

}

export default createRouter;