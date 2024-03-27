import fs from 'fs';

export const callApi = async (formData) => {
    "use server"
    console.log(" anthropic api called")
    const imageFile = formData.get("image")
    console.log(imageFile)
    
    if (!imageFile) {
        console.error("No image data found.");
        return;
    }
    // const reader = new FileReader();
    // reader.onloadend = () => {
    //     // Convert the loaded file content to base64
    //     const base64Image = reader.result.split(',')[1];
    //     console.log("Base64 encoded image:", base64Image);
    // }
    // reader.readAsDataURL(imageFile);
    processImageFile(imageFile);
}
export const processImageFile = (imageFile) => {
    'use client'
    // Create a new FileReader instance
    const reader = new FileReader();
    reader.onloadend = () => {
        // Convert the loaded file content to base64
        const base64Image = reader.result.split(',')[1];

        // Now you have the image data in base64 format
        console.log("Base64 encoded image:", base64Image);

        // Pass the base64 encoded image to your API or further processing
        // Example:
        // const requestBody = {
        //     type: 'image',
        //     source: {
        //         type: 'base64',
        //         media_type: 'image/jpeg',
        //         data: base64Image,
        //     },
        // };
        // Your API call here
    };

    // Read the image file content
    reader.readAsDataURL(imageFile);
}