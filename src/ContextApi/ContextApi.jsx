import {createContext, useEffect, useState} from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const context = createContext();

const ContextApi = ({children}) => {
  const [employees, setEmployees] = useState([]);

  //modal open and close
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  //loading
  const [loading , setLoading] = useState(false);

  // Get all employees
  const getEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:8000/employees');
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Add employee
  const addEmployee = async (employee) => {
    try {
      setLoading(true)
      const newEmployee = { ...employee, id: uuidv4() };
      const res = await axios.post('http://localhost:8000/employees', newEmployee);
      setEmployees([...employees, res.data]);
      setLoading(false);
    } catch (err) {
      setLoading(false)
      console.log(err);
    }
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/employees/${id}`);
      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // Update employee
  const updateEmployee = async (id, updatedEmployee) => {
    try {
      const res = await axios.put(`http://localhost:8000/employees/${id}`, updatedEmployee);
      setEmployees(
        employees.map((employee) => (employee.id === id ? res.data : employee))
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);
    
  return (
    <div>
      <context.Provider value={{
        employees,
        addEmployee,
        deleteEmployee,
        updateEmployee,
        modalOpen,
        openModal,
        closeModal, loading, setLoading
      }}>
        {children}
      </context.Provider>
    </div>
  )
}

export default ContextApi
