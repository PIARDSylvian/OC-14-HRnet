import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactDataTable from 'react-data-table-oc'
import { useSelector, useDispatch } from 'react-redux'
import { getEmployees } from '../../redux/employees'
import { selectEmployees } from '../../redux/selector'

export default function Employees() {
    const employees = useSelector(selectEmployees)
    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'Employees - HRnet'
        if (employees.status === 'void') dispatch(getEmployees() as any)
    }, [])
    return (
        <>
            <h1 className="title">Current Employees</h1>
            <ReactDataTable
                data={employees.employees}
                option={{
                    head: [
                        'First Name',
                        'Last Name',
                        'Start Date',
                        'Departement',
                        'Date of Birth',
                        'Street',
                        'City',
                        'State',
                        'Zip Code',
                    ],
                }}
            />
            <Link to="/">Home</Link>
        </>
    )
}
