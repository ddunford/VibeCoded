import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AI Writer
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate('/')}>
            Editor
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 