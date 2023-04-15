import { Box, TextField, FormControl, FormLabel, RadioGroup, Radio, SnackbarContent,Snackbar, FormControlLabel, Button, FormGroup, Checkbox, FormHelperText, Typography, CircularProgress } from '@mui/material';
import { useContext, useState } from 'react';
import { context } from '../ContextApi/ContextApi';
import { useNavigate } from 'react-router-dom';


const EmployeeForm = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const { addEmployee, loading } = useContext(context)

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

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
        addEmployee(values);
        setValues({});
        setOpenSnackbar(true);
        setSnackbarMessage('Employee added successfully');
        setTimeout(() => {
            navigate('/table')
        }, 2000);
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
        setValues({})
    };
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: '100vh',
                backgroundImage: 'url(https://img.freepik.com/premium-photo/cartoon-character-freelancer-with-laptop-his-hands-flies-chair-like-rocket-innovation-startup-concept-3d-illustration_325164-1185.jpg?w=996)',
                backgroundSize: 'cover',
                mt: '67px'
            }}
        >
            <Box
                sx={{
                    marginLeft: "60px",
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    p: 4,
                    borderRadius: 4,
                    border: "1px solid red",
                    width: "30%",
                    height: '600px'
                }}
            >
                <Typography variant="h3" mt={-2} mb={2} align="center" sx={{ fontFamily: 'Montserrat', fontWeight: 'bold', letterSpacing: '1px' }}>
                    Registration form
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{
                     display: 'flex', flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '8px'}}>
                    <TextField
                        label="Name"
                        name="name"
                        value={values.name || ''}
                        onChange={handleChange}
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={values.email || ''}
                        onChange={handleChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        required
                    />
                    <TextField
                        label="Phone"
                        name="phone"
                        type="tel"
                        value={values.phone || ''}
                        onChange={handleChange}
                        error={Boolean(errors.phone)}
                        helperText={errors.phone}
                        required
                    />
                    <TextField
                        label="Date of Birth"
                        name="dob"
                        type="date"
                        value={values.dob || ''}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormControl component="fieldset" error={Boolean(errors.gender)}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                            aria-label="gender"
                            name="gender"
                            value={values.gender || ''}
                            onChange={handleChange}
                            style={{ display: 'flex', flexDirection: 'row', }}
                        >
                            <FormControlLabel
                                value="male"
                                control={<Radio />}
                                label="Male"
                                style={{ flex: 1 }}
                            />
                            <FormControlLabel
                                value="female"
                                control={<Radio />}
                                label="Female"
                                style={{ flex: 1 }}
                            />
                            <FormControlLabel
                                value="other"
                                control={<Radio />}
                                label="Other"
                                style={{ flex: 1 }}
                            />
                        </RadioGroup>
                        <FormHelperText>{errors.gender}</FormHelperText>
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
                        <FormHelperText>{errors.hobbies}</FormHelperText>
                    </FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 2 }}>
                        <Button variant="outlined" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" type='submit' >
                            {loading ? <CircularProgress size={24} /> : 'Submit'}
                        </Button>
                    </Box>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={openSnackbar}
                        autoHideDuration={3000} // Hide after 3 seconds
                        onClose={() => setOpenSnackbar(false)}
                    >
                        <SnackbarContent
                            sx={{ bgcolor:'greenyellow' }}
                            message={snackbarMessage}
                        />
                    </Snackbar>

                </Box>
            </Box>
        </Box>
    );
};

export default EmployeeForm;