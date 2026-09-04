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

const state={game:null,order:[],index:0,score:0,locked:false,speaking:false,sound:true,memory:null};
let player=null;

function speak(text){
  if(!state.sound||!window.speechSynthesis)return Promise.resolve();
  speechSynthesis.cancel();state.speaking=true;
  return new Promise(resolve=>{
    const u=new SpeechSynthesisUtterance(text);u.lang='pt-BR';u.rate=.84;u.pitch=1.1;
    let done=false;const end=()=>{if(done)return;done=true;state.speaking=false;resolve()};
    u.onend=end;u.onerror=end;speechSynthesis.speak(u);setTimeout(end,Math.max(2500,text.length*90));
  });
}
function applause(){
  if(!state.sound)return;const C=window.AudioContext||window.webkitAudioContext;if(!C)return;
  const c=new C(),n=c.currentTime;[0,.1,.2,.3].forEach((t,i)=>{const o=c.createOscillator(),g=c.createGain();o.frequency.value=650+i*100;o.connect(g).connect(c.destination);g.gain.setValueAtTime(.001,n+t);g.gain.exponentialRampToValueAtTime(.12,n+t+.02);g.gain.exponentialRampToValueAtTime(.001,n+t+.08);o.start(n+t);o.stop(n+t+.1)});setTimeout(()=>c.close(),800);
}
function data(){return games[state.game].rounds[state.order[state.index]]}
function difficulty(){return state.index<3?2:state.index<6?3:4}
function question(){
  const d=data();
  if(state.game==='numbers')return 'Que número é esse?';
  if(state.game==='letters')return 'Que letra é essa?';
  return {animals:'Que animal é esse?',colors:'Que cor é essa?',fruits:'Que fruta é essa?',vehicles:'Que veículo é esse?',objects:'Que objeto é esse?',shapes:'Que forma é essa?',vegetables:'Que legume ou verdura é esse?',sounds:'Ouça o som! Qual animal faz esse som?',different:'Qual é o diferente?',counting:'Quantos objetos você vê?',sequence:'O que vem depois?',size:d[2]==='GRANDE'?'Qual é o GRANDE?':'Qual é o PEQUENO?'}[state.game]||'';
}
function options(){
  const d=data(),n=difficulty();
  if(state.game==='numbers'||state.game==='letters'){const p=games[state.game].rounds.filter(x=>x!==d);return shuffle([d,...shuffle(p).slice(0,n-1)])}
  if(state.game==='colors')return shuffle([d,...shuffle(games.colors.rounds.filter(x=>x[1]!==d[1])).slice(0,n-1)]).map(x=>({label:x[1],key:x[1],color:x[2]}));
  if(named.has(state.game)||state.game==='sounds'){const p=shuffle(games[state.game].rounds.filter(x=>x[1]!==d[1]));return shuffle([d,...p.slice(0,n-1)]).map(x=>({emoji:x[0],label:x[1],key:x[1]}))}
  if(state.game==='different')return shuffle(n===2?[d[2],d[0]]:[d[2],d[0],d[1]]);
  if(state.game==='counting'){const v=new Set([d[1]]);while(v.size<n)v.add(Math.max(1,Math.min(10,d[1]+(Math.random()<.5?-1:1)*(Math.floor(Math.random()*3)+1))));return shuffle([...v])}
  if(state.game==='sequence'){const p=['🔴','🔵','🟡','🟢','⭐','❤️','🍎','🍌','🐶','🐱','🚗','🚌','🔺','🍓','🍇','🐟','🐠','☀️','🌙'].filter(x=>x!==d[5]);return shuffle([d[5],...shuffle(p).slice(0,n-1)])}
  if(state.game==='size')return shuffle([{emoji:d[0],key:d[0]},{emoji:d[1],key:d[1]}]);
  return [];
}
function render(){
  if(!state.game)return;const d=data(),g=games[state.game],q=$('question'),visual=$('visual'),box=$('options');if(!q||!visual||!box)return;
  $('questionIcon').textContent=g.icon;q.textContent=question();$('feedback').textContent='';$('feedback').className='feedback';$('progress').style.width=`${state.index/10*100}%`;
  visual.className='visual';visual.innerHTML='';box.innerHTML='';
  if(state.game==='memory'){renderMemory();return}
  if(state.game==='numbers'||state.game==='letters'){visual.textContent=d;visual.style.fontSize='clamp(7rem,28vw,12rem)';visual.style.fontWeight='900';visual.style.lineHeight='1'}
  else if(named.has(state.game)||state.game==='sounds')visual.textContent=d[0];
  else if(state.game==='different')visual.textContent=`${d[0]}   ${d[1]}   ${d[2]}`;
  else if(state.game==='counting')visual.textContent=d[0].repeat(d[1]);
  else if(state.game==='sequence')visual.textContent=d.slice(0,5).join('  ')+'  ?';
  else if(state.game==='size')visual.textContent=`${d[0]}     ${d[1]}`;
  options().forEach(v=>{
    const b=document.createElement('button');b.type='button';b.className=`option ${state.game}-option`;
    if(state.game==='colors'){b.textContent=v.label;b.style.background=v.color;b.style.color=(v.key==='AMARELO'||v.key==='BRANCO')?'#222':'#fff';b.style.border='5px solid #fff';b.style.textShadow='none'}
    else if(state.game==='numbers'||state.game==='letters'){b.textContent=v;b.style.fontSize='clamp(3.5rem,12vw,6rem)';b.style.minHeight='110px';b.style.fontWeight='900'}
    else if(v&&typeof v==='object')b.innerHTML=`<span class="option-emoji">${v.emoji}</span><span class="option-label">${v.label||''}</span>`;
    else b.textContent=v;
    b.addEventListener('click',()=>answer(v,b));box.appendChild(b);
  });
}
function renderMemory(){
  const v=$('visual'),box=$('options');v.className='visual';box.innerHTML='';
  if(!state.memory){const item=games.memory.rounds[Math.floor(Math.random()*games.memory.rounds.length)];state.memory={target:item,preview:true,busy:true};v.textContent=item[0];setTimeout(()=>{if(state.memory){state.memory.preview=false;state.memory.busy=false;renderMemory()}},2200);return}
  if(state.memory.preview){v.textContent=state.memory.target[0];return}
  v.textContent='';const wrong=shuffle(games.memory.rounds.filter(x=>x[1]!==state.memory.target[1]))[0];
  shuffle([state.memory.target,wrong]).forEach(x=>{const b=document.createElement('button');b.type='button';b.className='option memory-option';b.innerHTML=`<span class="option-emoji">${x[0]}</span>`;b.addEventListener('click',()=>memoryAnswer(x,b));box.appendChild(b)});
}
function correct(){
  const d=data();
  if(named.has(state.game)||state.game==='sounds'||state.game==='colors')return d[1];
  if(state.game==='different')return d[2];
  if(state.game==='counting')return d[1];
  if(state.game==='sequence')return d[5];
  if(state.game==='size')return d[2]==='GRANDE'?d[0]:d[1];
  return d;
}
const val=x=>x&&typeof x==='object'?x.key:x;
function article(name,mode='normal'){
  const feminine=new Set(['MAÇÃ','BANANA','LARANJA','MELANCIA','MANGA','PERA','CENOURA','BERINJELA','ALFACE','CEBOLA','PIMENTÃO','GALINHA','OVELHA','VACA','BICICLETA','MOTO','AMBULÂNCIA','BOLA','ESCOVA','MOCHILA','CADEIRA','FORMA','ESTRELA','MEIA-LUA','COR','LETRA']);
  return feminine.has(name)?'a':'o';
}
function successSpeech(){
  const d=data();
  if(state.game==='numbers')return `Parabéns, Ayla. Esse é o número ${d}.`;
  if(state.game==='letters')return `Parabéns, Ayla. Essa é a letra ${d}.`;
  if(named.has(state.game)||state.game==='sounds')return `Parabéns, Ayla. É ${article(d[1])} ${d[1].toLowerCase()}.`;
  if(state.game==='memory')return `Parabéns, Ayla. Era ${article(d[1])} ${d[1].toLowerCase()}.`;
  if(state.game==='different')return 'Parabéns, Ayla.';
  if(state.game==='counting')return `Parabéns, Ayla. São ${d[1]} objetos.`;
  if(state.game==='sequence')return 'Parabéns, Ayla.';
  if(state.game==='size')return `Parabéns, Ayla. É ${d[2]==='GRANDE'?'o grande':'o pequeno'}.`;
  return 'Parabéns, Ayla.';
}
async function memoryAnswer(x,b){
  if(state.memory?.busy||state.memory?.preview||state.speaking)return;state.memory.busy=true;
  if(x[1]===state.memory.target[1]){b.classList.add('correct');state.score++;applause();$('feedback').textContent='Parabéns, Ayla.';await speak(`Parabéns, Ayla. Era ${article(x[1])} ${x[1].toLowerCase()}.`);if(state.index>=9){finish();return}state.index++;state.memory=null;state.locked=false;render();await speak(question());}
  else{b.classList.add('wrong');$('feedback').textContent='Tente novamente.';state.memory.busy=false;await speak('Tente novamente.');}
}
async function answer(x,b){
  if(state.locked||state.speaking)return;state.locked=true;
  if(val(x)===correct()){
    b.classList.add('correct');state.score++;applause();$('feedback').textContent='Parabéns, Ayla.';
    const msg=successSpeech();await speak(msg);
    if(state.index>=9){finish();return}
    state.index++;state.locked=false;render();
    if(state.game==='sounds')playSound(data()[1]);
    await speak(question());
  }else{
    b.classList.add('wrong');$('feedback').textContent='Tente novamente.';await speak('Tente novamente.');state.locked=false;
  }
}
function playSound(a){if(!state.sound||!animalAudio[a])return;if(player)player.pause();player=new Audio(animalAudio[a]);player.volume=.9;player.play().catch(()=>{})}
function start(game){
  if(!games[game])return;state.game=game;state.order=shuffle(games[game].rounds.map((_,i)=>i));state.index=0;state.score=0;state.locked=false;state.speaking=false;state.memory=null;
  $('menu').classList.remove('active');$('game').classList.add('active');render();
  if(game==='sounds')playSound(data()[1]);
  speak(question());
}
function back(){speechSynthesis?.cancel();if(player)player.pause();state.game=null;state.memory=null;state.locked=false;state.speaking=false;$('game').classList.remove('active');$('menu').classList.add('active');}
function finish(){
  state.locked=true;const f=$('feedback');f.textContent=`Parabéns, Ayla! Você acertou ${state.score} de 10!`;speak(`Parabéns, Ayla. Você acertou ${state.score} de 10!`);
  setTimeout(()=>{if(state.game){state.index=0;state.score=0;state.locked=false;state.memory=null;state.order=shuffle(games[state.game].rounds.map((_,i)=>i));render();speak(question())}},2600);
}
function buildMenu(){
  const box=$('gameMenu');if(!box)return;box.innerHTML='';Object.entries(games).forEach(([key,g])=>{const b=document.createElement('button');b.type='button';b.className='game-card';b.innerHTML=`<span class="game-icon">${g.icon}</span><span>${g.name}</span>`;b.addEventListener('click',()=>start(key));box.appendChild(b)});
}
function init(){
  buildMenu();$('backBtn')?.addEventListener('click',back);$('repeatBtn')?.addEventListener('click',()=>{if(state.game&&!state.speaking)speak(question())});$('soundBtn')?.addEventListener('click',()=>{state.sound=!state.sound;$('soundBtn').textContent=state.sound?'🔊':'🔇';if(!state.sound)speechSynthesis?.cancel()});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
