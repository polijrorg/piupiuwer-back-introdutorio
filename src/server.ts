import express, { Request, Response } from 'express';
import routes from './routes';
import morgan from 'morgan';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(routes);

app.get('/teste', (req: Request, res: Response) => {
    res.json({ message: 'Hello World' });
  });

app.listen(3333, () => {
    console.log(`🚀 \x1b[1;4;96mServer started on port 3333\x1b[0m`);
});
