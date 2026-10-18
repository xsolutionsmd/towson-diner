// Static contract checks, run against Vite's built output by `npm run check`.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const app = fileURLToPath(new URL('../', import.meta.url));
const dist = join(app, 'dist');
const failures = [];
const check = (ok, message) => { if (!ok) failures.push(message); };
const menu = JSON.parse(readFileSync(join(app, 'data/menu.json'), 'utf8'));
const menuIDs = new Set(menu.items.map(item => item.id));
check(menu.items.length === 432 && menuIDs.size === 432, 'expected all 432 unique sourced menu IDs');
check(new Set(menu.items.map(item => item.category)).size === 6, 'expected all six sourced menus');
for (const item of menu.items) {
  check(item.url.startsWith(menu.source + '/item-') && item.url.endsWith('_' + item.id), `invalid source URL for ${item.id}`);
  check(item.price === '' || /^\$\d+\.\d{2}$/.test(item.price), `invalid observed price for ${item.id}`);
  check(!('description' in item), `ingredient descriptions must remain omitted: ${item.id}`);
}
let config = {};
try {
  if (existsSync(join(app, 'xs-check.json'))) config = JSON.parse(readFileSync(join(app, 'xs-check.json'), 'utf8'));
  if (!config || Array.isArray(config) || typeof config !== 'object') throw new Error('expected an object');
  for (const key of Object.keys(config)) {
    if (!['allowedExternalResources', 'requiredLinks'].includes(key)) throw new Error(`unknown option ${key}`);
  }
  for (const key of ['allowedExternalResources', 'requiredLinks']) {
    if (config[key] !== undefined && (!Array.isArray(config[key]) || config[key].some(v => typeof v !== 'string' || !v.trim()))) {
      throw new Error(`${key} must be an array of nonempty strings`);
    }
  }
  for (const url of config.allowedExternalResources || []) {
    if (!/^https?:\/\//i.test(url) || new URL(url).username || new URL(url).password) throw new Error(`invalid allowed URL ${url}`);
  }
} catch (error) {
  console.error(`Invalid xs-check.json: ${error.message}`);
  process.exit(1);
}

const decode = value => value.replace(/&(?:amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);/gi, entity => {
  const key = entity.slice(1, -1).toLowerCase();
  if (key.startsWith('#')) {
    const code = key[1] === 'x' ? parseInt(key.slice(2), 16) : Number(key.slice(1));
    return code <= 0x10ffff ? String.fromCodePoint(code) : entity;
  }
  return { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>' }[key];
});
const attributes = tag => Object.fromEntries([...tag.matchAll(/([^\s=<>/]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)]
  .map(m => [m[1].toLowerCase(), decode(m[2] ?? m[3] ?? m[4])]));
const files = [];
function walk(dir, rel = '') {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    const name = `${rel}${entry.name}`;
    if (entry.isDirectory()) walk(path, `${name}/`);
    else files.push(name);
  }
}
check(existsSync(join(dist, 'index.html')), 'dist/index.html is missing');
if (existsSync(dist)) walk(dist);
const links = new Set();
const external = new Set();
const resource = value => {
  const url = decode(value).trim();
  if (/^(?:https?:)?\/\//i.test(url)) external.add(url.startsWith('//') ? `https:${url}` : url);
};
const cssResources = text => {
  for (const m of text.matchAll(/url\(\s*(['"]?)(.*?)\1\s*\)|@import\s+['"]([^'"]+)['"]/gi)) resource(m[2] ?? m[3]);
};
const banned = [/\$\s?\d/, /\b\d(?:\.\d)?\s*[- ]?stars?\b/i, /testimonial/i, /\bpercent\b|\d+\s*%/i, /years? of experience/i];
for (const name of files) {
  if (!/\.(html|css|[cm]?js)$/i.test(name)) continue;
  const source = readFileSync(join(dist, name), 'utf8');
  if (/\.css$/i.test(name)) { cssResources(source); continue; }
  if (/\.[cm]?js$/i.test(name)) {
    // Literal URLs catch fetch/import/worker endpoints as well as bundled media.
    for (const m of source.matchAll(/["'`](https?:\/\/[^"'`\s]+|\/\/[^"'`\s]+)["'`]/g)) resource(m[1]);
    continue;
  }
  const html = source.replace(/<!--[\s\S]*?-->/g, '');
  const tags = [...html.matchAll(/<([a-z][\w:-]*)\b[^>]*>/gi)].map(m => ({ name: m[1].toLowerCase(), attrs: attributes(m[0]) }));
  check(tags.some(t => t.name === 'meta' && t.attrs.name?.toLowerCase() === 'robots' && /(?:^|[\s,])noindex(?:$|[\s,])/i.test(t.attrs.content || '')), `${name}: robots noindex meta missing`);
  for (const { name: tag, attrs: a } of tags) {
    if (tag === 'a' && a.href) links.add(a.href);
    if (tag === 'form') {
      const endpoint = a['data-xs-delivery'] || '';
      check(/^(?:\/(?!\/)[^\s#]+|https:\/\/[^\s#]+)$/.test(endpoint) && a.action === endpoint && a.method?.toLowerCase() === 'post', `${name}: form needs a tested data-xs-delivery endpoint, matching action and method=post`);
    }
    for (const key of ['src', 'poster', 'background']) if (a[key]) resource(a[key]);
    if (a.srcset) for (const candidate of a.srcset.split(',')) resource(candidate.trim().split(/\s+/)[0]);
    if (a.style) cssResources(a.style);
    if (tag === 'link' && /(?:^|\s)(?:stylesheet|icon|preload|modulepreload|prefetch|preconnect|dns-prefetch)(?:\s|$)/i.test(a.rel || '')) resource(a.href || '');
    if (['use', 'image'].includes(tag)) resource(a.href || a['xlink:href'] || '');
    if (tag === 'object') resource(a.data || '');
  }
  for (const m of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) cssResources(m[1]);
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (/application\/ld\+json/i.test(m[1])) continue;
    for (const url of m[2].matchAll(/["'`](https?:\/\/[^"'`\s]+|\/\/[^"'`\s]+)["'`]/g)) resource(url[1]);
  }
  const visible = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '');
  // Permit dollars only inside validated source-menu price spans. Keep the generic
  // unsupported-claim check everywhere else; never allow arbitrary dollar claims.
  if (name === 'menu/index.html') {
    const rows = [...visible.matchAll(/<li class="menu-item" data-source-id="([^"]+)"[^>]*><a href="([^"]+)"><span>(.*?)<\/span><span class="price">(.*?)<\/span><\/a><\/li>/g)];
    check(rows.length === 432 && new Set(rows.map(r => r[1])).size === 432, 'rendered menu must preserve 432 unique source IDs');
    for (const row of rows) {
      const item = menu.items.find(i => i.id === row[1]);
      check(Boolean(item) && decode(row[2]) === item.url && decode(row[3]) === item.name.trim() && decode(row[4]) === (item.price || 'See online options'), `menu source mismatch: ${row[1]}`);
    }
    check(!/<img\b/.test(visible.slice(visible.indexOf('id="menu-content"'))), 'menu item rows must stay text-only');
  }
  const claims = name === 'menu/index.html' ? visible.replace(/<span class="price">[^<]*<\/span>/g, '') : visible;
  const text = decode(claims.replace(/<[^>]+>/g, ' '));
  check(!/>\s*0\d\s*</.test(visible) && !/\b0\d\s*\/\s*0\d\b/.test(text), `${name}: decorative numbering pattern found`);
  for (const pattern of banned) check(!pattern.test(text), `${name}: unsupported claim pattern ${pattern}`);
}
for (const page of ['index.html', 'menu/index.html', 'about/index.html', 'visit/index.html']) check(files.includes(page), `direct page missing: ${page}`);
for (const link of config.requiredLinks || []) check(links.has(link), `required link missing: ${link}`);
const unexpected = [...external].filter(url => !(config.allowedExternalResources || []).some(allowed => url === allowed || (allowed.endsWith('/') && url.startsWith(allowed))));
check(!unexpected.length, `unexpected external runtime resources: ${unexpected.join(', ')}`);
if (failures.length) {
  console.error('Site checks failed:\n- ' + failures.join('\n- '));
  process.exit(1);
}
console.log(`Site checks passed (${files.length} built files).`);
