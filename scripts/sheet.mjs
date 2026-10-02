import sharp from 'sharp'; import fs from 'fs'; import path from 'path';
const dir=process.argv[2]||'../source-media'; const out=process.argv[3]||'sheet';
const files=fs.readdirSync(dir).filter(f=>/\.(jpe?g|png|webp|heic)$/i.test(f)).sort();
const T=300, cols=5; const tiles=[]; const fails=[];
for (const f of files){
  try{
    const b=await sharp(path.join(dir,f),{failOn:'none'}).rotate().resize(T,T,{fit:'contain',background:'#222'}).jpeg({quality:70}).toBuffer();
    const label=Buffer.from(`<svg width="${T}" height="22"><rect width="${T}" height="22" fill="#000"/><text x="4" y="16" font-size="13" fill="#fff" font-family="Arial">${f.replace(/&/g,'').slice(0,40)}</text></svg>`);
    tiles.push(await sharp({create:{width:T,height:T+22,channels:3,background:'#000'}}).composite([{input:b,top:0,left:0},{input:label,top:T,left:0}]).jpeg().toBuffer());
  }catch(e){fails.push(f+': '+e.message.slice(0,60));}
}
const per=20;
for(let i=0;i<tiles.length;i+=per){
  const part=tiles.slice(i,i+per); const rows=Math.ceil(part.length/cols);
  await sharp({create:{width:cols*T,height:rows*(T+22),channels:3,background:'#000'}}).composite(part.map((t,j)=>({input:t,left:(j%cols)*T,top:Math.floor(j/cols)*(T+22)}))).jpeg({quality:75}).toFile(`../_sheets/${out}${i/per+1}.jpg`);
}
console.log(tiles.length,'ok; fails:',fails);
