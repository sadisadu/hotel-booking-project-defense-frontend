import React from 'react'

function Error({message}) {
  return (
    <div>
        <div className="alter alter-success" style={{color:"red"}} role="alter">
            {message}
        </div>

        </div>
   
  )
}

export default Error