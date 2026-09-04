/* Garante que uma fala termine de verdade antes da próxima pergunta. */
(function(){
  let generation = 0;

  window.speak = function(text){
    if(typeof state === 'undefined' || !state.sound || !window.speechSynthesis) return Promise.resolve();

    const myGeneration = ++generation;
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
        if(finished || myGeneration !== generation) return;
        finished = true;
        state.speaking = false;
        resolve();
      };

      const check = ()=>{
        if(finished || myGeneration !== generation) return;
        if(endSeen && !speechSynthesis.speaking && !speechSynthesis.pending){
          stableChecks++;
          if(stableChecks >= 4){
            setTimeout(finish, 450);
            return;
          }
        }else{
          stableChecks = 0;
        }
        setTimeout(check,100);
      };

      u.onend = ()=>{if(myGeneration !== generation)return;endSeen=true;check()};
      u.onerror = ()=>{if(myGeneration !== generation)return;endSeen=true;check()};
      speechSynthesis.speak(u);
    });
  };
})();
