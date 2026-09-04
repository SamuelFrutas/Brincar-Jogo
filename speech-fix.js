/* Garante que uma fala terminou de verdade antes de a próxima começar. */
(function(){
  const originalSpeak = window.speak;
  if(typeof originalSpeak !== 'function') return;

  window.speak = function(text){
    if(!window.state || !state.sound || !window.speechSynthesis) return Promise.resolve();

    speechSynthesis.cancel();
    state.speaking = true;

    return new Promise(resolve=>{
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'pt-BR';
      u.rate = .84;
      u.pitch = 1.1;

      let finished = false;
      let endSeen = false;
      let stableChecks = 0;

      const finish = ()=>{
        if(finished) return;
        finished = true;
        state.speaking = false;
        resolve();
      };

      const check = ()=>{
        if(finished) return;
        if(endSeen && !speechSynthesis.speaking && !speechSynthesis.pending){
          stableChecks++;
          if(stableChecks >= 4){
            setTimeout(finish, 450);
            return;
          }
        } else {
          stableChecks = 0;
        }
        setTimeout(check, 100);
      };

      u.onend = ()=>{ endSeen = true; check(); };
      u.onerror = ()=>{ endSeen = true; check(); };

      speechSynthesis.speak(u);
      setTimeout(()=>{
        if(!endSeen && !speechSynthesis.speaking && !speechSynthesis.pending) finish();
      }, 1000);
    });
  };
})();
