import React from 'react';

const InputSearch = React.forwardRef((props, ref) => {
  return (
      <>
        {/*<!-- Component: Plain basic base sized search input  --> */}
        <div className="relative my-6">
          <input
            id="input-search"
            type="search"
            name="input-search"
            placeholder="Search here"
            aria-label="Search content"
            className="peer relative h-10 w-full border-b-4 px-4 pr-12 border-bg-peach  bg-blue text-sm outline-none transition-all focus-visible:outline-none disabled:cursor-not-allowed"
            ref={ref}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-4 top-2.5 h-5 w-5 cursor-pointer peer-disabled:cursor-not-allowed"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
            aria-label="Search icon"
            role="graphics-symbol"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        {/*<!-- End Plain search input  --> */}
      </>  
);
});

export default InputSearch;