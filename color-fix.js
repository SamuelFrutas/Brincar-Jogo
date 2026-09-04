// Correção visual do Jogo das Cores.
// Os botões mostram o nome correto e ficam preenchidos com a própria cor.
(function(){
  const colors={VERMELHO:'#ef4444',AZUL:'#3b82f6',AMARELO:'#facc15',VERDE:'#22c55e',ROXO:'#a855f7',LARANJA:'#f97316',ROSA:'#ec4899',PRETO:'#111827',BRANCO:'#ffffff',MARROM:'#92400e'};
  const originalRender=window.render;
  window.render=function(){
    originalRender();
    if(window.location && document.getElementById('options')){
      document.querySelectorAll('.colors-option').forEach(function(b){
        const nome=b.textContent.trim().toUpperCase();
        if(colors[nome]){
          b.style.background=colors[nome];
          b.style.backgroundColor=colors[nome];
          b.style.color=(nome==='AMARELO'||nome==='BRANCO')?'#222':'#fff';
          b.style.border='5px solid #fff';
          b.style.textShadow='none';
        }
      });
    }
  };
})();
