'use client'
import React, { useState } from 'react';
import { callApi } from './lib/action';

export default function Home() {
  const [imageData, setImageData] = useState(null);
  const [title, setTitle] = useState('');

  const handleImageChange = (event) => {
    console.log('handleImageChange called')
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result.split(',')[1];
        setImageData(base64Image);
        
      };
      reader.readAsDataURL(file);
    
    }
    
  };
 

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (imageData) {
      try {
        console.log(imageData)
        // Make POST request to API route with image data
        const formData = new FormData();
        formData.append('imageData', imageData); 
        const response = await fetch('/api/altTagGenerator', {
          method: 'POST',
          body: JSON.stringify({title}),
          headers: {
            'Content-Type': 'application/json',
          },
          // body: formData,
          
        });
        if (response.ok) {
          const data = await response.json();
          // setAltTag(data.altTag);
          console.log(data)
        } else {
          console.error('Failed to generate alt tag:', response.statusText);
        }
      } catch (error) {
        console.error('Error generating alt tag:', error);
      }
    } else {
      console.error('No image data available.');
    }
    if (title){
      console.log(title);
    }
  };

  const handleTitleChange = (event) =>{
    console.log('handleTitleChange triggered')
    setTitle(event.target.value)
  }

  return (
    <main className="">
      <h1 className="text-3xl text-center font-bold p-5">Alt Tag Generator</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mx-auto max-w-xl p-5">
        <input
          type="file"
          id="image"
          accept="image/*"
          name="image"
          onChange={handleImageChange}
        />
        <input className='text-gray-800 p-2 rounded-md'
          type="text"
          id="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
      
        <button type="submit" className="bg-indigo-600 text-white rounded-md p-2 hover:bg-indigo-700 transition-shadow">
          Generate Alt Tag
        </button>
      </form>
    </main>
  );
}
