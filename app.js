const $=id=>document.getElementById(id);
const shuffle=a=>[...a].sort(()=>Math.random()-.5);

const games={
 numbers:{name:'Números',icon:'🔢',rounds:[1,2,3,4,5,6,7,8,9,10]},
 letters:{name:'Letras',icon:'🔤',rounds:'ABCDEFGHIJ'.split('')},
 animals:{name:'Animais',icon:'🐶',rounds:[['🐶','CACHORRO'],['🐱','GATO'],['🐮','VACA'],['🦁','LEÃO'],['🐘','ELEFANTE'],['🐵','MACACO'],['🐰','COELHO'],['🐔','GALINHA'],['🐟','PEIXE'],['🦋','BORBOLETA']]},
 colors:{name:'Cores',icon:'🎨',rounds:[['🔴','VERMELHO','#ef4444'],['🔵','AZUL','#3b82f6'],['🟡','AMARELO','#facc15'],['🟢','VERDE','#22c55e'],['🟣','ROXO','#a855f7'],['🟠','LARANJA','#f97316'],['🩷','ROSA','#ec4899'],['⚫','PRETO','#111827'],['⚪','BRANCO','#fff'],['🟤','MARROM','#92400e']]},
 fruits:{name:'Frutas',icon:'🍎',rounds:[['🍎','MAÇÃ'],['🍌','BANANA'],['🍊','LARANJA'],['🍉','MELANCIA'],['🍓','MORANGO'],['🍇','UVA'],['🍍','ABACAXI'],['🥭','MANGA'],['🍐','PERA'],['🥝','KIWI']]},
 vehicles:{name:'Veículos',icon:'🚗',rounds:[['🚗','CARRO'],['🚌','ÔNIBUS'],['✈️','AVIÃO'],['🚲','BICICLETA'],['🚂','TREM'],['🚁','HELICÓPTERO'],['🚢','NAVIO'],['🏍️','MOTO'],['🚜','TRATOR'],['🚑','AMBULÂNCIA']]},
 objects:{name:'Objetos',icon:'🧸',rounds:[['⚽','BOLA'],['🧸','URSO'],['👟','SAPATO'],['🥛','COPO'],['🪥','ESCOVA'],['📚','LIVRO'],['✏️','LÁPIS'],['🎒','MOCHILA'],['🪑','CADEIRA'],['🛏️','CAMA']]},
 shapes:{name:'Formas',icon:'🔷',rounds:[['⚪','CÍRCULO'],['🟥','QUADRADO'],['🔺','TRIÂNGULO'],['⭐','ESTRELA'],['💠','LOSANGO'],['⬜','RETÂNGULO'],['❤️','CORAÇÃO'],['🌙','MEIA-LUA'],['🔶','HEXÁGONO'],['🟢','OVAL']]},
 vegetables:{name:'Legumes e Verduras',icon:'🥕',rounds:[['🥕','CENOURA'],['🥦','BRÓCOLIS'],['🌽','MILHO'],['🥒','PEPINO'],['🍅','TOMATE'],['🥔','BATATA'],['🥬','ALFACE'],['🧅','CEBOLA'],['🫑','PIMENTÃO'],['🍆','BERINJELA']]},
 sounds:{name:'Sons',icon:'🔊',rounds:[['🐶','CACHORRO'],['🐱','GATO'],['🐮','VACA'],['🐔','GALINHA'],['🐑','OVELHA'],['🦁','LEÃO'],['🐸','SAPO'],['🦆','PATO'],['🐴','CAVALO'],['🐷','PORCO']]},
 memory:{name:'Memória',icon:'🧠',rounds:[['🍎','MAÇÃ'],['🐶','CACHORRO'],['🚗','CARRO'],['⭐','ESTRELA'],['🍌','BANANA'],['🦋','BORBOLETA'],['⚽','BOLA'],['🌈','ARCO-ÍRIS'],['🐱','GATO'],['❤️','CORAÇÃO']]},
 different:{name:'Qual é diferente?',icon:'🔎',rounds:[['🍎','🍎','🍌'],['🐶','🐶','🐱'],['🔴','🔴','🔵'],['🚗','🚗','🚌'],['⭐','⭐','❤️'],['🍌','🍌','🍎'],['🐱','🐱','🐶'],['🟢','🟢','🟡'],['⚽','⚽','🎈'],['🌸','🌸','🌻']]},
 counting:{name:'Contar Objetos',icon:'🔢',rounds:[['🍎',1],['⭐',2],['🐶',3],['🍌',4],['❤️',5],['⚽',6],['🌸',7],['🐟',8],['🍓',9],['🌈',10]]},
 sequence:{name:'Sequência',icon:'🧩',rounds:[['🔴','🔵','🔴','🔵','🔴','🔵'],['⭐','❤️','⭐','❤️','⭐','❤️'],['🍎','🍌','🍎','🍌','🍎','🍌'],['🐶','🐱','🐶','🐱','🐶','🐱'],['🟢','🟡','🟢','🟡','🟢','🟡'],['🚗','🚌','🚗','🚌','🚗','🚌'],['🔺','🟢','🔺','🟢','🔺','🟢'],['🍓','🍇','🍓','🍇','🍓','🍇'],['🐟','🐠','🐟','🐠','🐟','🐠'],['☀️','🌙','☀️','🌙','☀️','🌙']]},
 size:{name:'Grande ou Pequeno?',icon:'📏',rounds:[['🐘','🐭','GRANDE'],['🍉','🍓','GRANDE'],['🚌','🚲','GRANDE'],['🦁','🐜','GRANDE'],['🌳','🌱','GRANDE'],['🐭','🐘','PEQUENO'],['🍓','🍉','PEQUENO'],['🚲','🚌','PEQUENO'],['🐜','🦁','PEQUENO'],['🌱','🌳','PEQUENO']]}
};

