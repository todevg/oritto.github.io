import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();
const publicRoot = path.join(projectRoot, 'public');
const failures = [];

async function collectFiles(directory, extension) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(entryPath, extension));
    } else if (entry.name.endsWith(extension)) {
      files.push(entryPath);
    }
  }

  return files;
}

function report(file, message) {
  failures.push(`${path.relative(projectRoot, file)}: ${message}`);
}

async function targetExists(targetPath) {
  try {
    const targetStat = await stat(targetPath);
    if (targetStat.isDirectory()) {
      await stat(path.join(targetPath, 'index.html'));
    }
    return true;
  } catch {
    return false;
  }
}

function extractAttributeValues(html, attribute) {
  const expression = new RegExp(`${attribute}=["']([^"']+)["']`, 'gi');
  return [...html.matchAll(expression)].map((match) => match[1]);
}

async function validateHtml(file) {
  const html = await readFile(file, 'utf8');
  const relativePath = path.relative(publicRoot, file).replaceAll('\\', '/');
  const isNestedPage = relativePath.includes('/');

  if (!/^<!doctype html>/i.test(html.trimStart())) report(file, 'missing HTML doctype');
  if (!/<html\s+lang="en"/i.test(html)) report(file, 'missing html lang="en"');
  if (!/<meta\s+name="viewport"/i.test(html)) report(file, 'missing viewport metadata');
  if (!/<meta\s+name="description"\s+content="[^"]{40,}"/i.test(html)) report(file, 'missing useful meta description');
  if (!/<link\s+rel="canonical"\s+href="https:\/\//i.test(html)) report(file, 'missing canonical URL');
  if ((html.match(/<h1(?:\s|>)/gi) || []).length !== 1) report(file, 'must contain exactly one h1');
  if (!/<a\s+class="skip-link"\s+href="#main-content"/i.test(html)) report(file, 'missing skip link');
  if (!/<main\s+id="main-content"/i.test(html)) report(file, 'missing main landmark target');
  if (/<img(?![^>]*\salt=)[^>]*>/i.test(html)) report(file, 'image missing alt attribute');
  if (/href=["']#["']/i.test(html)) report(file, 'placeholder href="#" is not allowed');
  if (/\sonclick=/i.test(html)) report(file, 'inline click handlers are not allowed');
  if (/support@polycab\.com/i.test(html)) report(file, 'contains unverified third-party support email');
  if (/Ticket Status:\s*IN PROGRESS|Assigned Field Engineer/i.test(html)) report(file, 'contains simulated complaint status');
  if (isNestedPage && !/<base\s+href="\.\.\/">/i.test(html)) report(file, 'nested page must define base href="../"');

  const linkableHtml = html.replace(/<base\b[^>]*>/gi, '');
  const references = [
    ...extractAttributeValues(linkableHtml, 'href'),
    ...extractAttributeValues(linkableHtml, 'src')
  ];

  for (const reference of references) {
    if (/^(?:https?:|mailto:|tel:|#|data:)/i.test(reference)) continue;
    const cleanReference = reference.split(/[?#]/)[0];
    if (!cleanReference) continue;
    const targetPath = path.resolve(isNestedPage ? publicRoot : path.dirname(file), cleanReference);
    if (!targetPath.startsWith(publicRoot) || !await targetExists(targetPath)) {
      report(file, `broken local reference: ${reference}`);
    }
  }
}

const htmlFiles = await collectFiles(publicRoot, '.html');
const expectedPages = [
  'index.html',
  'company/index.html',
  'products/index.html',
  'solutions/index.html',
  'solar/index.html',
  'support/index.html',
  'distribution/index.html',
  'privacy/index.html',
  'terms/index.html',
  'sitemap/index.html'
];

for (const expectedPage of expectedPages) {
  const expectedPath = path.join(publicRoot, expectedPage);
  if (!await targetExists(expectedPath)) report(expectedPath, 'required page is missing');
}

for (const htmlFile of htmlFiles) await validateHtml(htmlFile);

for (const requiredFile of ['robots.txt', 'sitemap.xml', 'css/style.css', 'js/app.js']) {
  const requiredPath = path.join(publicRoot, requiredFile);
  if (!await targetExists(requiredPath)) report(requiredPath, 'required asset is missing');
}

if (failures.length > 0) {
  console.error(`Static-site validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML pages and required static assets.`);
