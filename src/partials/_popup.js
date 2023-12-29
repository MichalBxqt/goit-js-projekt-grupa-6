
const modal = document.getElementById("myModal");

const btn = document.getElementById("myBtn");

const span = document.querySelector(".popup__close-button-span")

//opening modal w
btn.onclick = function() {
  modal.style.display = "block";
}

//closing modal with "X" button
span.onclick = function() {
  modal.style.display = "none";
}

// closing modal with clicking on background
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// closing modal with esc 
document.addEventListener('keydown', (event) => {
  event.preventDefault()
  if (event.key === 'Escape') {
    modal.style.display = "none"
  }
})