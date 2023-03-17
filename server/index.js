import express from "express"
import cors from 'cors'
import bodyParser from 'body-parser'
import { Configuration, OpenAIApi } from "openai"
import env from 'dotenv'
import axios from 'axios';

// set up Server
const app = express();
env.config()
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
    organization: "org-g25fxNrU7FrwBMy9CHidAw04",
    apiKey: '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'
});

const openai = new OpenAIApi(configuration);


app.get('/', async (req, res) => {
    console.log("connected")
    //res.send("Hello World");
})


// endpoint for ChatGPT
app.post('/chat', async (req, res) => {
    try {
      const { prompt, ...options } = req.body;
      const response = await openai.createCompletion({ prompt, ...options });
      res.json(response.data.choices[0].text);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
});

app.post('/api/completion', async (req, res) => {
    console.log("api/completion connected")
    const { prompt, ...options } = req.body;
    console.log(prompt)
    try {
      const response = await openai.createCompletion({
        ...options,
        prompt,
      });
  
      res.json({ text: response.data.choices[0].text });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
});

const port = 5173;
app.listen(port, () => {
    console.log('Example app port: ' + port);
})
