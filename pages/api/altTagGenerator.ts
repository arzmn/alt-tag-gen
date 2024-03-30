import { NextApiRequest, NextApiResponse } from 'next';
import Anthropic from "@anthropic-ai/sdk";
import { error } from 'console';


const anthropic = new Anthropic({
  apiKey: process.env["MY_API_KEY"]
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }
 
    const { imageData } = req.body;
    const {imageType} = req.body;
    
    const msg = await anthropic.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 1000,
        temperature: 0.4,
        messages: [
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": "Write a short  and seo optimized alt tag for this image. Don't write anything else other than the alt tag."
              },
              {
                "type": "image",
                "source": {
                  "type": "base64",
                  "media_type": imageType,
                  "data": imageData
                }
              }
            ]
          }
        ]
      });
      console.log(msg);
      res.status(200).json(msg);
     
     
    
}