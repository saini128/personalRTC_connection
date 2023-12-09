
var peer = new Peer()
var myStream
var peerList = []


//this function will be initiating the peer
function init(userId){
  peer = new Peer(userId)
  peer.on('open',(id)=>{
    console.log(id+" connected") //if we connect successfully this will print
  })

  listenToCall()
}


//this function will keep listening to call or incoming events
function listenToCall(){
  peer.on('call',(call)=>{
    navigator.mediaDevices.getUserMedia({
      video:true,
      audio: true
    }).then((stream)=>{

      myStream = stream
      addLocalVideo(stream)
      call.answer(stream)
      call.on('stream',(remoteStream)=>{
        if(!peerList.includes(call.peer)){
          addRemoteVideo(remoteStream)
          peerList.push(call.peer)
        }
      })
    }).catch((err)=>{
      console.log("unable to connect because "+err)
    })
  })
}

//this function will be called when we try to make a call
// function makeCall(receiverId){
//     navigator.mediaDevices.getUserMedia({
//       video:true,
//       audio: true
//     }).then((stream)=>{
//       myStream = stream
//       addLocalVideo(stream)
//       let call = peer.call(receiverId,stream)
//       call.on('stream',(remoteStream)=>{
//         if(!peerList.includes(call.peer)){
//           addRemoteVideo(remoteStream)
//           peerList.push(call.peer)
//         }
//       })
//     }).catch((err)=>{
//       console.log("unable to connect because "+err)
//     })

// }
function makeCall(receiverId) {
    navigator.mediaDevices.getUserMedia({
        audio: true,  // Enable audio
        video: false  // Disable video
    }).then((stream) => {
        myStream = stream;
        addLocalAudio(stream);  // Assuming you have a function to display local audio
        let call = peer.call(receiverId, stream);
        call.on('stream', (remoteStream) => {
            if (!peerList.includes(call.peer)) {
                addRemoteAudio(remoteStream);  // Assuming you have a function to display remote audio
                peerList.push(call.peer);
            }
        });
    }).catch((err) => {
        console.log("Unable to connect because " + err);
    });
}


//this function will add local stream to video pannel
function addLocalVideo(stream){
  let video = document.createElement("video")
  video.srcObject = stream
  video.classList.add("video")
  video.muted = true // local video need to be mute because of noise issue
  video.play()
  document.getElementById("localVideo").append(video)
}

//this function will add remote stream to video pannel
function addRemoteVideo(stream){
  let video = document.createElement("video")
  video.srcObject = stream
  video.classList.add("video")
  video.play()
  document.getElementById("remoteVideo").append(video)
}




//toggle audio
function toggleAudio(b){
  if(b=="true"){
    myStream.getAudioTracks()[0].enabled = true
  }
  else{
    myStream.getAudioTracks()[0].enabled = false
  }
}
