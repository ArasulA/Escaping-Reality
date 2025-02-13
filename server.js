const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/savePlain', (req, res) => {
    var before = '<html><head><script src="https://aframe.io/releases/1.6.0/aframe.min.js"></script></head><body>';
    var after = '</body></html>';
    for (const [filepath, content] of Object.entries(req.body)) {
        const fullPath = path.join(__dirname, 'public', filepath);
        fs.writeFileSync(fullPath, before + content + after);
    }
    res.sendStatus(200);
});

// Endpoint to save the scene
app.post('/saveScene', (req, res) => {
  const sceneData = req.body.scene;
  const filePath = path.join(__dirname, 'savedScene.html');

  fs.writeFile(filePath, sceneData, (err) => {
    if (err) {
      console.error('Error saving scene:', err);
      return res.status(500).send('Error saving scene');
    }
    res.send('Scene saved successfully');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});