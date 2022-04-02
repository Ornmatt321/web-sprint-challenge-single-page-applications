import React, { useState, useEffect } from "react";
import'./App.css';
import axios from 'axios';
import { Route, Link, Switch } from 'react-router-dom';



//My Component Imports
import OrderForm from './Components/OrderForm';
import Home from './Components/Home';
//Schema Import

import * as yup from 'yup';
import schema from './Validation/formSchema'

const initialFormValues = {
  name: '',
  size: '',

  ham: false,
  pineapple: false,
  pepperoni: false,
  sausage: false,
  special: '',
}

const initialFormErrors = {
  name: '',
  size: '',
  submitBtn: '',
}

const initialFormDisabled = true;

const App = () => {
  const [ custOrder, setCustOrder ] = useState([]);
  const [ formValues, setFormValues ] = useState(initialFormValues);
  const [ formErrors, setFormErrors ] = useState(initialFormErrors);
  const [ disabled, setDisabled ] = useState(initialFormDisabled);

  const formUpdate = (inputName, inputValue) => {
    ValidityState(inputName, inputValue)
    setFormValues({ ...formValues, [inputName]: inputValue})
  }

const formSubmit = () => {
  const newCustOrder = {
    name: formValues.name.trim(),
    size: formValues.size,
    toppings: [
      'ham',
      'pineapple',
      'pepperoni',
      'sausage'].filter(pieTops => !!formValues[pieTops]),

      
    special: formValues.special.trim(),
  }
  postNewCustOrder(newCustOrder)
}
const postNewCustOrder = (newCustOrder) => {
  axios.post(`https://reqres.in/api/orders`, newCustOrder)
  .then(response => {
    console.log(response.data)
    setCustOrder(custOrder.concat(response.data))
  })
  .catch(error => {
    console.error(error)
  })
  .finally(() => {
    setFormValues(initialFormValues)
  })
}

const validate =(name, value) => {
  yup.reach(schema, name)
  .validate(value)
  .then(() => {
    setFormErrors({ ...formErrors, [name]: ''})
  })
  .catch(error => setFormErrors({ ...formErrors, [name]: error.errors[0]})
  )
}

useEffect(() => {
  schema.isValid(formValues)
  .then(valid => {
    setDisabled(!valid)
  })
  .finally(() => ('cleaning'))
}, [formValues])

  return (
    <div className='App'>
      <h1>Cray-Toes' Greek Inspired Pizza</h1>
      <p>So good the Alphabet God's tried to steal it!</p>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/pizza'>
        <OrderForm
          formValues={formValues}
          formSubmit={formSubmit}
          formUpdate={formUpdate}
          formErrors={formErrors}
          disabled={disabled}
          />
      </Route>
    </div>
  );
};
export default App;