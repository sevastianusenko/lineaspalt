import fs from 'fs';
const files = {
  'new-holland': 'asphalt-new-holland-pa',
  quarryville: 'asphalt-quarryville-pa',
  denver: 'asphalt-denver-pa',
  'mount-joy': 'sealcoating-striping-and-repair-in-mount-joy-pa',
  leola: 'sealcoating-striping-and-repair-in-leola-pa',
  gap: 'asphalt-sealcoating-striping-repair-in-gap-pa',
};
const out = {};
for (const [k, f] of Object.entries(files)) {
  const lines = fs.readFileSync(`../_old/${f}.md`, 'utf8').split('\n').map((l) => l.trim()).filter(Boolean);
  const idx = (re, from = 0) => lines.findIndex((l, i) => i >= from && re.test(l));
  const iIntro = idx(/^## Your Local Asphalt Crew|^## Local Asphalt|^## Your .* Asphalt/);
  const iStat = idx(/^Free$/, iIntro);
  const intro = lines.slice(iIntro + 1, iStat);
  const iProps = idx(/^## Properties We Service/);
  const iAbout = idx(/^About .*PA$/, iProps);
  const props = [];
  for (let i = iProps + 1; i < iAbout; i++) if (lines[i].startsWith('#### ')) props.push([lines[i].slice(5), lines[i + 1]]);
  const iAboutH = idx(/^## /, iAbout);
  const iFirstH5 = idx(/^##### /, iAboutH);
  const about = lines.slice(iAboutH + 1, iFirstH5);
  const iAlso = idx(/^Also serving nearby/);
  const iHow = idx(/^How It Works/, iAlso);
  const facts = [];
  for (let i = iFirstH5; i < iAlso; i++) if (lines[i].startsWith('##### ')) facts.push([lines[i].slice(6), lines[i + 1]]);
  const nearby = lines.slice(iAlso + 1, iHow);
  const iFaq = idx(/^## Frequently Asked/);
  const iOff = idx(/^## What We Offer/);
  const faq = [];
  for (let i = iFaq + 1; i < iOff - 1; i += 2) faq.push([lines[i], lines[i + 1]]);
  out[k] = { h: lines[iAboutH], intro, props, about, facts, nearby, faq };
}
fs.writeFileSync('../_old/cities.json', JSON.stringify(out, null, 1));
for (const [k, v] of Object.entries(out)) console.log(k, v.intro.length, v.props.length, v.about.length, v.facts.length, v.nearby.length, v.faq.length);
