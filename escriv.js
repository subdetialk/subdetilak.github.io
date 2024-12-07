// Variables globales
let currentUser = "";

// Función para registrar un usuario
function registrarUsuario() {
  const username = document.getElementById('username').value.trim();
  if (username) {
    currentUser = username;
    alert(`Usuario ${username} registrado con éxito`);
    document.querySelector('.inicio').style.display = 'none';
    document.querySelector('.videos').style.display = 'block';
  } else {
    alert('Por favor, ingresa un nombre de usuario.');
  }
}

// Función para subir un video
function subirVideo() {
  const videoInput = document.getElementById('videoInput');
  const videosList = document.getElementById('videos-list');

  if (videoInput.files.length > 0) {
    const videoFile = videoInput.files[0];
    const videoElement = document.createElement('video');
    videoElement.src = URL.createObjectURL(videoFile);
    videoElement.controls = true;

    const container = document.createElement('div');
    container.classList.add('video-container');

    const userInfo = document.createElement('p');
    const date = new Date();
    userInfo.textContent = `${currentUser} publicó este video el ${date.toLocaleDateString()} a las ${date.toLocaleTimeString()}`;

    const likesContainer = document.createElement('div');
    likesContainer.classList.add('likes');

    // Contadores
    let likeCount = 0;
    let dislikeCount = 0;

    const likeButton = document.createElement('button');
    likeButton.innerHTML = `👍 <span class="counter">${likeCount}</span>`;
    likeButton.onclick = () => {
      if (likeButton.classList.contains('active')) {
        likeCount--;
        likeButton.classList.remove('active');
      } else {
        likeCount++;
        dislikeButton.classList.remove('active');
        dislikeCount = Math.max(dislikeCount - 1, 0); // Asegura que no sea negativo
      }
      updateCounters();
    };

    const dislikeButton = document.createElement('button');
    dislikeButton.innerHTML = `👎 <span class="counter">${dislikeCount}</span>`;
    dislikeButton.onclick = () => {
      if (dislikeButton.classList.contains('active')) {
        dislikeCount--;
        dislikeButton.classList.remove('active');
      } else {
        dislikeCount++;
        likeButton.classList.remove('active');
        likeCount = Math.max(likeCount - 1, 0); // Asegura que no sea negativo
      }
      updateCounters();
    };

    function updateCounters() {
      likeButton.innerHTML = `👍 <span class="counter">${likeCount}</span>`;
      dislikeButton.innerHTML = `👎 <span class="counter">${dislikeCount}</span>`;
    }

    likesContainer.append(likeButton, dislikeButton);

    const commentsSection = document.createElement('div');
    commentsSection.classList.add('comments');

    const commentsHeader = document.createElement('h3');
    commentsHeader.textContent = "Comentarios";

    const commentList = document.createElement('ul');

    const commentInput = document.createElement('input');
    commentInput.type = "text";
    commentInput.placeholder = "Escribe un comentario...";
    commentInput.classList.add('comment-input');

    const commentButton = document.createElement('button');
    commentButton.textContent = "Comentar";
    commentButton.onclick = () => {
      if (commentInput.value.trim()) {
        const commentItem = document.createElement('li');
        commentItem.textContent = `${currentUser}: ${commentInput.value.trim()}`;
        commentList.appendChild(commentItem);
        commentInput.value = "";
      }
    };

    commentsSection.append(commentsHeader, commentList, commentInput, commentButton);

    container.append(userInfo, videoElement, likesContainer, commentsSection);
    videosList.appendChild(container);

    alert('Video subido con éxito.');
  } else {
    alert('Por favor, selecciona un video para subir.');
  }
}
