# groq-bruce

A connection between the Groq AI API and your Bruce device (currently only compatible with the **T-Embed**), allowing you to use AI anywhere from your device.

## Project Structure

```
T-embed/
├── server.js    # Express API that communicates with the Groq API
└── chat.js      # Bruce OS client script
```

## Requirements

- Node.js 18+
- npm
- A Groq API key

Get your free API key here:

https://console.groq.com/home

---

# Server Setup (Wispbyte)

This tutorial uses **Wispbyte**, a free hosting service that provides an easy-to-use Node.js environment.

## 1. Create a Node.js Server

Create a free Node.js server on Wispbyte:

https://wispbyte.com/

---

## 2. Configure the Server

Open your server management panel and go to **Files**.

Upload `server.js`.

### Add Your API Key

Open `server.js` and replace the placeholder API key with your own Groq API key.

### Set the Startup File

Right-click `server.js` and select **Set as Startup File**.

### Configure the Startup Command

Go to the **Startup** page and replace the default command with:

```bash
NODE_PACKAGES="express groq-sdk dotenv cors"; if [[ -d .git ]] && [[ 0 == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/node /home/container/server.js
```

This command automatically:

- Installs the required Node.js packages.
- Installs any dependencies listed in `package.json`.
- Starts `server.js`.

Once you've finished, start your Wispbyte server.

---

# Connect Your T-Embed

1. Open the Bruce **WebUI**.
2. Upload `chat.js`.
3. Edit the file.
4. Replace the value of `SERVER_URL` with your Wispbyte server's IP address and port.
5. Save the file.

You can now launch `chat.js` from your T-Embed and start chatting with Groq AI.

---

## Notes

- Your Wispbyte server must remain running while using the script.
- Keep your Groq API key private. Do not share it publicly.
- This project currently supports only the **T-Embed** version of Bruce OS.
 
