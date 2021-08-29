
var chatText = document.getElementById('chatText');
var chatInput = document.getElementById('chatInput');
var chatForm = document.getElementById('chatForm');
var chat = '<div>Welcome to Meadow Guarder ' + VERSION + '!</div>';
chatText.innerHTML = '<div>Welcome to Meadow Guarder ' + VERSION + '!</div>';
var chatPress = false;
var inChat = false;

socket.on('addToChat',function(data){
    var scroll = false;
    if(chatText.scrollTop + chatText.clientHeight >= chatText.scrollHeight - 5){
        scroll = true;
    }
    var d = new Date();
    var m = '' + d.getMinutes();
    if(m.length === 1){
        m = '' + 0 + m;
    }
    if(m === '0'){
        m = '00';
    }
    var message = data.message.replace(/</gi,'&lt;');
    message = message.replace(/>/gi,'&gt;');
    chat += '<div class="text" style="color:' + data.color + '";">[' + d.getHours() + ':' + m + '] ' + message + '</div>';
    chatText.innerHTML = chat;
    if(scroll){
        chatText.scrollTop = chatText.scrollHeight;
    }
});
chatForm.onsubmit = function(e){
    e.preventDefault();
    socket.emit('chatMessage',chatInput.value);
    chatInput.value = '';
}
chatInput.onkeydown = function(e){
    chatPress = true;
}
chatInput.onmousedown = function(e){
    inChat = true;
    socket.emit('keyPress',{state:'releaseAll'});
}