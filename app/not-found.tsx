import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="relative py-24 md:py-40 bg-white">
      <div className="relative z-10 container px-4 mx-auto">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-16 md:mb-0">
            <div className="md:max-w-xl md:mx-auto text-center md:text-left">
              <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-blue-500 bg-blue-100 font-medium rounded-full shadow-sm">
                Error 404
              </span>
              <h2 className="mb-4 text-4xl md:text-5xl leading-tight font-bold tracking-tighter">
                Oh no! Error 404
              </h2>
              <p className="mb-6 text-lg md:text-xl text-coolGray-500">
                Something went wrong, so this page is broken.
              </p>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-auto py-1 lg:py-0 lg:mr-6">
                  <Link
                    href="/"
                    className="inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-blue-50 font-medium text-center bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-blue-500 rounded-md shadow-sm">
                    Go back to Homepage
                  </Link>
                </div>
                <div className="w-full lg:w-auto py-1 lg:py-0">
                  <Link
                    className="inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-coolGray-800 font-medium text-center bg-white hover:bg-coolGray-100 focus:ring-2 focus:ring-coolGray-200 focus:ring-opacity-50 border border-coolGray-200 rounded-md shadow-sm"
                    href="#">
                    Try Again
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4">
            <img
              className="mx-auto"
              src="https://shuffle.dev/flex-ui-assets/images/http-codes/dog-error.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <img
        className="absolute top-0 left-0 w-28 md:w-auto"
        src="flex-ui-assets/elements/wave2-yellow.svg"
        alt=""
      />
      <img
        className="absolute right-6 top-6 w-28 md:w-auto"
        src="flex-ui-assets/elements/dots3-green.svg"
        alt=""
      />
      <img
        className="absolute right-0 bottom-0 w-28 md:w-auto"
        src="flex-ui-assets/elements/wave3-red.svg"
        alt=""
      />
      <img
        className="absolute left-6 bottom-6 w-28 md:w-auto"
        src="flex-ui-assets/elements/dots3-violet.svg"
        alt=""
      />
    </section>
  );
}
