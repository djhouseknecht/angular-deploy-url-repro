const express = require('express');
const yargs = require('yargs');
const cors = require('cors');
const app = express();

const argv = { ...yargs(process.argv).argv };
const dir = argv.dir;
const port = argv.port;

app.use(cors());
app.use(express.static(dir));

app.listen(port, () => {
  console.log(`Servering dir: '${dir}/' and listening on http://localhost:${port}`);
});