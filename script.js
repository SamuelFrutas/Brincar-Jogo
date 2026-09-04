const state={game:null,index:0,score:0,sound:true,locked:false};
const games={
 numbers:{name:'Números',icon:'🔢',cls:'numbers',rounds:[1,2,3,4,5,6,7,8,9,10],q:x=>`Qual é o número ${x}?`},
 letters:{name:'Letras',icon:'🔤',cls:'letters',rounds:['A','B','C','D','E','F','G','H','I','J'],q:x=>`Qual é a letra ${x}?`},
 animals:{name:'Animais',icon:'🐶',cls:'animals',rounds:[['🐶','CACHORRO'],['🐱','GATO'],['🐮','VACA'],['🦁','LEÃO'],['🐘','ELEFANTE'],['🐵','MACACO'],['🐰','COELHO'],['🐔','GALINHA'],['🐟','PEIXE'],['🦋','BORBOLETA']]},
 colors:{name:'Cores',icon:'🎨',cls:'colors',rounds:[['🔴','VERMELHO'],['🔵','AZUL'],['🟡','AMARELO'],['🟢','VERDE'],['🟣','ROXO'],['🟠','LARANJA'],['🩷','ROSA'],['⚫','PRETO'],['⚪','BRANCO'],['🟤','MARROM']]},
 fruits:{name:'Frutas',icon:'🍎',cls:'fruits',rounds:[['🍎','MAÇÃ'],['🍌','BANANA'],['🍊','LARANJA'],['🍉','MELANCIA'],['🍓','MORANGO'],['🍇','UVA'],['🍍','ABACAXI'],['🥭','MANGA'],['🍐','PERA'],['🥝','KIWI']]},
 vehicles:{name:'Veículos',icon:'🚗',cls:'vehicles',rounds:[['🚗','CARRO'],['🚌','ÔNIBUS'],['✈️','AVIÃO'],['🚲','BICICLETA'],['🚂','TREM'],['🚁','HELICÓPTERO'],['🚢','NAVIO'],['🏍️','MOTO'],['🚜','TRATOR'],['🚑','AMBULÂNCIA']]},
 objects:{name:'Objetos',icon:'🧸',cls:'objects',rounds:[['⚽','BOLA'],['🧸','URSO'],['👟','SAPATO'],['🥛','COPO'],['🪥','ESCOVA'],['📚','LIVRO'],['✏️','LÁPIS'],['🎒','MOCHILA'],['🪑','CADEIRA'],['🛏️','CAMA']]},
 shapes:{name:'Formas',icon:'🔷',cls:'shapes',rounds:[['⚪','CÍRCULO'],['🟥','QUADRADO'],['🔺','TRIÂNGULO'],['⭐','ESTRELA'],['💠','LOSANGO'],['⬜','RETÂNGULO'],['❤️','CORAÇÃO'],['🌙','MEIA-LUA'],['🔶','HEXÁGONO'],['🟢','OVAL']]},
 vegetables:{name:'Legumes e Verduras',icon:'🥕',cls:'vegetables',rounds:[['🥕','CENOURA'],['🥦','BRÓCOLIS'],['🌽','MILHO'],['🥒','PEPINO'],['🍅','TOMATE'],['🥔','BATATA'],['🥬','ALFACE'],['🧅','CEBOLA'],['🫑','PIMENTÃO'],['🍆','BERINJELA']]},
 sounds:{name:'Sons',icon:'🔊',cls:'sounds',rounds:[['🐶','CACHORRO'],['🐱','GATO'],['🐮','VACA'],['🐔','GALINHA'],['🚗','CARRO'],['🚂','TREM'],['🐑','OVELHA'],['🦁','LEÃO'],['🐸','SAPO'],['🦆','PATO']]},
 memory:{name:'Memória',icon:'🧠',cls:'memory',rounds:[['🍎','🍎'],['🐶','🐶'],['🚗','🚗'],['⭐','⭐'],['🍌','🍌'],['🦋','🦋'],['⚽','⚽'],['🌈','🌈'],['🐱','🐱'],['❤️','❤️']]},
 different:{name:'Qual é diferente?',icon:'🔎',cls:'different',rounds:[['🍎','🍎','🍌'],['🐶','🐶','🐱'],['🔴','🔴','🔵'],['🚗','🚗','🚌'],['⭐','⭐','❤️'],['🍌','🍌','🍎'],['🐱','🐱','🐶'],['🟢','🟢','🟡'],['⚽','⚽','🎈'],['🌸','🌸','🌻']]},
 counting:{name:'Contar Objetos',icon:'🔢',cls:'counting',rounds:[['🍎',1],['⭐',2],['🐶',3],['🍌',4],['❤️',5],['⚽',6],['🌸',7],['🐟',8],['🍓',9],['🌈',10]]},
 sequence:{name:'Sequência',icon:'🧩',cls:'sequence',rounds:[['🔴','🔵','🔴','🔵','🔴','?'],['⭐','❤️','⭐','❤️','⭐','?'],['🍎','🍌','🍎','🍌','🍎','?'],['🐶','🐱','🐶','🐱','🐶','?'],['🟢','🟡','🟢','🟡','🟢','?'],['🚗','🚌','🚗','🚌','🚗','?'],['🔺','🟢','🔺','🟢','🔺','?'],['🍓','🍇','🍓','🍇','🍓','?'],['🐟','🐠','🐟','🐠','🐟','?'],['☀️','🌙','☀️','🌙','☀️','?']]},
 size:{name:'Grande ou Pequeno?',icon:'📏',cls:'size',rounds:[['🐘','🐭','GRANDE'],['🍉','🍓','GRANDE'],['🚌','🚲','GRANDE'],['🦁','🐜','GRANDE'],['🌳','🌱','GRANDE'],['🐭','🐘','PEQUENO'],['🍓','🍉','PEQUENO'],['🚲','🚌','PEQUENO'],['🐜','🦁','PEQUENO'],['🌱','🌳','PEQUENO']]}
};
const $=id=>document.getElementById(id),shuffle=a=>[...a].sort(()=>Math.random()-.5);

