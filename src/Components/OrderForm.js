import React from 'react';



const OrderForm = (props) => {
    const { formValues, formUpdate, formSubmit, formErrors, disabled } = props;

    const onSubmit = (e) => {
        e.preventDefault()
        formSubmit(formValues)
    }

    const onChange = (e) => {
        const { name, value, type, checked }= e.target;
        const valToUse = type === 'checkbox' ? checked : value;
        formUpdate(name, valToUse)
    }


return (
    <form id="pizza-form" onSubmit={onSubmit}>
        <label>Name:
            <input id='name-input'
            type='text'
            name='name'
            value={formValues.name}
            onChange={onChange}
            />
        </label>
        <label>Size:
            <select id='size-dropdown'
            name='size'
            value={formValues.size}
            onChange={onChange}
            >
                <option value=''>Choose your Destiny</option>
                <option value='small'>Loki</option>
                <option value='medium'>Thor</option>
                <option value='large'>ZEUS!</option>
            </select>
        </label>
        <label> 
               <input
                  type='checkbox'
                  name='ham'
                  onChange={onChange}
                  checked={formValues.ham}
                  /> ham
            </label>
            <div> 
            <label>
               <input
                  type='checkbox'
                  name='pineapple'
                  onChange={onChange}
                  checked={formValues.pineapple}
                  />
            </label> pineapple
            <label>
               <input
                  type='checkbox'
                  name='pepperoni'
                  onChange={onChange}
                  checked={formValues.pepperoni}
                  />
            </label> pepperoni
            <label>
               <input
                  type='checkbox'
                  name='sausage'
                  onChange={onChange}
                  checked={formValues.sausage}
               />
            </label> sausage
         </div>

         <label> Special Instructions
            <input id='special-text'
               type='text'
               name='special'
               onChange={onChange}
               value={formValues.special}
            />
         </label>
         
         
         <div className='errors'>
         {disabled ? <div>{formErrors.name}</div> : null}
            <div>{formErrors.size}</div>
            <div>{formErrors.pepperoni}</div>
            <div>{formErrors.ham}</div>
            <div>{formErrors.special}</div>
         </div>


         <button 
            id='order-button' 
            type='submit' 
            name='submitBtn' 
            disabled={disabled}
            > Add to Order 
         </button>
    </form>
)

}


export default OrderForm;