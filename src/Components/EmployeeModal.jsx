import * as React from 'react';
import { Box, Card, CardContent, CardHeader, Typography, Button, DialogActions, MenuItem, Chip, OutlinedInput, Select, InputLabel, FormControl, Radio, FormControlLabel, RadioGroup, FormLabel, TextField, DialogContent, DialogTitle, Dialog, FormGroup, Checkbox, FormHelperText } from '@mui/material';
import { styled } from '@mui/material/styles';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom'
import { context } from '../ContextApi/ContextApi';
// import EditModal from './EditModal';

const CardContainer = styled(Box)(({ theme }) => ({
    backgroundColor: 'lightcoral',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '70px'
}));

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: '600px',
    width: '100%',
    marginTop: '-50px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '12px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
}));

const OverBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'lightyellow',
    padding: '8px 16px',
    borderRadius: '12px',
}));
const ViewPage = ({ employee }) => {
    const { name, email, phone, dob, gender, hobbies } = employee;
    const { updateEmployee, employees } = React.useContext(context)
    const [modalStatus, setModalStatus] = React.useState(false)
    const handleCloseEditModal = () => {
        setModalStatus(false)
    }
    const handleOpenEditModal = () => {
        setModalStatus(true)
    }
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const handleChange = (e) => {
        setValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const value = values.hobbies || [];
        const checked = e.target.checked;
        const hobby = e.target.value;
        const newHobbies = checked
            ? [...value, hobby]
            : value.filter((h) => h !== hobby);
        setValues((prevValues) => ({
            ...prevValues,
            hobbies: newHobbies,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(values);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        // console.log(values)
        updateEmployee(employee.id,values);
        setValues({});
        handleCloseEditModal();
    };

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Name is required';
        }
        if (!values.email) {
            errors.email = 'Email is required';
        }
        if (!values.phone) {
            errors.phone = 'Phone is required';
        }
        return errors;
    };

    const handleCancel = () => {
        handleCloseEditModal()
    };
    // console.log(employees)
    return (
        <>
            {!modalStatus ? <CardContainer>
                <StyledCard>
                    <CardHeader
                        avatar={<Avatar name={name} size={100} round={true} />}
                        title={<Typography variant="h4">{name}</Typography>}
                        sx={{ backgroundColor: '#fff', borderBottom: '1px solid #eee', borderRadius: '12px 12px 0px 0px' }}
                    />
                    <CardContent sx={{ paddingBottom: '2rem' }}>
                        <OverBox sx={{ marginBottom: '2rem' }}>
                            <Typography variant="h6">Contact Information</Typography>
                            <Typography variant="body1">{`Email: ${email}`}</Typography>
                            <Typography variant="body1">{`Phone: ${phone}`}</Typography>
                        </OverBox>
                        <OverBox sx={{ marginBottom: '2rem' }}>
                            <Typography variant="h6">Personal Information</Typography>
                            <Typography variant="body1">{`Gender: ${gender}`}</Typography>
                        </OverBox>
                        <OverBox sx={{ marginBottom: '2rem' }}>
                            <Typography variant="h6">Date of Birth</Typography>
                            <Typography variant="body1">{dob}</Typography>
                        </OverBox>
                        <OverBox sx={{ marginBottom: '2rem' }}>
                            <Typography variant="h6">Hobbies</Typography>
                            <Typography variant="body1">{hobbies.join(', ')}</Typography>
                        </OverBox>
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Button variant="contained" color="primary" onClick={handleOpenEditModal}>
                                Edit
                            </Button>
                            <Link to='/table'><Button variant="contained">
                                Back
                            </Button></Link>
                        </Box>
                    </CardContent>
                </StyledCard>
            </CardContainer > : <Dialog open={modalStatus} onClose={handleCloseEditModal}>
                <DialogTitle>Edit Employee Details</DialogTitle>
                <DialogContent>
                        <Box component="form" onSubmit={handleSubmit} sx={{
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '1rem',
                            border: '1px solid #ccc',
                            borderRadius: '8px'
                        }}>
                            <TextField
                                label="Name"
                                name="name"
                                defaultValue={employee.name || ''}
                                onChange={handleChange}
                                // error={Boolean(errors.name)}
                                // helperText={errors.name}
                                required
                            />
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                defaultValue={employee.email || ''}
                                onChange={handleChange}
                                // error={Boolean(errors.email)}
                                // helperText={errors.email}
                                required
                            />
                            <TextField
                                label="Phone"
                                name="phone"
                                type="tel"
                                defaultValue={employee.phone || ''}
                                onChange={handleChange}
                                // error={Boolean(errors.phone)}
                                // helperText={errors.phone}
                                required
                            />
                            <TextField
                                label="Date of Birth"
                                name="dob"
                                type="date"
                                defaultValue={employee.dob || ''}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup
                                    aria-label="gender"
                                    name="gender"
                                    defaultValue={employee.gender || ''}
                                    onChange={handleChange}
                                    style={{ display: 'flex', flexDirection: 'row', }}
                                >
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio />}
                                        label="Male"
                                        style={{ flex: 1 }}
                                        defaultChecked
                                    />
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio />}
                                        label="Female"
                                        style={{ flex: 1 }}
                                        defaultChecked
                                    />
                                    <FormControlLabel
                                        value="other"
                                        control={<Radio />}
                                        label="Other"
                                        style={{ flex: 1 }}
                                        defaultChecked
                                    />
                                </RadioGroup>
                                {/* <FormHelperText>{errors.gender}</FormHelperText> */}
                            </FormControl>
                            <FormControl
                                component="fieldset"
                                error={Boolean(errors.hobbies)}
                                required
                            >
                                <FormLabel component="legend">Hobbies</FormLabel>
                                <FormGroup style={{ display: 'flex', flexDirection: 'row', }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={(values.hobbies || []).includes('reading')}
                                                onChange={handleCheckboxChange}
                                                name="reading"
                                                value="reading"
                                            />
                                        }
                                        label="Reading"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={(values.hobbies || []).includes('traveling')}
                                                onChange={handleCheckboxChange}
                                                name="traveling"
                                                value="traveling"
                                            />
                                        }
                                        label="Traveling"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={(values.hobbies || []).includes('painting')}
                                                onChange={handleCheckboxChange}
                                                name="painting"
                                                value="painting"
                                            />
                                        }
                                        label="Painting"
                                    />
                                </FormGroup>
                                {/* <FormHelperText>{errors.hobbies}</FormHelperText> */}
                            </FormControl>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                <Button variant="outlined" onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="contained" sx={{ ml: 2 }}>
                                    Submit
                                </Button>
                            </Box>
                        </Box>
                </DialogContent>
            </Dialog>
            }
        </>
    );
};
export default ViewPage;
