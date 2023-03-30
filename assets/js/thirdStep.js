const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture');
// const fetch=require('node-fetch');

navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
    video.play();
  })
  .catch((err) => {
    console.log(err);
  });

captureButton.addEventListener('click', async () => {
  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = canvas.toDataURL('image/jpeg', 0.8);
  canvas.style.display="block";
  // TODO: send the imageData to the server for authentication
  const response = await fetch('/thirdAuth', {
    method: 'POST',
    body: JSON.stringify({ imageData}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.text())
  .then(fileName => {
    // navigate to the new URL
    window.location.href = '/' + fileName;
  })
  .catch(error => console.error(error));
});

const closeModal = document.getElementById("close");

// Hide the modal if the user clicks outside of it
window.addEventListener('click',function(event) {
  const modal = document.getElementById("myModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
closeModal.addEventListener('click', function () {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
});


