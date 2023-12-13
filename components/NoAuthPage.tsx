import React from "react";
import SignIn from "./auth/SignIn";

interface NoAuthPageProps {}

export const NoAuthPage: React.FC<NoAuthPageProps> = async () => {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="bg-tarnsparent">
        <nav className="flex justify-between p-6 px-4">
          <div className="flex justify-between items-center w-full">
            <div className="w-1/2 xl:w-1/3">
              <a
                className="block max-w-max"
                href="#">
                <img
                  className="h-12"
                  src="logo.png"
                  alt=""
                />
              </a>
            </div>
            <div className="w-1/2 xl:w-1/3">
              <ul className="hidden xl:flex xl:justify-center">
                <li className="mr-12">
                  <a
                    className="text-coolGray-500 hover:text-coolGray-900 font-medium"
                    href="#">
                    Product
                  </a>
                </li>
                <li className="mr-12">
                  <a
                    className="text-coolGray-500 hover:text-coolGray-900 font-medium"
                    href="#">
                    Features
                  </a>
                </li>
                <li className="mr-12">
                  <a
                    className="text-coolGray-500 hover:text-coolGray-900 font-medium"
                    href="#">
                    Resources
                  </a>
                </li>
                <li>
                  <a
                    className="text-coolGray-500 hover:text-coolGray-900 font-medium"
                    href="#">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-1/2 xl:w-1/3">
              <div className="flex items-center justify-end">
                <SignIn />
              </div>
            </div>
          </div>
        </nav>
        <div className="navbar-menu hidden fixed top-0 left-0 z-50 w-full h-full bg-coolGray-900 bg-opacity-50">
          <div className="fixed top-0 left-0 bottom-0 w-4/6 max-w-xs bg-white">
            <nav className="relative p-6 h-full overflow-y-auto">
              <div className="flex flex-col justify-between h-full">
                <a
                  className="inline-block"
                  href="#">
                  <img
                    className="h-8"
                    src="flex-ui-assets/logos/flex-ui-blue-light.svg"
                    alt=""
                  />
                </a>
                <ul className="py-6">
                  <li>
                    <a
                      className="block py-3 px-4 text-coolGray-500 hover:text-coolGray-900 font-medium hover:bg-coolGray-50 rounded-md"
                      href="#">
                      Product
                    </a>
                  </li>
                  <li>
                    <a
                      className="block py-3 px-4 text-coolGray-500 hover:text-coolGray-900 font-medium hover:bg-coolGray-50 rounded-md"
                      href="#">
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      className="block py-3 px-4 text-coolGray-500 hover:text-coolGray-900 font-medium hover:bg-coolGray-50 rounded-md"
                      href="#">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      className="block py-3 px-4 text-coolGray-500 hover:text-coolGray-900 font-medium hover:bg-coolGray-50 rounded-md"
                      href="#">
                      Resources
                    </a>
                  </li>
                </ul>
                <div className="flex flex-wrap">
                  <div className="w-full mb-2">
                    <a
                      className="inline-block py-2 px-4 w-full text-sm leading-5 text-coolGray-500 hover:text-coolGray-900 bg-transparent font-medium text-center rounded-md"
                      href="#">
                      Log In
                    </a>
                  </div>
                  <div className="w-full">
                    <a
                      className="inline-block py-2 px-4 w-full text-sm leading-5 text-white bg-blue-500 hover:bg-blue-600 font-medium text-center focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                      href="#">
                      Sign Up
                    </a>
                  </div>
                </div>
              </div>
            </nav>
            <a
              className="navbar-close absolute top-5 p-4 right-3"
              href="#">
              Button 2
            </a>
          </div>
        </div>
      </div>
      <div className="py-20 md:py-28">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap xl:items-center -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-16 md:mb-0">
              <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-white bg-blue-500 uppercase rounded-9xl">
                Header
              </span>
              <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl leading-tight font-bold tracking-tight">
                A small business is only as good as its tools.
              </h1>
              <p className="mb-8 text-lg md:text-xl text-coolGray-500 font-medium">
                We’re different. Flex is the only saas business platform that
                lets you run your business on one platform, seamlessly across
                all digital channels.
              </p>
              <div className="flex flex-wrap">
                <div className="w-full md:w-auto py-1 md:py-0 md:mr-4">
                  <a
                    className="inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-blue-50 font-medium text-center bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-blue-500 rounded-md shadow-sm"
                    href="#">
                    Request a Demo
                  </a>
                </div>
                <div className="w-full md:w-auto py-1 md:py-0">
                  <a
                    className="inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-coolGray-800 font-medium text-center bg-white hover:bg-coolGray-100 focus:ring-2 focus:ring-coolGray-200 focus:ring-opacity-50 border border-coolGray-200 rounded-md shadow-sm"
                    href="#">
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4">
              <div className="relative mx-auto md:mr-0 max-w-max">
                <img
                  className="absolute z-10 -left-14 -top-12 w-28 md:w-auto"
                  src="flex-ui-assets/elements/circle3-violet.svg"
                  alt=""
                />
                <img
                  className="absolute z-10 -right-7 -bottom-8 w-28 md:w-auto"
                  src="flex-ui-assets/elements/dots3-red.svg"
                  alt=""
                />
                <img
                  className="relative rounded-7xl"
                  src="https://shuffle.dev/flex-ui-assets/images/headers/header.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
