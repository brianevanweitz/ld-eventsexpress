import React from 'react';

const Form = (props) => {
  return (
    <form id='form' onSubmit={props.handleSubmit}>
      <input className='home-form' type='text' id='city' name='city' placeholder="Enter city" value={props.formData.city} onChange={props.handleChange} />
      <input className='go' type='submit' value='Go to calendar' />
    </form>
  )
}

export default Form;