function getFriendlyVoice(){
  if(!('speechSynthesis' in window))return null;
  const voices=window.speechSynthesis.getVoices();
  const pt=voices.filter(v=>/^pt(-|_)/i.test(v.lang));
  return pt.find(v=>/female|feminina|mulher|Google.*Portuguese|Microsoft.*Francisca|Microsoft.*Maria/i.test(v.name))||pt.find(v=>/pt-BR/i.test(v.lang))||pt[0]||null;
}

function speak(text){
  if(!state.sound||!('speechSynthesis'in window))return Promise.resolve();
  window.speechSynthesis.cancel();
  return new Promise(resolve=>{
    const u=new SpeechSynthesisUtterance(text);
    u.lang='pt-BR';
    u.rate=.78;
    u.pitch=1.18;
    u.volume=1;
    const voice=getFriendlyVoice();
    if(voice)u.voice=voice;
    let done=false;
    const finish=()=>{if(done)return;done=true;resolve()};
    u.onend=finish;u.onerror=finish;
    window.speechSynthesis.speak(u);
    setTimeout(finish,Math.max(2500,text.length*95));
  });
}
function applause(){if(!state.sound)return;const C=window.AudioContext||window.webkitAudioContext;if(!C)return;const c=new C(),n=c.currentTime;[0,.12,.24,.36,.48].forEach((t,i)=>{const o=c.createOscillator(),g=c.createGain();o.type='triangle';o.frequency.value=520+i*90;g.gain.setValueAtTime(.0001,n+t);g.gain.exponentialRampToValueAtTime(.16,n+t+.015);g.gain.exponentialRampToValueAtTime(.0001,n+t+.09);o.connect(g).connect(c.destination);o.start(n+t);o.stop(n+t+.1)});setTimeout(()=>c.close(),1000)}
function buildMenu(){const box=$('gameMenu');box.innerHTML='';Object.entries(games).forEach(([key,g])=>{const b=document.createElement('button');b.className=`game-card ${g.cls}`;b.innerHTML=`<span class="game-icon">${g.icon}</span><strong>${g.name}</strong><small>Vamos brincar!</small>`;b.onclick=()=>startGame(key);box.appendChild(b)})}
function startGame(game){state.game=game;state.index=0;state.score=0;state.locked=false;$('menu').classList.remove('active');$('game').classList.add('active');renderRound();setTimeout(()=>speak(questionText()),250)}
function data(){return games[state.game].rounds[state.index]}
function questionText(){const g=games[state.game],d=data();if(state.game==='numbers'||state.game==='letters')return g.q(d);if(['animals','colors','fruits','vehicles','objects','shapes','vegetables'].includes(state.game))return `Que figura é essa?`;if(state.game==='sounds')return `Que som faz esse animal?`;if(state.game==='memory')return `Encontre a figura igual!`;if(state.game==='different')return `Qual é o diferente?`;if(state.game==='counting')return `Quantos ${d[0]} você vê?`;if(state.game==='sequence')return `O que vem depois?`;return `Qual é o ${d[2].toLowerCase()}?`}
function makeOptions(){const d=data(),g=games[state.game];if(['numbers','letters'].includes(state.game)){let w;do{w=g.rounds[Math.floor(Math.random()*g.rounds.length)]}while(w===d);return shuffle([d,w])}if(['animals','colors','fruits','vehicles','objects','shapes','vegetables'].includes(state.game)){const pool=g.rounds.map(x=>x[1]);let w;do{w=pool[Math.floor(Math.random()*pool.length)]}while(w===d[1]);return shuffle([d[1],w]).map(label=>({emoji:g.rounds.find(x=>x[1]===label)[0],label}))}if(state.game==='sounds'){let w;do{w=g.rounds[Math.floor(Math.random()*g.rounds.length)]}while(w===d);return shuffle([d,w])}if(state.game==='memory'){let w;do{w=g.rounds[Math.floor(Math.random()*g.rounds.length)]}while(w===d);return shuffle([d[0],w[0]])}if(state.game==='different'){return shuffle([d[2],d[0]])}if(state.game==='counting'){return shuffle([d[1],d[1]===10?9:d[1]+1])}if(state.game==='sequence'){const correct=d[5];const wrong=correct==='🔴'?'🟢':correct==='⭐'?'🔵':correct==='🍎'?'🍌':correct==='🐶'?'🐱':correct==='🟢'?'🟡':correct==='🚗'?'🚌':correct==='🔺'?'🟢':correct==='🍓'?'🍇':correct==='🐟'?'🐠':'🌙';return shuffle([correct,wrong])}return shuffle(['GRANDE','PEQUENO'])}
function renderRound(){const g=games[state.game],d=data();$('questionIcon').textContent=g.icon;$('question').textContent=questionText();$('feedback').textContent='';$('feedback').className='feedback';$('progress').style.width=`${state.index/10*100}%`;const visual=$('visual');visual.innerHTML='';if(['animals','colors','fruits','vehicles','objects','shapes','vegetables','sounds'].includes(state.game)){visual.textContent=d[0]}else if(state.game==='different'){visual.textContent=d[0]+'   '+d[1]+'   '+d[2]}else if(state.game==='counting'){visual.textContent=d[0].repeat(d[1])}else if(state.game==='sequence'){visual.textContent=d.slice(0,5).join('  ')+'  ?'}else if(state.game==='size'){visual.textContent=d[0]+'     '+d[1]}else if(state.game==='memory'){visual.textContent='🃏'}const box=$('options');box.innerHTML='';makeOptions().forEach(v=>{const b=document.createElement('button');b.className='option';if(v&&typeof v==='object'){b.innerHTML=`<span class="option-emoji">${v.emoji}</span><span class="option-label">${v.label}</span>`}else{b.textContent=v}b.onclick=()=>answerClick(v,b);box.appendChild(b)})}
function answerValue(v){if(['animals','colors','fruits','vehicles','objects','shapes','vegetables'].includes(state.game))return v.label;return v}
function correctValue(){const d=data();if(['animals','colors','fruits','vehicles','objects','shapes','vegetables'].includes(state.game))return d[1];if(state.game==='sounds')return d;if(state.game==='memory')return d[0];if(state.game==='different')return d[2];if(state.game==='counting')return d[1];if(state.game==='sequence')return d[5];if(state.game==='size')return d[2];return d}
async function answerClick(value,button){if(state.locked)return;const ok=answerValue(value)===answerValue(correctValue());if(ok){state.locked=true;document.querySelectorAll('.option').forEach(b=>b.disabled=true);state.score++;button.classList.add('correct');applause();$('feedback').textContent='Parabéns, Ayla! Continue assim!';$('feedback').className='feedback success';await speak('Parabéns, Ayla! Continue assim!');state.index++;if(state.index>=10)finishGame();else{renderRound();setTimeout(()=>speak(questionText()),180)}state.locked=false}else{button.classList.add('wrong');$('feedback').textContent='Tente mais uma vez, Ayla!';$('feedback').className='feedback error';await speak('Tente mais uma vez, Ayla!');button.classList.remove('wrong')}}
function finishGame(){$('progress').style.width='100%';$('options').innerHTML='<button class="game-card numbers" id="again" style="grid-column:1/-1;min-height:150px"><span class="game-icon">🎉</span><strong>Jogar novamente</strong></button>';$('visual').innerHTML='🏆 ⭐ ⭐ ⭐';$('questionIcon').textContent='🏆';$('question').textContent=`Muito bem, Ayla! Você acertou ${state.score} de 10!`;$('feedback').textContent='Você foi incrível!';$('feedback').className='feedback success';applause();speak(`Muito bem, Ayla! Você acertou ${state.score} de 10!`);$('again').onclick=()=>startGame(state.game)}

if('speechSynthesis'in window)window.speechSynthesis.onvoiceschanged=()=>getFriendlyVoice();
buildMenu();$('backBtn').onclick=()=>{window.speechSynthesis?.cancel();$('game').classList.remove('active');$('menu').classList.add('active')};$('repeatBtn').onclick=()=>speak(questionText());$('soundBtn').onclick=()=>{state.sound=!state.sound;$('soundBtn').textContent=state.sound?'🔊':'🔇';if(state.sound)speak(questionText());else window.speechSynthesis?.cancel()};