import React from "react";

const Navbar = ({ nama }) => {
  return (
    <nav class="navbar bg-light">
      <div class="container">
        <a class="navbar-brand">{nama}</a>
        <div class="d-flex">
          <button class="btn btn-outline-success" type="submit">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
