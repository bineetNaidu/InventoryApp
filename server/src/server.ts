import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import 'express-async-errors';

// ***** Routers Routes ******
import { v1Routes } from './routers/v1';

//  ****** Constants *******
const app = express();
const PORT = process.env.PORT || 4242;

// ***** Middlewares *****
app.use(express.json());
app.use(logger('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.json({ msg: 'hello bineet' });
});

app.use('/api', v1Routes);

// **** Listeners ****
app.listen(PORT, () => {
  console.log('-----------------------------------------');
  console.log('>>> INVENTORY API SERVER HAS STARTED <<<');
  console.log('-----------------------------------------');
  if (process.env.NODE_ENV !== 'production') {
    console.log('>> visit: http://localhost:' + PORT);
  }
});
