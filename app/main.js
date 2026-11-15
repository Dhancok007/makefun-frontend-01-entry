import {skeleton,errorBox,ticker} from './views.js';
const root=document.querySelector('#app');
let generation=0,cleanup=()=>{};
async function route(){ const version=++generation; cleanup(); window.__shotReady=false; root.innerHTML=skeleton(); const parts=location.hash.slice(2).split('/').map(decodeURIComponent); try { const module=parts[0]==='bounty' ? await (parts[2]==='leaderboard' ? import('./routes/leaderboard.js') : import('./routes/bounty.js')) : parts[0]==='u' ? await import('./routes/profile.js') : await import('./routes/board.js'); const render=await module.load(parts); if(version!==generation)return; render(root); cleanup=ticker(root); window.__shotReady=true; } catch(error){if(version!==generation)return;root.innerHTML=errorBox(error);root.querySelector('#retry').addEventListener('click',route);window.__shotReady=true;} }
window.addEventListener('hashchange',route);route();
