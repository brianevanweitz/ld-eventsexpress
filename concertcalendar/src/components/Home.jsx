import React from 'react';
import Welcome from './Welcome';
import Form from './Form';
import { Link, Route } from 'react-router-dom';

const Home = (props) => {
  return (
    <div id='home' class='heap test' data-heap-redact-text='true'>
      <header id="home-header">
        <h1>Events Express</h1>
        <Link to="/" onClick={props.resetForm}>Home</Link>
        <Link to="/allevents">Saved Events</Link>
        <Welcome />
        <Form
          handleSubmit={props.handleSubmit}
          handleChange={props.handleChange}
          formData={props.formData} />
      </header>
      <label for="dropdown">Select an Option</label>
      <select name="dropdown">
        <option value="number1" id="number1">#1</option>
        <option value="number2" id="number2">#2</option>
        <option value="number3" id="number3">#3</option>
      </select>
      <footer>
        <p>©<span id='promo' class='website link' title='Visit my Website' data-heap-redact-text='true' data-heap-redact-attributes='href'><a href='https://brianevanweitz.com' target='_blank'>Brian Weitz</a></span>, 2019 (Product not actually copyrighted)</p>
      </footer>
    </div>
  )
}

export default Home;