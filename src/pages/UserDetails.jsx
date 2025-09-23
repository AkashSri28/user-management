import { ArrowBack } from '@mui/icons-material';
import { Button, Chip, Divider, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

function UserDetails() {
const {state} = useLocation();
const user = state?.user;

useEffect(() => {
    if (!user) {
        // Redirect back to users page
        navigate("/", {replace: true});
    }
}, [user]);

  return (
    <Stack spacing={2}>

        <Button 
            startIcon={<ArrowBack/>} 
            variant='text' 
            href="/"
            size='small'
            sx={{
                textTransform: 'none',
                alignSelf: 'flex-start',
            }}
        >Back to Users Dashboard</Button>
        <Typography variant='h4' fontWeight={'bold'} sx={{my: 2}}>
            User Details
        </Typography>

        <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack spacing={2} divider={<Divider />}>
                <Stack spacing={0.5}>
                    <Typography variant='h5' fontWeight={'bold'}>
                        {user?.username? `@${user.username}`: user.name}
                    </Typography>

                    <Typography variant='subtitle1' color="text.secondary">
                        {user?.name}
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{mt: 1}}>
                        <Chip size='small' label={user.website}/>
                    </Stack>
                </Stack>

                <Stack spacing={0.5}>
                    <Typography fontWeight={600} variant='subtitle1'>
                        Contact Information
                    </Typography>
                    <Typography variant='body2'>
                        <strong>Email:</strong> {user?.email}
                    </Typography>
                    <Typography variant='body2'>
                        <strong>Phone:</strong> {user?.phone}
                    </Typography>
                    <Typography variant='body2'>
                        <strong>Address:</strong> {user?.address?.street}, {user?.address?.suite}, {user?.address?.city}, {user?.address?.zipcode}
                    </Typography>
                </Stack>

                <Stack spacing={0.5}>
                    <Typography fontWeight={600} variant='subtitle1'>
                        Company
                    </Typography>
                    <Typography variant='body2'>
                        <strong>Company:</strong> {user?.company?.name}
                    </Typography>
                    <Typography variant='body2'>
                        <strong>Catch Phrase:</strong> {user?.company?.catchPhrase}
                    </Typography>
                    <Typography variant='body2'>
                        <strong>BS:</strong> {user?.company?.bs}
                    </Typography>
                </Stack>

            </Stack>
        </Paper>
    </Stack>
  )
}

export default UserDetails