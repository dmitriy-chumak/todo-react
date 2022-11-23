const express = require("express");
const studentRouter = require('../routes/student.routes')

const app = express();
app.use(express.json())
app.use('/api', studentRouter)
app.get("/", function(request, response){
     
  response.send("Hello NPI!!!");
});

app.listen(3000);