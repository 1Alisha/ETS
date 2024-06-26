import React from 'react'
import { useForm } from 'react-hook-form';
import List from './List';
import {default as api} from '../store/apiSlice';

export default function Form() {
    //useForm(): This function is likely from a library such as React Hook Form, which is used for managing form state in React applications.
    //useAddTransactionMutation() is a custom hook generated by Redux Toolkit Query's createApi function. It returns a mutation function (addTransaction) that can be used to send data to a server and update the application state based on the result.
    const {register, handleSubmit, resetField} = useForm();
    const [addTransaction] = api.useAddTransactionMutation();

    // addTransaction : asynchronous Redux Toolkit action that dispatches an API call to add a transaction.
    const onSubmit = async (data) => {
        if(!data) return {};
        await addTransaction(data).unwrap();
        resetField('name');
        resetField('amount')
    }
    //unwrap ensures that the asynchronous action completes and provides access to the payload data returned by the action, allowing you to perform further operations based on the result


  return (
    <div className="form max-w-sm mx-auto w-96">
        
        <h1 className='font-bold pb-4 text-xl'>Transaction</h1>

        <form id='form' onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
                <div className="input-group">
                    <input type="text" {...register('name')} placeholder='Salary, House Rend, SIP' className='form-input' />
                </div>
                <select className='form-input' {...register('type')}>
                    <option value="Investment" defaultValue>Investment</option>
                    <option value="Expense">Expense</option>
                    <option value="Savings">Savings</option>
                    
                </select>
                <div className="input-group">
                    <input type="text" {...register('amount')} placeholder='Amount' className='form-input' />
                </div>
                <div className="submit-btn">
                    <button className='border py-2 text-white bg-indigo-500 w-full'>Make Transaction</button>
                </div>
            </div>    
        </form>

        <List></List>
    </div>
  )
}