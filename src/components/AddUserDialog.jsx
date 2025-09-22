import { Close } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField } from '@mui/material';
import React, { useEffect } from 'react'

function AddUserDialog({open, onClose, handleAddUser}) {
    const [userForm, setUserForm] = React.useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });
    const [errors, setErrors] = React.useState({});

    useEffect(() => {
        if (!open) {
            setUserForm({name: '', email: '', phone: ''});
            setErrors({});
        }
    }, [open]);

    const validate = () => {
        const newErrors = {};
        if (!userForm.name?.trim()) newErrors.name = "Name is required";
        if (!userForm.email?.trim()) newErrors.email = "Email is required";
        if (!userForm.phone?.trim()) newErrors.phone = "Phone is required";
        if (!userForm.address?.trim()) newErrors.address = "Address is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = () => {
        if (!validate()) {
            return;
        }
        // Submit the form
        console.log("Submitting user:", userForm);
        handleAddUser({...userForm, id: Date.now()}); 
        onClose();
    }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>
            Add New User
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{ position: 'absolute', right: 8, top: 8 }}
            >
                <Close/>
            </IconButton>
        </DialogTitle>
        <DialogContent>
            <Stack spacing={2} sx={{mt: 1}}>    
                <TextField
                    label="Name"   
                    value={userForm.name}
                    onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                    error={!!errors.name}
                    helperText={errors.name}
                    autoFocus
                />
                <TextField
                    label="Phone"
                    value={userForm.phone}  
                    onChange={(e) => setUserForm({...userForm, phone: e.target.value})}
                    error={!!errors.phone}
                    helperText={errors.phone}
                />
                <TextField
                    label="Email"  
                    value={userForm.email}
                    onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    label="Address"
                    value={userForm.address}  
                    onChange={(e) => setUserForm({...userForm, address: e.target.value})}
                    error={!!errors.address}
                    helperText={errors.address}
                />
            </Stack>
        </DialogContent>

        <DialogActions>
            <Stack direction="row" spacing={2} sx={{p: 2}}>
                <Button variant="outlined" onClick={onClose}>Close</Button>
                <Button variant="contained" onClick={handleSubmit}>Save Changes</Button>
            </Stack>
        </DialogActions>
    </Dialog>
  )
}

export default AddUserDialog