// Bruce OS - Gemini/Groq Chat (chat.js)
var wifi = require("wifi");
var display = require("display");
var keyboard = require("keyboard");

//change to your server IP
var SERVER_URL = "http://YOUR_SERVER_IP:13959/chat";

function printWrappedText(text, maxCharsPerLine) {
  var words = text.split(" ");
  var currentLine = "";

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    if ((currentLine + word).length > maxCharsPerLine) {
      display.println(currentLine);
      currentLine = word + " ";
    } else {
      currentLine += word + " ";
    }
  }
  if (currentLine.length > 0) {
    display.println(currentLine);
  }
}

function showResponse(text) {
  var black = display.color(0, 0, 0);
  var white = display.color(255, 255, 255);
  var cyan = display.color(0, 255, 255);

  display.fill(black);
  display.setTextSize(1);

   
  display.setTextColor(cyan);
  display.println("--- AI Response ---");
  display.println("");

  display.setTextColor(white);
  printWrappedText(text, 24);

  display.println("");
  display.setTextColor(cyan);
  display.println("[Press OK to continue]");
}

function startChat() {
  while (true) {

    var userInput = keyboard.keyboard("", 100, "Prompt AI:");

    if (!userInput || userInput.length === 0) {
      break;
    }

    display.fill(display.color(0, 0, 0));
    display.setTextColor(display.color(255, 255, 0));
    display.println("Thinking...");

    var response = wifi.httpFetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userInput })
    });

    if (response && response.ok) {
      try {
        var data = JSON.parse(response.body);
        if (data && data.reply) {
          showResponse(data.reply);
        } else {
          showResponse("Empty response.");
        }
      } catch (e) {
        showResponse("JSON Error.");
      }
    } else {
      var status = response ? response.status : "Error";
      showResponse("Server Error: " + to_string(status));
    }

    while (!keyboard.getSelPress() && !keyboard.getAnyPress()) {
      delay(100);
    }
  }
}

startChat();
