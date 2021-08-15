const peer = new Peer('admin', {
    host: location.hostname,
    debug: 1,
    path: '/myapp'
});
window.peer = peer;

let conn;
let stream;
let callNumber = 0;

peer.on('open', function () {
    window.caststatus.textContent = `Peer is OK with ID: ${peer.id}`;
});

peer.on('connection', async function (connection){
    conn = connection;
    window.caststatus.textContent = `Connected`;
    navigator.mediaDevices.getUserMedia({video: true, audio: true}).then(stream=>window.localStream= stream);

    conn.on('close', function() {
        callNumber +=1;
        window.caststatus.textContent = `Peer is OK with ID: ${peer.id}. Call Number is: ${callNumber}`;
        const tracks = window.localStream.getTracks();
        tracks[0].stop();
        tracks[1].stop();
    });
});

peer.on('call', function(call) {
    window.caststatus.textContent = `Calling`;
    call.answer(window.localStream) // A
});

peer.on('error', err => console.error(err));