import { Button, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getUsers } from '../api/users';
import AddUserDialog from '../components/AddUserDialog';

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [openAddUser, setOpenAddUser] = useState(false);

    useEffect(() => {
        // Fetch users from API
        (async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (e) {
                console.error(e.message || "Failed to load users");
            } finally {
            }
        })();
    }, []);

    const handleAddUser = (newUser) => {
        setUsers([newUser, ...users]);
    }

  return (
    <Stack spacing={2}>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h1>Users</h1>
        {/* Button to add user */}
        <Button variant="contained" onClick={() => setOpenAddUser(true)}>Add User</Button>
    </Stack>
        {users?.map(user => (
            <Stack key={user.id} spacing={1} sx={{p:2, border: '1px solid #ccc', borderRadius: 1}}>
                <div><strong>Name:</strong> {user.name}</div>
                <div><strong>Phone:</strong> {user.phone}</div>
                <div><strong>Email:</strong> {user.email}</div>
            </Stack>
        ))}   

        <AddUserDialog open={openAddUser} onClose={() => setOpenAddUser(false)} handleAddUser={handleAddUser} />
    </Stack>    
  )
}

export default UsersPage