import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { context } from '../ContextApi/ContextApi';
import ViewEmployee from '../Components/EmployeeModal';

const ViewEmployeePage = () => {
    const { id } = useParams();
    const {  employees } = useContext(context)
    const employee = employees.find((emp) => emp.id === id);

    if (!employee) {
        return <div>Employee not found</div>;
    }

    return (<>
        <ViewEmployee employee={employee} />
    </>);
};

export default ViewEmployeePage;
