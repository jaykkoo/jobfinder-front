import React from "react"

export default function Card() {
  return (
    <>
      {/*<!-- Component: Basic card --> */}
      <div className="overflow-hidden rounded-lg m-4 bg-beige">
        <div className="p-6">
          <h3 className="mb-4 text-xl font-medium w-full">
            Something to remember
          </h3>
          <p>
            All components can be copied and pasted and easily implemented in
            your tailwind css projects. You can choose which language you want
            to copy the desired component and just hover and click on the
            component you need and paste it on your project.
          </p>
        </div>
      </div>
      {/*<!-- End Basic card --> */}
    </>
  )
}
