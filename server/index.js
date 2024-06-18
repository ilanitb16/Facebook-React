require('dotenv').config()

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {verifyToken} = require("./middleware/verifyToken");
const {mongodbInjector} = require("./middleware/mongodbInjector");

const accountRoutes = require("./routes/accountRoutes");
const friendsRoutes = require("./routes/friendsRoutes");
const postsRoutes = require("./routes/postsRoutes");

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({limit: '50mb'}));
app.use(express.text());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true }));
app.use(verifyToken);
app.use(mongodbInjector);

app.use("/api", accountRoutes);
app.use("/api", friendsRoutes);
app.use("/api", postsRoutes);
app.use(express.static('public'));

app.listen(3000, () => {
    console.info(`Node.js app is listening at http://localhost:3000`);
});