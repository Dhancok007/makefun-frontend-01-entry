import {cpSync,mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';
import {buildDossier} from './vendor/makefun-frontend.ts';
const source=fileURLToPath(new URL('.',import.meta.url));
const output=process.env.MAKEFUN_OUTPUT_DIR||'/output';
mkdirSync(output,{recursive:true});
for(const folder of ['app','screenshots'])cpSync(join(source,folder),join(output,folder),{recursive:true});
writeFileSync(join(output,'dossier.json'),buildDossier(output,{text_max_bytes:163840,screenshots:{max:3,max_bytes:262144}}));
