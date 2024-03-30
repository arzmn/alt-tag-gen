'use client'
import React, { useState } from 'react';
import { IoArrowUndoOutline, IoCopyOutline, IoSparklesSharp } from "react-icons/io5";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog } from '@headlessui/react'
import Features from './components/Features';
import Logos from './components/Logos';
import Header from './components/Header';
import Footer from './components/Footer';


const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

interface ResponseData {
  id: string;
  type: string;
  role: string;
  content: { type: string; text: string }[];
  model: string;
  stop_reason: string;
  stop_sequence: any;
  usage: { input_tokens: number; output_tokens: number };
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [imageData, setImageData] = useState(null);
  const [finalResponse, setFinalResponse] = useState<ResponseData | null>(null)
  const [previewURL, setPreviewURL] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [imageType, setImageType] = useState(null)
  const [errorMessage, setErrorMessage] = useState<string | null>('')

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleImageChange called')
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result?.toString().split(',')[1];
        setImageData(base64Image || null);
        setPreviewURL(reader.result?.toString() || null)
        const imgtype = file.type

        setImageType(imgtype || null)
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = () => {
    setImageData(null);
    setPreviewURL(null)
    setErrorMessage(null)
    setFinalResponse(null)
  }

  const handleSubmit = async () => {
    if (imageData) {
      setLoading(true)
      console.log(imageData);
      console.log(imageType);
      try {
        const response = await fetch("/api/altTagGenerator", {
          cache: 'no-store',
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageData, imageType }),
        })
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error.message || "Unknown error occurred");

        }
        const data = await response.json();
        setFinalResponse(data);
        console.log(data.content[0].text)
      } catch (error: Response) {
        console.error("Error generating alt tag:", error);
        setErrorMessage('Invalid File format')
      }
      setLoading(false)
    } else {
      alert("Please choose image")
    }
  };

  const handleCopyText = () => {
    if (finalResponse?.content[0].text) {
      navigator.clipboard.writeText(finalResponse?.content[0].text);
      // Optionally provide user feedback here
    }
  };


  return (
    <>
      {/* ===========================================================HEADER AREA IS USELESS ========================================================= */}
      
      
      
      <div className="bg-white">
       
        <header className="absolute inset-x-0 top-0 z-50">
          <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-11 w-auto"
                  src="files/aialttaglogo.png"
                  alt=""
                />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </nav>
          <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-50" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="files/aialttaglogo.png"
                    alt=""
                  />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </header>

        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl py-5 sm:py-10">
            {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Releasing our API soon.{' '}
                <a href="#" className="font-semibold text-indigo-600">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div> */}
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                AI Alt Tag Generator
              </h1>
              <p className="mt-5 text-lg leading-8 text-gray-600">
                No need to describe image manaully! Use ai to write alt tag, optimized for Google and other search engines.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Free Trial
                </a>
                {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a> */}
              </div>

            </div>
          </div>
          <main>
            <div className='flex flex-col max-w-xl mx-auto gap-5 p-5'>
              {
                previewURL ? (
                  <div>
                    <img
                      src={previewURL}
                      alt='uploaded image'
                      className='w-[50%] h-[50%] shadow-sm mx-auto border-2 rounded-sm border-gray-700 border-dashed'
                    />
                    <div className='flex justify-end'>
                      <button
                        onClick={handleClearImage}
                        className="bg-gray-600 text-white rounded-md p-1 hover:bg-gray-700 transition-shadow mt-2 flex items-center gap-2"
                      >Try another image <IoArrowUndoOutline /></button></div>
                  </div>
                ) : (<label
                  className=" text-gray-600 text-base rounded w-80 h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-700 border-dashed mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 mb-2 fill-black" viewBox="0 0 32 32">
                    <path
                      d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                      data-original="#ffffff" />
                    <path
                      d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                      data-original="#ffffff" />
                  </svg>
                  Upload file
                  <input type="file"
                    id="image"
                    accept="image/*"
                    name="image"
                    onChange={handleImageChange}
                    className='hidden cursor:pointer' />
                  <p className="text-xs text-gray-400 mt-2">PNG, JPEG, WEBP, and GIF are Allowed.</p>
                </label>)
              }

              <button type="submit"
                onClick={handleSubmit}
                className="bg-indigo-600 text-white rounded-md p-2 hover:bg-indigo-700 transition-shadow"
                disabled={loading}
              >
                {loading ? (
                  <div className="animate-bounce">Generating...</div>
                ) : (<div className='flex items-center justify-center gap-2'> Generate Alt Tag <IoSparklesSharp /></div>)
                }
              </button>
              {loading && <div role="status" className="max-w-sm animate-pulse"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div> </div>

              }
              {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Error: </strong>
                  <span className="block sm:inline">{errorMessage}</span>
                </div>
              )}

              {finalResponse?.content[0].text &&

                <div className='bg-gray-700 rounded-lg p-5 flex'>
                  <p className='text-white'>
                  {finalResponse?.content[0].text}
                  <button
                    className="ml-2 text-gray-400 hover:text-white"
                    onClick={handleCopyText}
                    title="Copy text"
                  >
                    <IoCopyOutline className="inline-block w-5 h-5" />
                  </button>
                </p>
                </div>

              }

              {/* ====================================================================JUST STYLE AREA--- NO NEED TO TOUCH ==================================================================== */}


            </div>
            <Features/>
            <Logos/>
          </main>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>
      </div>
      
    </>
  );
}

