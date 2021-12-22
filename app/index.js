const express = require('express');
const app = express();

const Router = require('./routers/MainRouter');
app.use('/', Router);

const PORT  = process.env.PORT || 3000
app.listen(PORT,()=> console.info(`Server has started on ${PORT}`));