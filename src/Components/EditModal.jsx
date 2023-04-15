import { useContext, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { context } from '../ContextApi/ContextApi';

const EditModal = ({ employeeData }) => {
    const { employees, updateEmployee, modalOpen,closeModal } = useContext(context);
    const [formData, setFormData] = useState(employeeData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateEmployee(employeeData.id,formData);
        closeModal();
        console.log(employees)
    };

    const handlemodal = () =>{
        setTimeout(() => {
            closeModal();
            console.log(modalOpen)
        }, 2000); 
    }

    return (
        <Modal open={modalOpen} onClose={closeModal}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '4px',
                    outline: 'none',
                }}
            >
                <Typography variant="h6">Edit Employee Details</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="name"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="phone"
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="dob"
                        label="Date of Birth"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.dob}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="gender"
                        label="Gender"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.gender}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="hobbies"
                        label="Hobbies"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.hobbies.join(',')}
                        onChange={handleInputChange}
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ marginRight: '1rem' }}>
                        Save
                    </Button>
                    <Button variant="contained" onClick={handlemodal}>
                        Cancel
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};
export default EditModal;


