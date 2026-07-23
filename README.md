# groq-bruce

a connection between groq AI to your bruce device (currently only working on the T-embed), letting you use AI in any time and place from your device.

 ## Project Structure

```
T-embed/
├── server.js    # Express API that communicates with the Groq API
└── chat.js      # Bruce OS client script
```

 ## Requirements

- Node.js 18+
- npm 
- A Groq API key **get the API key here - https://console.groq.com/home **

 ## Server Setup (Wispbyte)

This tutorial uses **Wispbyte**, which is a free servers service and will provide an easy to use Node.js environment.

### 1. Create a Node.js server

Create a new Node.js server on Wispbyte . **https://wispbyte.com/**

### 2. server setup 

Go to the "FILES" page (click on the server manegmant button and then on files). upload `server.js`.
#### **PUT YOUR API KEY IN THE CODE!!!**
right click on it and make it the startup file
Now, Go to the **STARTUP** page and replace the default command with:

```bash
NODE_PACKAGES="express groq-sdk dotenv cors"; if [[ -d .git ]] && [[ 0 == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/node /home/container/server.js
```

This command automatically:

- Installs the required Node.js packages.
- Installs any dependencies listed in `package.json`.
- Starts `server.js`.
start up the wispbyte server

## 3. Connect to T-embed
1. Open the webUI
2. upload `chat.js`
3. **edit the file: replace "SERVER_URL" with your server IP.** and save

and now u can launch the `chat.js` file in your T-embed and use it freely!


