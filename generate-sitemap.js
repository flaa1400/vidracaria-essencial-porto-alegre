import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://vidroessencialportoalegre.com.br';

const staticRoutes = [
  '',
  '/sobre',
  '/contato',
  '/termos',
  '/privacidade',
  '/servicos'
];

const bairros = [
  'anchieta', 'belem-novo', 'azenha', 'agronomia', 'arquipelago', 'belem-velho',
  'bela-vista', 'bom-jesus', 'auxiliadora', 'camaqua', 'bom-fim', 'chacara-das-pedras',
  'boa-vista', 'cascata', 'centro-poa', 'jardim-botanico', 'cristo-redentor', 'cavalhada',
  'cidade-baixa', 'jardim-carvalho', 'farrapos', 'coronel-aparicio-borges', 'farroupilha',
  'jardim-do-salso', 'humaita', 'cristal', 'floresta', 'jardim-itu-sabara', 'jardim-floresta',
  'espirito-santo', 'higienopolis', 'lomba-do-pinheiro',
  'costa-e-silva', 'gloria', 'hipica', 'ipanema', 'jardim-leopoldina', 'jardim-itu', 'jardim-lindoia',
  'mario-quintana', 'menino-deus', 'nonoai', 'partenon', 'passo-d-areia', 'passo-das-pedras',
  'petropolis', 'restinga', 'rio-branco', 'rubem-berta', 'santa-rosa-de-lima', 'santa-tereza',
  'sao-joao', 'sarandi', 'vila-nova'
];

const servicosDir = './src/content/servicos';
const servicos = fs.readdirSync(servicosDir)
  .filter(file => file.endsWith('.md'))
  .map(file => file.replace('.md', ''));

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

const addUrl = (route) => {
  const url = route === '' ? `${BASE_URL}/` : `${BASE_URL}${route}`;
  xml += `  <url>\n    <loc>${url}</loc>\n  </url>\n`;
};

staticRoutes.forEach(addUrl);

servicos.forEach(servico => {
  addUrl(`/servicos/${servico}`);
});

bairros.forEach(bairro => {
  addUrl(`/bairros/${bairro}`);
  servicos.forEach(servico => {
    addUrl(`/bairros/${bairro}/${servico}`);
  });
});

xml += `</urlset>`;

fs.writeFileSync('./public/sitemap.xml', xml);
console.log('Sitemap.xml generated with ' + (staticRoutes.length + servicos.length + bairros.length + (bairros.length * servicos.length)) + ' URLs.');
