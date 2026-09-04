// Correção do Jogo das Cores: cada resposta é um botão preenchido exatamente com a cor do nome.
(function(){
  const originalOptions = window.options;
  window.options = function(){
    if(window.state && window.state.game === 'colors'){
      const d = window.data();
      const n = window.difficulty();
      return window.shuffle([d,...window.shuffle(window.games.colors.rounds.filter(x=>x[1]!==d[1])).slice(0,n-1)])
        .map(x=>({emoji:x[0],label:x[1],key:x[1],color:x[2]}));
    }
    return originalOptions();
  };
})();
