const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);

const io=socketIo(server);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,'public')));
io.on("connection",function(socket){
    socket.on("send-location",function(data){
        io.emit("recive-location",{id:socket.id, ...data});
    });
    console.log("connected");
    socket.on("disconnect",function(){
        io.emit("user-disconnect",socket.id);
    })
});
app.get('/', function (req, res){
  res.render("index");
});


server.listen(port, function () {
  console.log(`RealTime-tracker app listening on port ${port}`);
});