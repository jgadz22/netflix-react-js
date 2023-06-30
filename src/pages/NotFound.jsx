import React from 'react'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 Not Found
      </h1>
      <p className="text-gray-600 mb-8">
        The page you are looking for does not exist.
      </p>
      <img
        className="w-64 animate-bounce"
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        alt="404 Not Found"
      />
    </div>
  )
}

export default NotFound