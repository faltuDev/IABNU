import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { App } from '@capacitor/app';
import { Storage } from '@capacitor/storage';
import Cookies from 'js-cookie';
import { db } from '../firebase';
import { ref, get } from 'firebase/database';
import { motion } from 'framer-motion';

// MUI components and icons
import { Box, Avatar, Typography, List, ListItemButton, ListItemIcon, ListItemText, Divider, useTheme } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import LogoutIcon from '@mui/icons-material/Logout';

interface UserProfile {
  firstName: string;
  lastName: string;
  title: string;
  profilePhoto?: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let userId = Cookies.get('userId');
        if (!userId) {
          const { value } = await Storage.get({ key: 'userId' });
          userId = value || undefined;
        }
        if (!userId) {
          navigate('/login');
          return;
        }

        const userKey = `users/${userId}`;
        const snapshot = await get(ref(db, userKey));
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUser({
            firstName: data.first_name,
            lastName: data.last_name,
            title: data.title || '',
            profilePhoto: data.profile_photo || undefined,
          });
        } else {
          navigate('/login');
        }
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };

    fetchProfile();

    const interval = setInterval(() => {
      const userId = Cookies.get('userId');
      if (!userId) {
        navigate('/login');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const actions = [
    { name: 'Transactions', icon: <CreditCardIcon />, onClick: () => navigate('/transactions') },
    { name: 'Exit App', icon: <PowerSettingsNewIcon />, onClick: () => App.exitApp() },
    { name: 'Logout', icon: <LogoutIcon />, onClick: async () => {
        Cookies.remove('userId');
        await Storage.remove({ key: 'userId' });
        navigate('/login');
      }
    },
  ];

  if (!user) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bgcolor="#E3F2FD"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h6" color="textSecondary">
            Loading profile...
          </Typography>
        </motion.div>
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box
        minHeight="100vh"
        bgcolor="#E3F2FD"
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={2}
      >
        <Box
          width="100%"
          maxWidth={360}
          bgcolor="white"
          borderRadius={2}
          boxShadow={3}
          overflow="hidden"
        >
          <Box display="flex" flexDirection="column" alignItems="center" p={3} bgcolor="#BBDEFB">
            <Avatar
              src={user.profilePhoto}
              alt={`${user.firstName} ${user.lastName}`}
              sx={{ width: 96, height: 96, border: `4px solid ${theme.palette.primary.main}` }}
            >
              {user.firstName.charAt(0)}
            </Avatar>
            <Typography variant="h5" mt={2} fontWeight={600} color="primary">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {user.title}
            </Typography>
          </Box>

          <List disablePadding>
            {actions.map((action, idx) => (
              <React.Fragment key={action.name}>
                <ListItemButton
                  onClick={action.onClick}
                  sx={{
                    '&:hover': { bgcolor: '#E3F2FD' },
                    transition: 'background-color 200ms ease-in-out',
                  }}
                  component={motion.div}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                    {action.icon}
                  </ListItemIcon>
                  <ListItemText primary={action.name} primaryTypographyProps={{ fontWeight: 500 }} />
                </ListItemButton>
                {idx < actions.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Profile;
