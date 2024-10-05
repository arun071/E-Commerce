import React from 'react'
import { ScaleLoader } from 'react-spinners'

export default function Loading(loading) {
  return (
 // Show the loader while loading is true
   <div className="loader-container">
       {/* You can use any CSS loader or image loader here */}
       <ScaleLoader size={50} color={"#123abc"} loading={loading} />
       <p>please wait data is fetching...</p>

   </div>
  )
}