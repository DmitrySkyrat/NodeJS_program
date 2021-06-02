import {Router, Request, Response} from 'express';
const router = Router();


router.get('/', (req: Request, res: Response) => {
  res.send(`
  <div>
    <h1>Hello Dima</h1>
    <p>node application</p>
  </div>
  `);
});

export default router;
