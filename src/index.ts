const express = require('express');

import router from './routes/routes';
import { Request } from 'types';

const app = express();

app.use(router);
app.get('*', (req, res: Request) => res.send('cze'));

app.listen(8080, () => console.log(8080));
