import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Employees() {
  useEffect(() => {
    document.title = 'Employees - HRnet'
  }, [])

  return (
    <>
      <h1 className="title" >Current Employees</h1>

      <Link to="/">Home</Link>
    </>
  )
}
