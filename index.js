'use stricts';

const app = require('./src/app');
// const mongodb = require('./mongodb/mongodb.utils');
const port = 8080;
// mongodb.connect();

app.listen(port, ()=>{
    console.log(`running employee app on port ${port}`);
})