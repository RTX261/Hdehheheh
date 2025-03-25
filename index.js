
import express from 'express';
import fetch from 'node-fetch';
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('search');
});

app.post('/search', async (req, res) => {
  const mapName = req.body.mapName;
  try {
    const response = await fetch(`https://scriptblox.com/api/script/search?q=${encodeURIComponent(mapName)}&mode=free`);
    const data = await response.json();
    res.render('search', { scripts: data.result.scripts, mapName });
  } catch (error) {
    res.render('search', { error: 'Error fetching scripts', mapName });
  }
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});