const named=new Set(['animals','colors','fruits','vehicles','objects','shapes','vegetables']);
const animalAudio={CACHORRO:'https://commons.wikimedia.org/wiki/Special:FilePath/Dog_barking.webm',GATO:'https://commons.wikimedia.org/wiki/Special:FilePath/Meow.ogg',VACA:'https://commons.wikimedia.org/wiki/Special:FilePath/Single_Cow_Moo.ogg',GALINHA:'https://commons.wikimedia.org/wiki/Special:FilePath/Rooster_crowing.ogg',OVELHA:'https://commons.wikimedia.org/wiki/Special:FilePath/Sheep_bleat.ogg',LEÃO:'https://commons.wikimedia.org/wiki/Special:FilePath/Lion_raring-sound1TamilNadu178.ogg',SAPO:'https://commons.wikimedia.org/wiki/Special:FilePath/Frog_sounds.ogg',PATO:'https://commons.wikimedia.org/wiki/Special:FilePath/En-us-duck.ogg',CAVALO:'https://commons.wikimedia.org/wiki/Special:FilePath/Wiehern.ogg',PORCO:'https://commons.wikimedia.org/wiki/Special:FilePath/Domestic_pig_grunting.webm'};

const state={game:null,order:[],index:0,score:0,locked:false,speaking:false,sound:true,memory:null,memoryTimer:null};
let player=null;

function speak(text){
  if(!state.sound||!window.speechSynthesis)return Promise.resolve();
  speechSynthesis.cancel();state.speaking=true;
  return new Promise(resolve=>{
    const u=new SpeechSynthesisUtterance(text);u.lang='pt-BR';u.rate=.84;u.pitch=1.1;
    let done=false;const end=()=>{if(done)return;done=true;state.speaking=false;resolve()};
    u.onend=end;u.onerror=end;speechSynthesis.speak(u);
    // Do not cut the last word on slower phones/voices. The previous 2.5s timeout
    // could fire while the utterance was still saying the answer (e.g. "uma maçã").
    setTimeout(end,Math.max(6000,text.length*170));
  });
}

function applause(){
  if(!state.sound)return;const C=window.AudioContext||window.webkitAudioContext;if(!C)return;
  const c=new C(),n=c.currentTime;
  [0,.1,.2,.3].forEach((t,i)=>{const o=c.createOscillator(),g=c.createGain();o.frequency.value=650+i*100;o.connect(g).connect(c.destination);g.gain.setValueAtTime(.001,n+t);g.gain.exponentialRampToValueAtTime(.12,n+t+.02);g.gain.exponentialRampToValueAtTime(.001,n+t+.08);o.start(n+t);o.stop(n+t+.1)});
  setTimeout(()=>c.close(),800);
}

function data(){return games[state.game].rounds[state.order[state.index]]}
function difficulty(){return state.index<3?2:state.index<6?3:4}

function question(){
  const d=data();
  if(state.game==='numbers')return 'Que número é esse?';
  if(state.game==='letters')return 'Que letra é essa?';
  return {animals:'Que animal é esse?',colors:'Que cor é essa?',fruits:'Que fruta é essa?',vehicles:'Que veículo é esse?',objects:'Que objeto é esse?',shapes:'Que forma é essa?',vegetables:'Que legume ou verdura é esse?',sounds:'Ouça o som! Qual animal faz esse som?',memory:'Qual imagem apareceu?',different:'Qual é o diferente?',counting:'Quantos objetos você vê?',sequence:'O que vem depois?',size:d[2]==='GRANDE'?'Qual é o GRANDE?':'Qual é o PEQUENO?'}[state.game]||'';
}

