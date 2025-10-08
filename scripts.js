/* ...existing code... */
const sounds = [
  {id:'sfx1', title:'Heavy Stone > Hard Earth', file:'sfx1.mp3', desc:'Large rough stone slams into compact soil. Deep low thud with subtle dirt crackle. 1.6s'},
  {id:'sfx2', title:'Rock on Rock — Clang + Thud', file:'sfx2.mp3', desc:'Medium rock hits another rock — metallic short clang then thud. 1.2s'},
  {id:'sfx3', title:'Pebble Scatter', file:'sfx3.mp3', desc:'Multiple small pebbles striking soil/stone, quick high-frequency taps. 1.0s'},
  {id:'sfx4', title:'Granite Impact (Damped)', file:'sfx4.mp3', desc:'Dense granite impact with strong low frequency and fast damping. 1.8s'},
  {id:'sfx5', title:'Rock Drop in Loose Dirt', file:'sfx5.mp3', desc:'Rock falls into loose sandy dirt — muted thump and sand hiss. 1.4s'},
  {id:'sfx6', title:'Sharp Edge Strike', file:'sfx6.mp3', desc:'Sharp edge of rock scrapes and strikes another rock — high transient. 0.9s'},
  {id:'sfx7', title:'Echoing Canyon Hit', file:'sfx7.mp3', desc:'Rock hits rock with a short echo/reverb like a canyon. 2.2s'},
  {id:'sfx8', title:'Crack and Roll', file:'sfx8.mp3', desc:'Initial crack on impact then a brief rolling tumble of stones. 2.0s'},
  {id:'sfx9', title:'Distant Thud Through Soil', file:'sfx9.mp3', desc:'Muffled, distant heavy thud as if underground impact. 1.6s'},
  {id:'sfx10', title:'Fragile Slate Snap', file:'sfx10.mp3', desc:'Thin slate-like piece snapping and small debris scatter. 1.1s'},

  // 10 additional closely related variants (reuse existing files for quick testing)
  {id:'sfx11', title:'Large Rock > Loose Soil (Deep)', file:'sfx1.mp3', desc:'Variant: heavier take with deeper emphasis, useful for big drops. 1.6s'},
  {id:'sfx12', title:'Rock Against Pebble Cluster', file:'sfx2.mp3', desc:'Variant: more metallic high transient + small ricochets. 1.2s'},
  {id:'sfx13', title:'Tiny Pebble Burst', file:'sfx3.mp3', desc:'Variant: faster, brighter pebbles for granular impacts. 1.0s'},
  {id:'sfx14', title:'Dense Slab Hit', file:'sfx4.mp3', desc:'Variant: heavier low-end focus from dense granite impacts. 1.8s'},
  {id:'sfx15', title:'Sandy Hollow Thud', file:'sfx5.mp3', desc:'Variant: more sand hiss and muted mid frequencies. 1.4s'},
  {id:'sfx16', title:'Thin Edge Snap + Scratch', file:'sfx6.mp3', desc:'Variant: slightly longer scrape into the hit for sharp textures. 0.9s'},
  {id:'sfx17', title:'Canyon Reflection (Warm)', file:'sfx7.mp3', desc:'Variant: warmer canyon tail with a touch more ambience. 2.2s'},
  {id:'sfx18', title:'Cascade Roll Extended', file:'sfx8.mp3', desc:'Variant: emphasizes the rolling taps after the crack. 2.0s'},
  {id:'sfx19', title:'Buried Thud (Muffled)', file:'sfx9.mp3', desc:'Variant: further damped, useful for subterranean impacts. 1.6s'},
  {id:'sfx20', title:'Slate Shatter Small Debris', file:'sfx10.mp3', desc:'Variant: sharper snap with more high-frequency debris. 1.1s'},
];

const list = document.getElementById('sfx-list');

const audioMap = new Map();

function createItem(s){
  const li = document.createElement('li');
  li.className = 'sfx-item';
  li.tabIndex = 0;
  li.dataset.id = s.id;

  const meta = document.createElement('div');
  meta.className = 'sfx-meta';
  meta.innerHTML = `<div class="sfx-title">${s.title}</div><div class="sfx-desc">${s.desc}</div>`;

  const controls = document.createElement('div');
  controls.className = 'sfx-controls';
  const playBtn = document.createElement('button');
  playBtn.className = 'btn';
  playBtn.textContent = 'Play';
  playBtn.addEventListener('click', (e)=>{
    e.stopPropagation();
    togglePlay(s.id);
  });

  const stopBtn = document.createElement('button');
  stopBtn.className = 'btn';
  stopBtn.textContent = 'Stop';
  stopBtn.addEventListener('click', (e)=>{
    e.stopPropagation();
    stopSound(s.id);
  });

  controls.appendChild(playBtn);
  controls.appendChild(stopBtn);

  li.appendChild(meta);
  li.appendChild(controls);

  li.addEventListener('click', ()=> togglePlay(s.id));
  li.addEventListener('keydown', (e)=>{
    if(e.code === 'Space') { e.preventDefault(); togglePlay(s.id); }
  });

  return li;
}

function loadAudio(s){
  if(audioMap.has(s.id)) return audioMap.get(s.id);
  const a = new Audio(s.file);
  a.preload = 'auto';
  audioMap.set(s.id,a);
  a.addEventListener('ended', ()=> {
    // reset so user can replay instantly
    a.currentTime = 0;
  });
  return a;
}

function togglePlay(id){
  const s = sounds.find(x=>x.id===id);
  if(!s) return;
  const a = loadAudio(s);
  if(a.paused) {
    stopAll();
    a.currentTime = 0;
    a.play();
  } else {
    a.pause();
    a.currentTime = 0;
  }
}

function stopSound(id){
  const a = audioMap.get(id);
  if(a){ a.pause(); a.currentTime = 0; }
}

function stopAll(){
  audioMap.forEach(a=>{
    a.pause();
    a.currentTime = 0;
  });
}

document.getElementById('stop-all').addEventListener('click', stopAll);

for(const s of sounds){
  list.appendChild(createItem(s));
}
/* ...existing code... */