import React from 'react'

function Success({message}) {
  return (
    <div>
        <div className="alter alter-success" role="alter">
            {message}
        </div>
    </div>
  )
}

export default Success;