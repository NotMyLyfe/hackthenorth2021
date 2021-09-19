require("./handler/notifications");
const app = require('express')();
const cors = require('cors');
const api = require('./routes/api');

app.use(cors());
app.use('/api', api);

app.listen(3000, () => {
    console.log('Listening on port 3000');
})