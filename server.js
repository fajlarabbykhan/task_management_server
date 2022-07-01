const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose');
const app = express()
const port = process.env.PORT || 4000;

mongoose.connect('mongodb://localhost/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const userSchema = new mongoose.Schema({
    username: String,
    password: String,

})
const User = mongoose.model('User', userSchema)
app.use(cors());
app.use(express.json());
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).exec();
    if (user) {
        res.status(500);
        res.json({
            message: "User Already Exist",
        })
        return;
    }
    // const user= new User({username,password});
    await User.create({ username, password });
    res.json({
        message: "success",
    })
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "))
db.once("open", function () {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});