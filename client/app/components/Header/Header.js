import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
    

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/"><a class="navbar-brand" href="#">Polls</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button></Link>

       
  

      <Link to="/createPoll"> <div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" >Create Poll <span class="sr-only">(current)</span></a>
      </li>
      </ul>
  </div> </Link>

  <Link to="/HelloWorld"> <div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" >Profile <span class="sr-only">(current)</span></a>
      </li>
      </ul>
  </div> </Link>
    </nav>

    <hr />
  </header>
);

export default Header;
