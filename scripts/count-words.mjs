import fs from 'fs'; import path from 'path';
const dir = 'src/content/posts';
for (const f of fs.readdirSync(dir)) {
  let t = fs.readFileSync(path.join(dir, f), 'utf8');
  const m = t.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const body = m[2].replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/::\w+\[[^\]]*\]/g, '');
  const words = body.split(/\s+/).filter(Boolean).length;
  const fm = m[1].replace(/^words: .*$/m, `words: ${words}`);
  fs.writeFileSync(path.join(dir, f), `---\n${fm}\n---\n${m[2]}`);
  console.log(String(words).padStart(5), f.replace('.md',''));
}