function options(){
  const d=data(),n=difficulty();
  if(state.game==='numbers'||state.game==='letters'){
    const p=games[state.game].rounds.filter(x=>x!==d);return shuffle([d,...shuffle(p).slice(0,n-1)]);
  }
  if(state.game==='colors')return shuffle([d,...shuffle(games.colors.rounds.filter(x=>x[1]!==d[1])).slice(0,n-1)]).map(x=>({label:x[1],key:x[1],color:x[2]}));
  if(named.has(state.game)||state.game==='sounds'){
    const p=shuffle(games[state.game].rounds.filter(x=>x[1]!==d[1]));return shuffle([d,...p.slice(0,n-1)]).map(x=>({emoji:x[0],label:x[1],key:x[1]}));
  }
  if(state.game==='different')return shuffle(n===2?[d[2],d[0]]:[d[2],d[0],d[1]]);
  if(state.game==='counting'){
    const v=new Set([d[1]]);while(v.size<n)v.add(Math.max(1,Math.min(10,d[1]+(Math.random()<.5?-1:1)*(Math.floor(Math.random()*3)+1))));return shuffle([...v]);
  }
  if(state.game==='sequence'){
    const p=['🔴','🔵','🟡','🟢','⭐','❤️','🍎','🍌','🐶','🐱','🚗','🚌','🔺','🍓','🍇','🐟','🐠','☀️','🌙'].filter(x=>x!==d[5]);return shuffle([d[5],...shuffle(p).slice(0,n-1)]);
  }
  if(state.game==='size')return shuffle([{emoji:d[0],key:d[0]},{emoji:d[1],key:d[1]}]);
  return [];
}

function render(){
  if(!state.game)return;
  const d=data(),g=games[state.game],q=$('question'),visual=$('visual'),box=$('options');if(!q||!visual||!box)return;
  $('questionIcon').textContent=g.icon;q.textContent=question();$('feedback').textContent='';$('feedback').className='feedback';$('progress').style.width=`${state.index/10*100}%`;
  visual.className='visual';visual.innerHTML='';visual.style='';box.innerHTML='';
  if(state.game==='memory'){renderMemory();return}
  if(state.game==='numbers'||state.game==='letters'){visual.textContent=d;visual.style.fontSize='clamp(7rem,28vw,12rem)';visual.style.fontWeight='900';visual.style.lineHeight='1'}
  else if(named.has(state.game)||state.game==='sounds')visual.textContent=d[0];
  else if(state.game==='different')visual.textContent=`${d[0]}   ${d[1]}   ${d[2]}`;
  else if(state.game==='counting')visual.textContent=d[0].repeat(d[1]);
  else if(state.game==='sequence')visual.textContent=d.slice(0,5).join('  ')+'  ?';
  else if(state.game==='size')visual.textContent=`${d[0]}     ${d[1]}`;

  options().forEach(v=>{
    const b=document.createElement('button');b.type='button';b.className=`option ${state.game}-option`;
    if(state.game==='colors'){
      b.textContent=v.label;b.style.background=v.color;b.style.color=(v.key==='AMARELO'||v.key==='BRANCO')?'#222':'#fff';b.style.border='5px solid #fff';b.style.textShadow='none';
    }else if(state.game==='numbers'||state.game==='letters'){
      b.textContent=v;b.style.fontSize='clamp(3.5rem,12vw,6rem)';b.style.minHeight='110px';b.style.fontWeight='900';
    }else if(v&&typeof v==='object'){
      b.innerHTML=`<span class="option-emoji">${v.emoji}</span><span class="option-label">${v.label||''}</span>`;
    }else b.textContent=v;
    b.addEventListener('click',()=>answer(v,b));box.appendChild(b);
  });
}

function renderMemory(){
  const v=$('visual'),box=$('options');if(!v||!box)return;box.innerHTML='';v.className='visual memory-visual';
  if(!state.memory){
    const item=games.memory.rounds[Math.floor(Math.random()*games.memory.rounds.length)];
    state.memory={target:item,preview:true,busy:true};v.textContent=item[0];
    clearTimeout(state.memoryTimer);
    state.memoryTimer=setTimeout(()=>{if(!state.memory)return;state.memory.preview=false;state.memory.busy=false;v.textContent='';renderMemory();speak('Qual imagem apareceu?')},2200);
    return;
  }
  if(state.memory.preview){v.textContent=state.memory.target[0];return}
  v.textContent='';
  const wrong=shuffle(games.memory.rounds.filter(x=>x[1]!==state.memory.target[1]))[0];
  shuffle([state.memory.target,wrong]).forEach(x=>{
    const b=document.createElement('button');b.type='button';b.className='option memory-option';b.innerHTML=`<span class="option-emoji">${x[0]}</span>`;b.addEventListener('click',()=>memoryAnswer(x,b));box.appendChild(b);
  });
}

