import { useEffect, ChangeEvent, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import states from '../../states.json'
import Select from 'react-select'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

type employee = {
  firstName: string,
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

const departementOptions = [
  {
    value: "Sales",
    label: "Sales"
  },
  {
    value: "Marketing",
    label: "Marketing"
  },
  {
    value: "Engineering",
    label: "Engineering"
  },
  {
    value: "Human Resources",
    label: "Human Resources"
  },
  {
    value: "Legal",
    label: "Legal"
  }
];

const stateOption = states.map((state) => {
  return {value: state.abbreviation, label: state.name}
})

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  startDate: '',
  department: departementOptions[0].value,
  street: '',
  city: '',
  state: states[0].abbreviation,
  zipCode: ''
};

export default function Home() {
  const [form, setForm] = useState(INITIAL_STATE);

  useEffect(() => {
    document.title = 'Home - HRnet'
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement >) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const handleSelctChange = (event:object) => {
    setForm({
      ...form,
      [event.id]: event.value,
    });
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    const employees = JSON.parse(localStorage.getItem('employees')|| '[]') as employees;
    employees.push(form);
    localStorage.setItem('employees', JSON.stringify(employees));
    // // $('#confirmation').modal(); open modal here
    console.log(localStorage.getItem('employees'))
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
        <DatePicker selected={form.dateOfBirth} onChange={(date : Date) => handleSelctChange({value : date, id:'dateOfBirth' })}/>

        <label htmlFor="startDate">Start Date</label>
        <DatePicker  selected={form.startDate} onChange={(date : Date) => handleSelctChange({value : date, id:'startDate' })}/>

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input id="street" type="text" onChange={handleChange}/>

          <label htmlFor="city">City</label>
          <input id="city" type="text" onChange={handleChange}/>

          <label htmlFor="state">State</label>
          <Select
            onChange={(e) => handleSelctChange({...e, id:'state' })}
            defaultValue={stateOption[0]}
            options={stateOption}
            inputId="state"
            isSearchable={false}
          />

          <label htmlFor="zipCode">Zip Code</label>
          <input id="zipCode" type="number" onChange={handleChange}/>
        </fieldset>

        <label htmlFor="department">Department</label>
        <Select
          onChange={(e) => handleSelctChange({...e, id:'department' })}
          defaultValue={departementOptions[0]}
          options={departementOptions}
          inputId="department"
          isSearchable={false}
        />
        <button type="submit">Save</button>
      </form>
    </>
  )
}
