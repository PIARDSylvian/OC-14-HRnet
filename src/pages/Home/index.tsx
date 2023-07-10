import { useEffect, ChangeEvent, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import states from '../../states.json'

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  startDate: '',
  department: '',
  street: '',
  city: '',
  state: states[0].abbreviation,
  zipCode: ''
};

type employee = {
  firstName: string | null,
  lastName: string,
  dateOfBirth: string,
  startDate: string,
  department: string,
  street: string,
  city: string,
  state: string,
  zipCode: string
}

type employees = employee[]

export default function Home() {
  const [form, setForm] = useState(INITIAL_STATE);

  useEffect(() => {
    document.title = 'Home - HRnet'
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    const employees = JSON.parse(localStorage.getItem('employees')|| '[]') as employees;
    employees.push(form);
    localStorage.setItem('employees', JSON.stringify(employees));
    // // $('#confirmation').modal(); open modal here
  }

  return (
    <>
      <h1 className="title" >HRnet</h1>
      <Link to="/employees">View Current Employees</Link>
      <h2>Create Employee</h2>
      <form id="create-employee" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" onChange={handleChange}/>

        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" onChange={handleChange}/>

        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input id="dateOfBirth" type="text" onChange={handleChange}/>

        <label htmlFor="startDate">Start Date</label>
        <input id="startDate" type="text" onChange={handleChange}/>

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input id="street" type="text" onChange={handleChange}/>

          <label htmlFor="city">City</label>
          <input id="city" type="text" onChange={handleChange}/>

          <label htmlFor="state">State</label>
          <select name="state" id="state" onChange={handleChange}>
            {states.map((state, idx)=>(
              <option key={`state-${idx}`} value={state.abbreviation} >{state.name}</option>
            ))}
          </select>

          <label htmlFor="zipCode">Zip Code</label>
          <input id="zipCode" type="number" onChange={handleChange}/>
        </fieldset>

        <label htmlFor="department">Department</label>
        <select name="department" id="department" onChange={handleChange}>
          <option>Sales</option>
          <option>Marketing</option>
          <option>Engineering</option>
          <option>Human Resources</option>
          <option>Legal</option>
        </select>
        <button type="submit">Save</button>
      </form>
    </>
  )
}
