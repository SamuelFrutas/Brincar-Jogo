// Jogo da Memória — formato simples para uma criança que ainda não lê.
// Mostra UMA imagem, esconde e oferece somente DUAS opções visuais.
(function(){
  const items=[
    ['🍎','MAÇÃ'],['🐶','CACHORRO'],['🚗','CARRO'],['⭐','ESTRELA'],['🍌','BANANA'],
    ['🦋','BORBOLETA'],['⚽','BOLA'],['🌈','ARCO-ÍRIS'],['🐱','GATO'],['❤️','CORAÇÃO']
  ];
  let active=false, round=0, score=0, target=null, accepting=false, timer=null;
  const $=id=>document.getElementById(id);
  const shuffle=a=>[...a].sort(()=>Math.random()-.5);
  function isMemory(){return $('game')?.classList.contains('active') && $('questionIcon')?.textContent==='🧠'}
  function speak(text){if(window.speechSynthesis){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='pt-BR';u.rate=.85;u.pitch=1.1;speechSynthesis.speak(u)}}
  function start(){
    active=true;round=0;score=0;target=null;accepting=false;clearTimeout(timer);nextRound();
  }
  function nextRound(){
    if(!active||!isMemory())return;
    if(round>=10){finish();return}
    const pool=shuffle(items),shown=pool[0],other=pool.find(x=>x[1]!==shown[1]);
    target=shown;accepting=false;
    const v=$('visual'),o=$('options'),f=$('feedback');
    v.className='visual';v.innerHTML='';o.innerHTML='';f.textContent='';f.className='feedback';
    const image=document.createElement('div');image.textContent=shown[0];image.style.fontSize='clamp(90px,25vw,170px)';image.style.lineHeight='1';image.style.padding='28px';image.style.background='#fff';image.style.borderRadius='28px';image.style.boxShadow='0 8px 24px rgba(0,0,0,.12)';v.appendChild(image);
    $('question').textContent='Olhe bem! O que apareceu?';
    speak('Olhe bem! O que apareceu?');
    timer=setTimeout(()=>{if(!active||!isMemory())return;v.innerHTML='';$('question').textContent='Qual imagem apareceu?';accepting=true;const choices=shuffle([shown,other]);choices.forEach(x=>{const b=document.createElement('button');b.className='option memory-choice';b.textContent=x[0];b.style.fontSize='clamp(60px,18vw,110px)';b.style.minHeight='140px';b.setAttribute('aria-label',x[1]);b.onclick=()=>choose(x,b);o.appendChild(b)});speak('Qual imagem apareceu?')},2200);
  }
  function choose(x,b){
    if(!accepting||!active)return;accepting=false;
    if(x[1]===target[1]){score++;b.classList.add('correct');$('feedback').textContent='Muito bem! Acertou!';speak('Muito bem, Ayla! Acertou!');round++;timer=setTimeout(nextRound,900)}
    else{b.classList.add('wrong');$('feedback').textContent='Tente novamente!';speak('Tente novamente, Ayla!');timer=setTimeout(()=>{if(!active)return;accepting=true;document.querySelectorAll('.memory-choice').forEach(btn=>btn.disabled=false)},800)}
  }
  function finish(){
    accepting=false;const v=$('visual'),o=$('options');v.className='visual';v.innerHTML='<div style="font-size:72px">🎉</div><h2 style="margin:12px 0">Parabéns, Ayla!</h2><p>Você acertou '+score+' de 10!</p>';o.innerHTML='';const b=document.createElement('button');b.className='option';b.textContent='🔄 Jogar novamente';b.onclick=start;o.appendChild(b);$('feedback').textContent='';
  }
  function reset(){active=false;clearTimeout(timer);target=null;accepting=false}
  const observer=new MutationObserver(()=>{
    if(isMemory()&&!active)start();
    if(!isMemory()&&active)reset();
  });
  observer.observe(document.body,{subtree:true,attributes:true,attributeFilter:['class']});
  document.addEventListener('click',e=>{if(e.target.id==='backBtn')reset()});
})();
