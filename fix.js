const AYLA_RANDOM={order:[]};
window.startGame=function(game){AYLA_RANDOM.order=shuffle(games[game].rounds.map((_,i)=>i));state.game=game;state.index=0;state.score=0;state.locked=false;state.speaking=false;state.memory=null;window.speechSynthesis?.cancel();$('menu').classList.remove('active');$('game').classList.add('active');setTimeout(()=>presentRound(),120)};
window.data=function(){const g=games[state.game];const i=AYLA_RANDOM.order[state.index]??state.index;return g.rounds[i]};
window.presentRound=async function(){if(!state.game)return;state.locked=true;renderRound();if(state.game==='sounds'){await new Promise(r=>setTimeout(r,180));state.locked=false;playAnimalSound(data()[1]);}else{state.locked=false;}await speak(questionText());};
