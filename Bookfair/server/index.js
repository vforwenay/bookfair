const express = require('express');
const cors = require("cors");
const index = require("./routes/index");

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const app = express();
const port = process.env.PORT || 4000;


const corsOptions = {
  origin: ["http://localhost:3000", "https://bookfairbyalok-ui.netlify.app"],
  methods: ["GET", "POST"],
};

app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cors(corsOptions));
 

app.use(index);
app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});