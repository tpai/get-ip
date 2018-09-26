(function() {
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  const parent = document.getElementById('parent');
  const input = document.getElementById('input');

  input.onkeyup = function (event) {
    if (this.value.match(/(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)\/(watch)?(\?v=)?(\S+)?/) !== null) {
      complete(step1);
      active(step2);
      disable(step3);

      if (event.keyCode === 13) {
        complete(step1);
        complete(step2);
        active(step3);

        target.className += ' loading';
        this.disabled = 'true';
        location.assign(`?url=${encodeURIComponent(this.value)}`);
      }
    } else {
      active(step1);
      disable(step2);
      disable(step3);
    }
  };

  function active (target) {
    target.className = 'active step';
  }
  function complete (target) {
    target.className = 'completed step';
  }
  function disable (target) {
    target.className = 'disabled step';
  }
}())
