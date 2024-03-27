import { NextApiRequest, NextApiResponse } from 'next';
import Anthropic from "@anthropic-ai/sdk";
import Axios from 'axios';

// const anthropic = new Anthropic({
//   apiKey: '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',
// });

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const {title} = await  req.body;
          
            console.log('Received text on server:', title); // Check if text is present
          
            // if (!title) {
            //   throw new Error('Missing text data in request body.');
            // }
            
            // ... (rest of your server-side logic)
          res.status(200).json({ response: title });
          }catch (error) {
            console.error(error)
          }
      try {
        
        const apiKey = process.env.MY_API_KEY;
  
        if (!apiKey) {
          throw new Error('Anthropic API key is not provided.');
          console.log('no api key');
        }
        console.log(`api key called: ${apiKey}`)
  
        // const { imageData } = req.body;
        // console.log('imageData:', imageData)
        
        
        // res.status(200).json({ text });
        
        // const imageMediaType = req.body.imageMediaType;
        
  
        const requestBody = {
          model: "claude-3-opus-20240229",
          max_tokens: 1024,
          temperature: 0.4,
          messages: [
            {
              "role": "user",
              "content": [
                
                {
                  "type": "image",
                  "source": {
                    "type": "base64",
                    "media_type": "image/webp",
                    "data": `"${imageData}"`,
                  }
                },
                {
                    "type": "text",
                    "text": "Write a short and SEO optimized alt tag for this image. Don't write anything else other than the alt tag."
                }

              ]
            }
          ]
        };
  
        const requestOptions = {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
          },
        };
  
        const response = await Axios.post('https://api.anthropic.com/v1/messages', requestBody, requestOptions);
  
        // const altTag = response.data.messages[0].content[0].text;
        console.log(response)
        res.status(200).json({ response });
      } catch (error) {
        console.error('Error generating alt tag:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }