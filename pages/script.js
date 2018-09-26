(function() {
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  const parent = document.getElementById('parent');
  const input = document.getElementById('input');

  input.onkeyup = function (event) {
    if (this.value.match(/(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)\/(watch)?(\?v=)?(\S+)?/) !== null) {
      step1.className = 'completed step';
      step2.className = 'active step';

      if (event.keyCode === 13) {
        step2.className = 'completed step';
        step3.className = 'active step';
        parent.className += ' loading';

        this.disabled = 'true';
        location.assign(`?url=${encodeURIComponent(this.value)}`);
      }
    }
  };
}())
