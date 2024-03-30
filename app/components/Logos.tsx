export default function Logos() {
    return (
        <div className="bg-white sm:py-16">
            <div className="mx-auto max-w-7xl px-1 lg:px-8">
                <h2 className="text-center text-3xl font-bold leading-8 text-gray-900">
                    Use alt texts for products on
                </h2>
                <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    <img
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg"
                        alt="Transistor"
                        width={158}
                        height={48}
                    />
                    <img
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src="https://upload.wikimedia.org/wikipedia/commons/2/2a/WooCommerce_logo.svg"
                        alt="Reform"
                        width={158}
                        height={48}
                    />
                    <img
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                        alt="Tuple"
                        width={158}
                        height={48}
                    />
                    <img
                        className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                        src="https://www.svgrepo.com/show/354567/wix.svg"
                        alt="SavvyCal"
                        width={158}
                        height={48}
                    />
                    <img
                        className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                        src="https://www.svgrepo.com/show/342245/squarespace.svg"
                        alt="Statamic"
                        width={158}
                        height={48}
                    />
                </div>
            </div>
        </div>
    )
}
