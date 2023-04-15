import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { context } from '../ContextApi/ContextApi';
import {  Visibility } from '@mui/icons-material';
import { Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom';

export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);



  const { employees,
    deleteEmployee } = React.useContext(context);

  const handleDelete =(id)=>{
    deleteEmployee(id)
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', marginTop: "70px" }}>
      <TableContainer >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{ position: 'sticky', top: '0px', zIndex: '10', backgroundColor: '#f0f0f0', borderBottom: '2px solid #e0e0e0' }}>
              <TableCell align="center" colSpan={6} sx={{ fontFamily: 'Montserrat', backgroundColor: '#f0f0f0', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '0.1rem', color: '#333333', padding: '16px' }}>
                Employee Table
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontFamily: 'Montserrat', fontWeight: 'bold', color: '#555555', backgroundColor: '#f7f7f7', borderBottom: '2px solid #e0e0e0' }}>Name</TableCell>
              <TableCell sx={{ fontFamily: 'Montserrat', fontWeight: 'bold', color: '#555555', backgroundColor: '#f7f7f7', borderBottom: '2px solid #e0e0e0' }}>Employee Id</TableCell>
              <TableCell sx={{ fontFamily: 'Montserrat', fontWeight: 'bold', color: '#555555', backgroundColor: '#f7f7f7', borderBottom: '2px solid #e0e0e0' }}>Phone</TableCell>
              <TableCell sx={{ fontFamily: 'Montserrat', fontWeight: 'bold', color: '#555555', backgroundColor: '#f7f7f7', borderBottom: '2px solid #e0e0e0' }}>Gender</TableCell>
              <TableCell sx={{ fontFamily: 'Montserrat', fontWeight: 'bold', color: '#555555', backgroundColor: '#f7f7f7', borderBottom: '2px solid #e0e0e0' }}>View Button</TableCell>
              <TableCell sx={{ fontFamily: 'Montserrat', fontWeight: 'bold', color: '#555555', backgroundColor: '#f7f7f7', borderBottom: '2px solid #e0e0e0' }}>Delete Button</TableCell>
            </TableRow>

          </TableHead>
          <TableBody>
            {employees
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((employee) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={employee.id.toString()}>
                  <TableCell align="left">{employee.name}</TableCell>
                  <TableCell align="left">{employee.id.toString()}</TableCell>
                  <TableCell align="left">{employee.email}</TableCell>
                  <TableCell align="left">{employee.gender}</TableCell>
                  <TableCell align="left">
                    <Link to={`/viewpage/${employee.id.toString()}`}><Button variant="contained" color="primary" startIcon={<Visibility />}  >View</Button></Link>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(employee.id.toString())}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={employees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* <EmployeeModal open={modalOpen} onClose={handleCloseModal} employee={selectedEmployee} /> */}
    </Paper>
    
  );
}