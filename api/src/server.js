require('dotenv').config();
const app = require('./app');

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
