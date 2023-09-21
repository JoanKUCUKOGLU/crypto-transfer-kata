import { Router } from 'express';

// create an express router and export it
const router = Router();

// default route returns a ok status
router.get('/', (req, res) => {
  res.sendStatus(200);
});


router.get('/transactions/:id', (req, res) => {
  console.log("Calling getTransaction", req.params.id);
  
  res.json({id: req.params.id});
});


// export the router
export default router;