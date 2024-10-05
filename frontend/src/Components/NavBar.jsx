import React from 'react'

export default function NavBar() {
  return (
    <header>
      <div className="navbar navbar-dark navbar-expand-lg bg-primary">
        <div className="container">
          <a className="navbar-brand" href="#">FlipKart</a>
          <button type="button" data-bs-toggle="collapse" data-bs-target="#nav-menu" className="navbar-toggler"><span
            className="navbar-toggler-icon"></span></button>
          <div className="collapse navbar-collapse" id="nav-menu">
            <input className="form-control mx-3" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-warning me-2 my-2 my-sm-0" type="submit">Search</button>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link active" href="#">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#">About</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}
