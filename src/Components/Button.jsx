import { Button } from '@mui/material';

const ActionButton = ({ label, onClick, color }) => {
    return (
        <Button variant="contained" color={color} onClick={onClick} sx={{ margin: '0 8px' }}>
            {label}
        </Button>
    );
};
export default ActionButton;

// Example usage:
{/* <ActionButton label="View" color="primary" onClick={handleView} />
<ActionButton label="Edit" color="warning" onClick={handleEdit} />
<ActionButton label="Delete" color="error" onClick={handleDelete} /> */}
