import React from 'react'
import EmployeeForm from '../Pages/EmployeeForm'
import EmployeTable from '../Pages/EmployeTable'
import ResponsiveAppBar from '../Components/Navbar'
import {Routes , Route} from 'react-router-dom'
import ViewEmployeePage from '../Pages/ViewEmployeePage'

const Routing = () => {
  return (
    <div>
    <ResponsiveAppBar/>
      <Routes>
        <Route path="/" element={<EmployeeForm />} />
        <Route path="/table" element={<EmployeTable />} />
        <Route path='/viewpage/:id' element={<ViewEmployeePage/>}/>
      </Routes>
    </div>
  )
}
export default Routing
 