function correct(){
  const d=data();
  if(named.has(state.game)||state.game==='sounds')return d[1];
  if(state.game==='different')return d[2];
  if(state.game==='counting')return d[1];
  if(state.game==='sequence')return d[5];
  if(state.game==='size')return d[2]==='GRANDE'?d[0]:d[1];
  return d;
}
const val=x=>x&&typeof x==='object'?x.key:x;

const feminine=new Set(['MAÇÃ','BANANA','LARANJA','MELANCIA','MORANGO','UVA','MANGA','PERA','CENOURA','BERINJELA','ALFACE','CEBOLA','GALINHA','OVELHA','VACA','BICICLETA','MOTO','AMBULÂNCIA','BOLA','ESCOVA','MOCHILA','CADEIRA','ESTRELA','MEIA-LUA']);
function article(name){return feminine.has(name)?'uma':'um'}

function successSpeech(){
  const d=data();
  if(state.game==='numbers')return `Parabéns, Ayla. Esse é o número ${d}.`;
  if(state.game==='letters')return `Parabéns, Ayla. Essa é a letra ${d}.`;
  if(state.game==='colors')return `Parabéns, Ayla. Essa é a cor ${d[1].toLowerCase()}.`;
  if(named.has(state.game)||state.game==='sounds')return `Parabéns, Ayla. É ${article(d[1])} ${d[1].toLowerCase()}.`;
  if(state.game==='counting')return `Parabéns, Ayla. São ${d[1]} objetos.`;
  return 'Parabéns, Ayla.';
}

async function memoryAnswer(x,b){
  if(!state.memory||state.memory.busy||state.memory.preview||state.speaking)return;
  state.memory.busy=true;
  if(x[1]===state.memory.target[1]){
    b.classList.add('correct');state.score++;applause();$('feedback').textContent='Parabéns, Ayla.';await speak('Parabéns, Ayla.');
    if(state.index>=9){finish();return}
    state.index++;state.memory=null;state.locked=false;render();
  }else{
    b.classList.add('wrong');$('feedback').textContent='Tente novamente.';await speak('Tente novamente.');state.memory.busy=false;
  }
}

async function answer(x,b){
  if(state.locked||state.speaking)return;state.locked=true;
  if(val(x)===correct()){
    b.classList.add('correct');state.score++;applause();$('feedback').textContent='Parabéns, Ayla.';
    const msg=successSpeech();await speak(msg);
    if(state.index>=9){finish();return}
    state.index++;state.locked=false;render();await speak(question());if(state.game==='sounds')playSound(data()[1]);
  }else{
    b.classList.add('wrong');$('feedback').textContent='Tente novamente.';await speak('Tente novamente.');state.locked=false;
    if(state.game==='sounds')playSound(data()[1]);
  }
}

function playSound(animal){
  if(!state.sound||!animalAudio[animal])return;
  if(player)player.pause();player=new Audio(animalAudio[animal]);player.volume=.9;player.play().catch(()=>{});
}

function start(game){
  clearTimeout(state.memoryTimer);if(player)player.pause();speechSynthesis?.cancel();
  state.game=game;state.order=shuffle(games[game].rounds.map((_,i)=>i));state.index=0;state.score=0;state.locked=false;state.speaking=false;state.memory=null;
  $('menu').classList.remove('active');$('game').classList.add('active');render();
  if(game==='memory')speak('Memorize esta imagem.');else speak(question()).then(()=>{if(state.game==='sounds')playSound(data()[1])});
}

function back(){
  clearTimeout(state.memoryTimer);speechSynthesis?.cancel();if(player)player.pause();
  state.game=null;state.memory=null;state.locked=false;state.speaking=false;
  $('game').classList.remove('active');$('menu').classList.add('active');
}

function finish(){
  state.locked=true;$('feedback').textContent=`Parabéns, Ayla. Você acertou ${state.score} de 10.`;
}

function buildMenu(){
  const box=$('gameMenu');if(!box)return;box.innerHTML='';
  Object.entries(games).forEach(([key,g])=>{
    const b=document.createElement('button');b.type='button';b.className=`game-card ${key}`;b.innerHTML=`<span class="game-icon">${g.icon}</span><strong>${g.name}</strong><small>10 desafios</small>`;b.addEventListener('click',()=>start(key));box.appendChild(b);
  });
}

function init(){
  buildMenu();
  $('backBtn')?.addEventListener('click',back);
  $('soundBtn')?.addEventListener('click',()=>{state.sound=!state.sound;$('soundBtn').textContent=state.sound?'🔊':'🔇';if(!state.sound){speechSynthesis?.cancel();if(player)player.pause()}else if(state.game)speak(question())});
  $('repeatBtn')?.addEventListener('click',()=>{if(state.game==='sounds')playSound(data()[1]);speak(question())});
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();