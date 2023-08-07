import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactDataTable from 'react-data-table-oc'

type dataType = {
  [key :string ] : string
}

export default function Employees() {
  useEffect(() => {
    document.title = 'Employees - HRnet'
  }, [])
  return (
    <>
      <h1 className="title" >Current Employees</h1>
      <ReactDataTable data={JSON.parse(localStorage.getItem('employees')|| '[]') as dataType[]} option={{head:['First Name', 'Last Name', 'Start Date', 'Departement', 'Date of Birth', 'Street', 'City', 'State', 'Zip Code']}}/>
      <Link to="/">Home</Link>
    </>
  )
}
