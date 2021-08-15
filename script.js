const peer = new Peer(''+Math.floor(Math.random()*2**18).toString(36).padStart(4,0), {
    host: location.hostname,
    debug: 1,
    path: '/myapp'
});
navigator.mediaDevices.getUserMedia({video: true, audio: true}).then(stream=>window.localStream= stream);
window.peer = peer;

peer.on('open', function () {
    window.caststatus.textContent = `Your device ID is: ${peer.id}`;
});

const callBtn = document.querySelector('.call-btn');
const audioContainer = document.querySelector('.call-container');
const hangUpBtn = document.querySelector('.hangup-btn');

let conn;
let call;

function showConnectedContent() {
    window.caststatus.textContent = `You're connected`;
    callBtn.hidden = true;
    audioContainer.hidden = false;
}

function showCallContent() {
    window.caststatus.textContent = `Your device ID is: ${peer.id}`;
    callBtn.hidden = false;
    audioContainer.hidden = true;
}

callBtn.addEventListener('click', function(){
    code = 'admin';
    conn = peer.connect(code);
    setTimeout(()=>{
        call = peer.call(code, window.localStream);
        call.on('stream', function(stream) { // B
            window.remoteVideo.srcObject = stream; // C
            window.remoteVideo.autoplay = true; // D
            window.remoteVideo.addEventListener('loadedmetadata', () => { // Play the video as it loads
                window.remoteVideo.play()
            })
            showConnectedContent(); //F
        });
        console.log('Ok')
    },2000);
})

hangUpBtn.addEventListener('click', function (){
    call.close();
    conn.close();
    showCallContent();
})

peer.on('error', err => console.error(err));