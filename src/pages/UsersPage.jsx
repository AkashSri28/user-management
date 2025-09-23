import { Autocomplete, Button, Divider, IconButton, Paper, Stack, TextField, Tooltip, Typography, Link, createFilterOptions } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getUsers } from '../api/users';
import AddUserDialog from '../components/AddUserDialog';
import { Edit } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import Lottie from 'lottie-react';
import emptyAnimation from '../assets/animations/empty.json';

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [dialog, setDialog] = useState({
        open: false,
        user: null,
        type: 'add', 
    }); 
    const [query, setQuery] = useState("");
    const [displayedUsers, setDisplayedUsers] = useState([]);

    const defaultFilter = createFilterOptions();

    const suggestions = Array.from(
        new Set(
            users.flatMap((u) => [u?.name, u?.email, u?.phone].filter(Boolean))
        )
    ).slice(0, 10); 

    useEffect(() => {
        // Fetch users from API
        (async () => {
            try {
                const data = await getUsers();
                setUsers(data);
                setDisplayedUsers(data);
            } catch (e) {
                console.error(e.message || "Failed to load users");
            } finally {
            }
        })();
    }, []);

    const handleAddUser = (userForm) => {
        const newUser = {
            id: Date.now(),
            ...userForm
        }
        setUsers([newUser, ...users]);
        setDisplayedUsers([newUser, ...displayedUsers]);
    }

    const handleEditUser = (updatedUser) => {
        const updatedUsers = users.map(u => 
            u.id === dialog.user.id ? {...u, ...updatedUser} : u
        );
        setUsers(updatedUsers);
        setDisplayedUsers(updatedUsers);
    }

    const handleSearch = () => {
        if (!query.trim()) {
            setDisplayedUsers(users);
            return;
        }
        const q = query.trim().toLowerCase();
        const filtered = users.filter(u => 
            u.name?.toLowerCase().includes(q) || 
            u.phone?.toLowerCase().includes(q) ||
            u.email?.toLowerCase().includes(q)
        );
        setDisplayedUsers(filtered);
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            // Trigger search
            console.log("Searching for:", query);
            handleSearch();
        }
    }

  return (
    <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <h1>Users</h1>
            {/* Button to add user */}
            <Button variant="contained" onClick={
                () => setDialog({open: true, type: 'add', user: null})
            }>Add User</Button>
        </Stack>

        {/* Search + Go button */}
        <Stack direction={{
            xs: 'column',
            sm: 'row'
        }} spacing={1.5}>
            <Autocomplete
                freeSolo
                options={suggestions}
                sx={{flexGrow: 1}}
                inputValue={query}
                onChange={(e, val) => setQuery(val || '')}
                onInputChange={(e, val) => setQuery(val || '')}
                filterOptions={(options, state) =>
                    state.inputValue.trim().length > 0
                    ? defaultFilter(options, state)
                    : []
                }
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        label="Search by name, phone or email" 
                        onKeyDown={onKeyDown}
                    />  
                )}
            />
            <Button variant="contained" onClick={handleSearch}>Go</Button>
        </Stack>

        <Paper variant='outlined'>
            {displayedUsers?.length === 0 ? (
                <Stack alignItems="center" sx={{py: 5}}>
                    <Lottie
                        animationData={emptyAnimation}
                        loop
                        style={{ width: 150, height: 150, margin: 'auto', marginTop: 20 }}
                    />
                    <Typography sx={{p: 2}} color="text.secondary">
                        No users found.
                    </Typography>
                </Stack>
                
            ): (
                <Stack
                    divider={<Divider/>}
                    spacing={0}
                >
                    {displayedUsers?.map(user => (
                        <Stack key={user.id} sx={{p:2}}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                                <Link
                                    component={RouterLink}
                                    to={`/users/${user.id}`}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                    state={{ user }}
                                    underline="hover"
                                    variant='h6' 
                                    fontWeight={600}
                                    color='primary.main'
                                    sx={{cursor: 'pointer'}}
                                >
                                    {user.name}
                                </Link>
                                
                                <Tooltip title="Edit User" arrow>
                                    <IconButton size='small' onClick={
                                        () => setDialog({open: true, type: 'edit', user})
                                    }>
                                        <Edit fontSize='small'/>
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        
                            <Typography color="text.secondary">
                                {[user.phone, user.email].filter(Boolean).join(", ")}
                            </Typography>
                        </Stack>
                    ))}   
                </Stack>
            )}
            
        </Paper>
        

        <AddUserDialog 
            open={dialog.open} 
            type={dialog.type} 
            onClose={() => setDialog({...dialog, open: false})}
            onSubmit={(newUser) => {
                if (dialog.type === 'add') {
                    handleAddUser(newUser); 
                } else if (dialog.type === 'edit') {
                    // Handle edit user
                    handleEditUser(newUser);
                }      
                setDialog({...dialog, open: false});
            }}
            defaultValues={dialog.user}
        />
    </Stack>    
  )
}

export default UsersPage