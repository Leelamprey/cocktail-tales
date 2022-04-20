import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <section className="error-page section">
      <div className="error-container">
        <h1>Are you already drunk? You went to the wrong place!</h1>
        <Link to="/" className='btn btn-primary'>
          back home
        </Link>
      </div>
    </section>
  )
}

export default Error