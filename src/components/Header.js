import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div>
        <ul>
        	<li><Link to='/'>Home</Link></li>
        	<li><Link to='/Tutorials'>Tutorials</Link></li>
        	<li><Link to='/Advanced'>Advanced guides</Link></li>
        	<li><Link to='/References'>References</Link></li>
        </ul>
      </div>
    );
  }
}

export default Header;
