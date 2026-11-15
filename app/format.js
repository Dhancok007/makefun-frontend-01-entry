export const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const money = value => '$' + Number(value || 0).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
export const deadline = b => b.deadline || b.ends_at;
export const open = b => Date.parse(deadline(b)) > Date.now() && !['resolved','cancelled','closed'].includes(b.status);
export function countdown(value) { const s = Math.max(0,Math.floor((Date.parse(value)-Date.now())/1000)); return !Number.isFinite(s) ? 'No deadline' : !s ? 'Entries closed' : `${Math.floor(s/86400)}d ${String(Math.floor(s/3600)%24).padStart(2,'0')}h ${String(Math.floor(s/60)%60).padStart(2,'0')}m ${String(s%60).padStart(2,'0')}s`; }
export const date = value => value ? new Date(value).toLocaleString(undefined,{dateStyle:'medium',timeStyle:'short'}) : 'Not announced';
export const pot = b => b.potUsd ?? b.rewardAmount ?? b.reward_usd ?? b.live_pot_usd ?? b.pot_usd ?? b.reward ?? 0;
export const markdown = text => esc(text).split('\n\n').map(p=> /^#{1,3} /.test(p) ? `<h3>${p.replace(/^#+ /,'')}</h3>` : `<p>${p.replace(/\n/g,'<br>')}</p>`).join('');
