document.getElementById('input').onkeyup = function(event) {
  if (event.keyCode === 13) {
    location.href = '?url=' + this.value;
    this.disabled = 'true';
    document.getElementById('mask').style = 'display: flex';
  }
};
