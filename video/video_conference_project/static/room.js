const roomName = JSON.parse(document.getElementById('room-name').textContent);
const userName = JSON.parse(document.getElementById('user-name').textContent);

let localStream;
const peers = {};

const socket = new WebSocket(
    'ws://' + window.location.host + '/ws/conference/' + roomName + '/'
);

async function init() {
    localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    });
    document.getElementById('local-video').srcObject = localStream;
    
    socket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        handleSignalingData(data);
    };
}

function handleSignalingData(data) {
    switch(data.type) {
        case 'offer':
            handleOffer(data);
            break;
        case 'answer':
            handleAnswer(data);
            break;
        case 'ice-candidate':
            handleIceCandidate(data);
            break;
        case 'user-joined':
            handleUserJoined(data);
            break;
    }
}

// Implement WebRTC connection logic here
// Include functions for handling offers, answers, ICE candidates

// Screen sharing
document.getElementById('share-screen').onclick = async () => {
    try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
            video: true
        });
        // Handle screen sharing stream
    } catch (e) {
        console.error("Error accessing screen share:", e);
    }
};

// Whiteboard functionality
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (!isDrawing) return;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

// File sharing
function shareFile() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    if (file) {
        // Implement file sharing logic
    }
}

init();