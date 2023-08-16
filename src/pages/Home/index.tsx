import { useEffect, ChangeEvent, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import states from '../../states.json'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import Modal from 'react-modal'
import 'react-datepicker/dist/react-datepicker.css'
import { useSelector, useDispatch } from 'react-redux'
import { addEmployee } from '../../redux/employees'
import { selectEmployees } from '../../redux/selector'
import { format } from 'date-fns'

import './index.scss'

type Employee = {
    firstName: string
    lastName: string
    dateOfBirth: null | Date
    startDate: null | Date
    department: string
    street: string
    city: string
    state: string
    zipCode: string
}

const departementOptions = [
    {
        value: 'Sales',
        label: 'Sales',
    },
    {
        value: 'Marketing',
        label: 'Marketing',
    },
    {
        value: 'Engineering',
        label: 'Engineering',
    },
    {
        value: 'Human Resources',
        label: 'Human Resources',
    },
    {
        value: 'Legal',
        label: 'Legal',
    },
]

const stateOption = states.map((state) => {
    return { value: state.abbreviation, label: state.name }
})

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    startDate: null,
    department: departementOptions[0].value,
    street: '',
    city: '',
    state: states[0].abbreviation,
    zipCode: '',
}

export default function Home() {
    const [form, setForm] = useState<Employee>(INITIAL_STATE)
    const [modalIsOpen, setIsOpen] = useState(false)
    const employees = useSelector(selectEmployees)
    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'Home - HRnet'
    }, [])

    Modal.setAppElement('#root')

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        })
    }

    type EventType = {
        id: string
        value: string | Date
    }

    const handleSelctChange = (event: EventType) => {
        setForm({
            ...form,
            [event.id]: event.value,
        })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const data: any = { ...form }

        data.dateOfBirth =
            data.dateOfBirth != null
                ? format(data.dateOfBirth as Date, 'dd/MM/yyyy')
                : null
        data.startDate =
            data.dateOfBirth != null
                ? format(data.startDate as Date, 'dd/MM/yyyy')
                : null

        dispatch(addEmployee(data) as any)

        if (!employees.error) handleOpenModal()
        else console.log(employees.error)
    }

    const handleOpenModal = () => setIsOpen(true)
    const handleCloseModal = () => setIsOpen(false)

    return (
        <>
            <h1 className="title">HRnet</h1>
            <Link to="/employees">View Current Employees</Link>
            <h2>Create Employee</h2>
            <form id="create-employee" onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" onChange={handleChange} />

                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" onChange={handleChange} />

                <label htmlFor="dateOfBirth">Date of Birth</label>
                <DatePicker
                    id="dateOfBirth"
                    selected={form.dateOfBirth}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date: Date) =>
                        handleSelctChange({ value: date, id: 'dateOfBirth' })
                    }
                />

                <label htmlFor="startDate">Start Date</label>
                <DatePicker
                    id="startDate"
                    selected={form.startDate}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date: Date) =>
                        handleSelctChange({ value: date, id: 'startDate' })
                    }
                />

                <fieldset className="address">
                    <legend>Address</legend>

                    <label htmlFor="street">Street</label>
                    <input id="street" type="text" onChange={handleChange} />

                    <label htmlFor="city">City</label>
                    <input id="city" type="text" onChange={handleChange} />

                    <label htmlFor="state">State</label>
                    <Select
                        onChange={(e) =>
                            handleSelctChange({
                                ...e,
                                id: 'state',
                            } as EventType)
                        }
                        defaultValue={stateOption[0]}
                        options={stateOption}
                        inputId="state"
                        isSearchable={false}
                    />

                    <label htmlFor="zipCode">Zip Code</label>
                    <input id="zipCode" type="number" onChange={handleChange} />
                </fieldset>

                <label htmlFor="department">Department</label>
                <Select
                    onChange={(e) =>
                        handleSelctChange({
                            ...e,
                            id: 'department',
                        } as EventType)
                    }
                    defaultValue={departementOptions[0]}
                    options={departementOptions}
                    inputId="department"
                    isSearchable={false}
                />
                <button type="submit">Save</button>
            </form>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                className="modal"
                overlayClassName="overlay"
            >
                <div>Employee Created!</div>
                <button onClick={handleCloseModal}>X</button>
            </Modal>
        </>
    )
}
