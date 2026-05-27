# Privacy Policy for MyTokenCost Tracker

**Last Updated:** May 27, 2026

MyTokenCost.com ("we," "us," or "our") operates the **MyTokenCost Tracker** Chrome Extension. We are deeply committed to developer privacy and data minimization. This Privacy Policy details how we handle information processed by the extension.

---

## 1. Core Privacy Principle: 100% On-Device Processing

MyTokenCost Tracker is architected as a **local-first utility**. 
* **Zero Server Transmission:** The extension **never** transmits your prompt content, response payloads, keys, or raw interaction text to our servers or any third-party services.
* **Local Storage Only:** All statistical logs, token counts, and session calculation histories are saved locally within your browser's private sandboxed profile via `chrome.storage.local`. 

---

## 2. Information Collected and Processed

To calculate your real-time spend, the extension processes network metadata from the following endpoints if enabled by the user:
* OpenAI (`api.openai.com`, `chatgpt.com`)
* Anthropic (`api.anthropic.com`, `claude.ai`)
* Google Gemini (`generativelanguage.googleapis.com`, `gemini.google.com`)

### Data Analyzed on the Client Side:
* **Usage Statistics:** The token values (`prompt_tokens`, `completion_tokens`) returned directly by the host APIs.
* **Model Metadata:** The string indicating which model was queried (e.g., `gpt-4o`, `claude-3-5-sonnet`).
* **Cost Statistics:** Cumulative mathematical values calculated against our local pricing index.

*This data remains strictly on your local browser. If you clear your browser storage or click "Reset All Metrics" in the popup UI, this data is permanently deleted.*

---

## 3. Chrome Web Store "Limited Use" Compliance

We strictly comply with the **Chrome Web Store Single-Purpose and Limited Use policies**:
* We do not sell, rent, or trade your processed data to third parties, ad networks, or brokers.
* We do not use your LLM text payloads, prompt metadata, or metrics to train models, target advertisements, or establish consumer profiling.
* Data access permissions (`storage`, `declarativeNetRequest`, `notifications`) are requested solely to execute the extension's stated purpose of cost-monitoring and budgeting.

---

## 4. Contact Us
If you have any security or privacy inquiries regarding this local extension, please contact us at:
* **Email:** support@mytokencost.com
* **Website:** https://mytokencost.com
