const express = require("express")
const cors = require('cors')
const app = express()
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.post("/register", (req, res) => {
    const {username,password}=req.body
    res.send({
        username,
        password,
    })
});
app.listen(port, () => {
    console.log(`Example appp listening on port ${port}`);
})