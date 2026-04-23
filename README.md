# Automated-Bias-Audit is A Chrome Extention to look at the AI-generated-biases online! 

The tool is called as "IR Scholar: Comparative Geopolitical Researcher" and it is a Chrome Extension designed for International Relations (IR) researchers, political scientists, and students. It performs a side-by-side comparative analysis of news articles and scholarly texts using two distinct AI "engines": **Gemini 2.5 Flash** (representing a Western/US-centric framing) and **DeepSeek-V3** (representing a non-Western/Global South perspective).

The tool concludes with an **Automated Bias Audit**, synthesizing the differences in theoretical framing (Liberalism vs. Realism vs. Structuralism) between the two models.

---

## 🚀 Features

- **Side-by-Side Analysis**: Compare how different AI infrastructures interpret the same text.
- **Geopolitical Bias Audit**: A third synthesis layer that highlights differences in terminology and theoretical assumptions.
- **Scraper Integration**: Extracts content directly from the active tab (Foreign Affairs, Project Syndicate, etc.).
- **Smart UI**: Dynamic button logic that guides users through API configuration.
- **Academic Framing**: Specialized prompts designed to identify Neomercantilism, Strategic Autonomy, and Power Transitions.

---

## 🛠️ Installation & Deployment

### 1. Clone the Repository
1. Clone teh repository

### 2\. Load into Chrome

1.  Open Chrome and navigate to `chrome://extensions/`.
2.  Enable **"Developer mode"** in the top right corner.
3.  Click **"Load unpacked"**.
4.  Select the folder containing the extension files.

### 3\. Configuration

1.  Right-click the extension icon and select **Options**.
2.  Enter your **Google AI Studio** key (for Gemini 2.5 Flash).
3.  Enter your **DeepSeek API** key.
4.  Click **Save Configuration**.

-----

## 📂 File Structure

  - `manifest.json`: Extension metadata and permissions (Manifest V3).
  - `popup.html`: The dual-column comparative interface.
  - `popup.js`: Core logic for scraping, parallel API execution, and synthesis.
  - `options.html/js`: Secure local storage for API credentials.
  - `style.css`: Academic-themed styling (Georgia serif typography).

-----

## 🔍 Methodology

This tool utilizes a **Triangulation Prompting** technique:

1.  **Model A (Gemini 2.5 Flash)**: Instructed to act as a Western Senior IR Scholar.
2.  **Model B (DeepSeek-V3)**: Instructed to provide an "open" perspective, often reflecting multipolar or structuralist logic.
3.  **The Auditor**: A final call to the Flash model to identify "Convergence" and "Divergence" between the two previous outputs.

-----

## ⚠️ Known Issues & Troubleshooting

  - **HTTP 429**: Rate limiting on the Gemini Free Tier. The extension includes a 1-second delay between analysis and audit to mitigate this.
  - **HTTP 503**: Occurs during high server traffic. If this persists, refresh the article tab and try again.
  - **Insufficient Balance**: Ensure your DeepSeek account has a pre-paid balance.

-----

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

-----

## 👤 Contact
hakan.mehmetcik@marmara.edu.tr 
