# MyTokenCost Tracker (Chrome Extension)

> **Enterprise AI Infrastructure monitoring, runaway autonomous loop mitigation, and data residency/shadow AI compliance at zero latency.**

The **MyTokenCost.com Chrome Extension** operates locally on your machine, intercepting, parsing, and logging outbound Large Language Model (LLM) API requests. It matches execution payloads with our localized dynamic rate engine to enforce compliance and calculate real-time developer costs without server overhead.

---

## 📂 Project Directory Structure

Ensure your local directory matches the exact workspace layout below:

```text
mytokencost/
├── chrome-ext/
│   ├── manifest.json       # Manifest V3 extension configuration
│   ├── background.js       # Background worker & compliance processing
│   ├── content.js          # On-page request interception hooks
│   ├── popup.html          # Clean high-density grid popup panel UI
│   ├── popup.js            # Reactive storage hydrator and event broker
│   └── icons/
│       ├── icon-16.png     # Browser favicon asset (16x16)
│       ├── icon-48.png     # Extension dashboard asset (48x48)
│       └── icon-128.png    # App store branding asset (128x128)
├── README.md               # User guide & Technical setup documentation
└── testing-playground.html # Offline simulator for local diagnostic testing
```

---

## 🛠️ Step-by-Step Developer Installation

Because this utility is loaded as an unpacked asset during local testing or enterprise provisioning:

1. **Download/Clone** this project folder to your local machine.
2. Launch Google Chrome and navigate to: `chrome://extensions/`.
3. Toggle the **Developer mode** switch in the top right-hand corner.
4. Click **Load unpacked** in the top left-hand corner.
5. Select the `chrome-ext` folder containing `manifest.json`.
6. Pin the **MyTokenCost Tracker** icon to your toolbar for immediate visual access.

---

## ⚙️ How Network Interception Works

To respect strict enterprise data policies, the extension does not run raw data logs to external clouds:
1. `content.js` is automatically injected into targeted workspace environments (such as OpenAI Playground, ChatGPT interface, Claude, and Google Gemini Console).
2. It wraps the browser's native `window.fetch` inside a secure observer proxy.
3. Upon API resolution, it calculates input/output token metrics, processes them against on-device pricing models, and updates `chrome.storage.local`.
4. If a calculation breaches your **Daily Budget Limit**, the service worker triggers a native OS desktop notification warning of the overrun.

---

## 🧪 Verifying the Sandbox (Zero Cost Testing)

To verify the installation without spending live API credits:
1. Open the included `testing-playground.html` in your browser.
2. Click **Simulate Request** button options.
3. Open your extension's pinned popup. You should instantly see live token logs, exact pricing calculations, and running active models update in real-time.

---

## 🔒 Security & Developer Privacy
* **Local Computing Principle:** All prompt analyzing occurs entirely within your local browser context. Your proprietary context files, system keys, and text outputs never traverse MyTokenCost's infrastructure.
* **Network Integrity:** The request proxy does not block connection flows unless a critical budget limit breach is encountered.
