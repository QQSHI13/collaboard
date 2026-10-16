# CollaBoard 🎨

Real-time collaborative whiteboard using WebRTC data channels. Draw together with friends or colleagues without any server—pure peer-to-peer.

**Live Demo**: https://qqshi13.github.io/collaboard/

---

## ✨ Features

### Drawing Tools
- **🖌️ Smooth Drawing** — Mouse and touch support with smooth bezier curves
- **🎨 8 Colors** — GitHub blue, red, green, yellow, purple, orange, white, black/eraser
- **📏 4 Brush Sizes** — 2px, 5px, 10px, 20px strokes
- **🧹 Clear Canvas** — Clears and broadcasts to all connected peers

### Real-Time Collaboration
- **🔗 WebRTC P2P** — Direct peer-to-peer connection via PeerJS
- **🏠 Room Codes** — Auto-generated 6-digit unique room IDs
- **🔑 Join by Code** — Enter a code to join existing rooms
- **🌐 Multi-Peer** — Mesh network—all peers sync with each other
- **👀 Peer Cursors** — See remote peers drawing in real-time
- **📋 Canvas Sync** — New peers receive full canvas state on join

### UI/UX
- **📡 Connection Status** — Visual indicator (offline/connecting/connected)
- **👥 Peer Count** — Shows number of connected collaborators
- **💾 Export PNG** — Download your artwork
- **🌙 Dark Theme** — GitHub-inspired dark UI

---

## 🚀 Usage

### Starting a Session
1. Open [CollaBoard](https://qqshi13.github.io/collaboard/)
2. A unique 6-digit room code is generated automatically
3. Share the code with friends
4. Start drawing!

### Joining a Session
1. Open [CollaBoard](https://qqshi13.github.io/collaboard/)
2. Click "Join Room"
3. Enter the 6-digit code
4. Collaborate in real-time

### Drawing Controls
- Select colors from the palette
- Adjust brush size with the size buttons
- Click "Clear" to erase (broadcasts to all peers)
- Click "Export" to save as PNG

---

## 🛠️ Technologies

- **P2P**: WebRTC DataChannels via [PeerJS](https://peerjs.com/)
- **Canvas**: HTML5 Canvas API with smooth drawing algorithms
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Variables, Flexbox
- **Security**: Content Security Policy (CSP)
- **Features**: PWA support, touch support for mobile

---

## 📦 Installation (Self-Host)

```bash
# Clone the repository
git clone https://github.com/QQSHI13/collaboard.git

# Open in browser
cd collaboard
# Open index.html in your browser
```

---

## ⚠️ Limitations

- Requires internet connection for initial PeerJS signaling
- Some corporate firewalls may block WebRTC
- Mesh topology—each peer connects to all others (best for small groups)

---

## 🔒 Privacy

- No server stores your drawings
- Direct peer-to-peer connections
- Room codes are temporary and not persisted

---

## 📝 License

This project is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.

See [LICENSE](./LICENSE) for details.

---

## 🙏 Credits

Built with ❤️ by **QQ** and **Nova** ☄️


Uses [PeerJS](https://peerjs.com/) for WebRTC signaling.

## Star History

<a href="https://www.star-history.com/?repos=QQSHI13%2Fcollaboard&type=date&legend=top-left">
 <picture>
 <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=QQSHI13/collaboard&type=date&theme=dark&legend=top-left" />
 <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=QQSHI13/collaboard&type=date&legend=top-left" />
 <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=QQSHI13/collaboard&type=date&legend=top-left" />
 </picture>
</a>

---

## Vendored browser dependencies

Third-party browser libraries are served from `vendor/`, not a public CDN —
`cdn.jsdelivr.net` and friends are blocked or unreliable on some networks, which
silently broke the app.

```bash
npm ci          # install the exact pinned versions
npm run vendor  # copy the browser builds into vendor/ and write VERSIONS.json
```

Versions are pinned exactly in `package.json` and tracked by Dependabot. The
`Vendor check` workflow re-runs `npm run vendor` on every push and PR and fails
if `vendor/` differs from the pins, so **after merging a dependency bump run
`npm ci && npm run vendor` and commit the regenerated files**:

```bash
gh pr checkout <number> && npm ci && npm run vendor
git commit -am "chore: re-vendor after dependency bump" && git push
```

---

## 🎨 Theme

`theme/theme.css` is a vendored, self-hosted copy of the canonical stylesheet
[`tools-suite/shared/theme.css`](https://github.com/QQSHI13/tools-suite/blob/main/shared/theme.css)
(published at <https://qqshi13.github.io/tools-suite/shared/theme.css>). It holds
the shared design tokens and primitives (buttons, cards, panels, badges, toasts,
`sr-only`, focus/selection/scrollbar styling); `index.html` links it locally, so
there is **no runtime cross-site dependency**.

The copy is pinned by sha256 in `theme/theme.sha256`:

```bash
npm run theme              # fetch the canonical file, verify it against the pin, write theme/theme.css
npm run theme -- --check   # verify the committed copy matches the pin (offline; what CI runs)
npm run theme:pin          # maintainer: re-pin to the current canonical file, then commit
```

Never edit `theme/theme.css` by hand — `npm run theme` overwrites it, and the
`Vendor check` workflow fails on drift. To pick up a theme change: edit
`tools-suite/shared/theme.css`, deploy it, then run `npm run theme:pin` here.
