async function generateCaptions() {
    const input = document.getElementById("topicInput").value;
    const output = document.getElementById("output");
  
    if (!input.trim()) {
      output.innerHTML = "⚠️ Please enter a topic.";
      return;
    }
  
    output.innerHTML = "Generating captions... ⏳";
  
    const prompt = `Generate 3 short and engaging Instagram captions for: "${input}"`;
  
    try {
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBQoRoQWJxY9RM_m_oaEkVG5nw2wPext68", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      });
  
      const data = await response.json();
  
      if (data.candidates && data.candidates.length > 0) {
        const result = data.candidates[0].content.parts[0].text;
        output.innerHTML = result.replace(/\n/g, "<br>");
      } else {
        output.innerHTML = "⚠️ No response from Gemini. Try again.";
        console.log(data);
      }
  
    } catch (error) {
      output.innerHTML = "❌ Error connecting to Gemini API.";
      console.error(error);
    }
  }
  