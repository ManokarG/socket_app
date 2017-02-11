const express=require('express');
const app=express();
const PORT=process.env.PORT||8080;
const http=require('http').Server(app);
const io=require('socket.io')(http);

app.use(express.static(__dirname+'/public'));

io.on('connection',function(socket){
	console.log('User connected via socket.io!');
	socket.on('disconnect',function(){
		console.log('User disconnected via socket.io!');
	});
});

http.listen(PORT,function(){
	console.log(`Server running on ${PORT}`);
});