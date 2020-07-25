const express = require('express');
const port = process.env.PORT || 3000
const app = express();
const router = require('./routes')
const errorHandler = require('./middlewares/error-handler')
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(router);
app.use(errorHandler);

if(process.env.NODE_ENV != "test"){
    app.listen(port, () => {
        console.log(`App listening on http://localhost:${port}`)
    })
}

module.exports = app;