/**
 * Copy browser builds out of node_modules into vendor/.
 *
 * PeerJS drives the WebRTC signalling for CollaBoard; loading it from a public
 * CDN put a third party on the critical path (unpkg/jsdelivr are unreliable or
 * blocked on some networks). Serving it ourselves removes that dependency.
 *
 * Dependabot bumps the exact pin in package.json; CI runs this script and fails
 * if vendor/ has drifted, so the two can never disagree.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MAP = [
  ['peerjs', 'dist/peerjs.min.js', 'vendor/peerjs.min.js'],
];

mkdirSync('vendor', { recursive: true });
const versions = {};

for (const [pkg, from, to] of MAP) {
  const src = join('node_modules', pkg, from);
  if (!existsSync(src)) {
    console.error(`vendor: missing ${src} — run "npm ci" first`);
    process.exit(1);
  }
  copyFileSync(src, to);
  versions[pkg] = JSON.parse(readFileSync(join('node_modules', pkg, 'package.json'), 'utf8')).version;
  console.log(`vendor: ${to} <- ${pkg}@${versions[pkg]}`);
}

writeFileSync('vendor/VERSIONS.json', JSON.stringify(versions, null, 2) + '\n');
console.log('vendor: wrote vendor/VERSIONS.json');
