import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import {
  ThemeProvider,
  createTheme,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Box,
  Alert
} from '@mui/material';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

interface Person {
  title: string;
  name: string;
  bloodGroup: string;
  phone: string;
  email: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#1565c0',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f9ff'
    }
  },
  typography: {
    fontFamily: [
      'Noto Sans Bengali',
      'Kalpurush',
      'Arial',
      'sans-serif'
    ].join(','),
    h3: {
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '0.1rem'
    }
  }
});

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  borderRadius: '12px !important',
  background: 'linear-gradient(145deg, #ffffff, #e3f2fd)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  margin: '8px 0',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 16px rgba(25, 118, 210, 0.2)'
  },
  '&::before': {
    display: 'none'
  }
}));

const DistrictPage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const jelaRef = ref(db, 'jela');
    const unsubscribe = onValue(jelaRef, 
      (snapshot) => {
        const data = snapshot.val() || {};
        if (Object.keys(data).length === 0) {
          setError('বর্তমানে কোন তথ্য পাওয়া যায়নি');
        }
        setPeople(Object.values(data));
        setLoading(false);
      }, 
      (error) => {
        console.error('RTDB Error:', error);
        setError('তথ্য লোড করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ 
        mt: { xs: 2, sm: 4 }, 
        mb: 4, 
        p: { xs: 2, sm: 3 },
        minHeight: '80vh'
      }}>
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeIn} 
          transition={{ duration: 0.8 }}
        >
          <Box 
            sx={{ 
              textAlign: 'center', 
              mb: 4,
              position: 'relative',
              '&::after': {
                content: '""',
                display: 'block',
                width: '60px',
                height: '4px',
                backgroundColor: theme.palette.primary.main,
                borderRadius: '2px',
                margin: '16px auto 0'
              }
            }}
          >
            <LocationOnIcon 
              color="primary" 
              sx={{ 
                fontSize: '3rem', 
                mb: 1,
                filter: 'drop-shadow(0 2px 4px rgba(25, 118, 210, 0.3))'
              }} 
            />
            <Typography 
              variant="h3" 
              component="h1" 
              color="primary"
              sx={{
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                lineHeight: 1.2
              }}
            >
              জেলা কমিটি
            </Typography>
            <Typography 
              variant="body1" 
              color="textSecondary" 
              sx={{ mt: 1, opacity: 0.8 }}
            >
              সরাসরি যোগাযোগ করুন
            </Typography>
          </Box>
        </motion.div>

        {loading ? (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: 2,
            py: 4
          }}>
            <CircularProgress 
              size={50} 
              thickness={4}
              color="primary" 
              sx={{ animationDuration: '800ms' }}
            />
            <Typography variant="body1" color="textSecondary">
              তথ্য লোড হচ্ছে...
            </Typography>
          </Box>
        ) : error ? (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3,
              '& .MuiAlert-message': { textAlign: 'center' }
            }}
          >
            {error}
          </Alert>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={2}>
              {people.map((person, idx) => (
                <Grid item xs={12} key={idx}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: idx * 0.05,
                      type: 'spring',
                      stiffness: 100
                    }}
                  >
                    <StyledAccordion>
                      <AccordionSummary 
                        expandIcon={
                          <ExpandMoreIcon 
                            color="primary" 
                            sx={{ 
                              transform: 'rotate(0deg)',
                              transition: 'transform 0.2s',
                              '&.Mui-expanded': {
                                transform: 'rotate(180deg)'
                              }
                            }} 
                          />
                        }
                        sx={{
                          '& .MuiAccordionSummary-content': {
                            alignItems: 'flex-start',
                            gap: 1.5
                          }
                        }}
                      >
                        <LocalHospitalIcon 
                          color="primary" 
                          sx={{ 
                            fontSize: '1.8rem',
                            opacity: 0.8,
                            flexShrink: 0,
                            mt: 0.5
                          }} 
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography 
                            variant="body2" 
                            color="textSecondary"
                            sx={{ 
                              lineHeight: 1.2,
                              fontSize: '0.875rem',
                              mb: 0.5
                            }}
                          >
                            {person.title}
                          </Typography>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 700,
                              lineHeight: 1.3,
                              fontSize: '1.1rem'
                            }}
                          >
                            {person.name}
                          </Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{ 
                          background: 'rgba(245, 249, 255, 0.5)',
                          borderTop: '1px solid rgba(25, 118, 210, 0.1)'
                        }}
                      >
                        <Box 
                          sx={{ 
                            display: 'grid', 
                            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                            gap: 2,
                            p: 1
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <LocalHospitalIcon 
                              color="primary" 
                              sx={{ fontSize: '1.5rem', opacity: 0.8 }} 
                            />
                            <Box>
                              <Typography variant="body2" color="textSecondary">
                                রক্তের গ্রুপ
                              </Typography>
                              <Typography variant="body1">
                                {person.bloodGroup}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <PhoneIcon 
                              color="primary" 
                              sx={{ fontSize: '1.5rem', opacity: 0.8 }} 
                            />
                            <Box>
                              <Typography variant="body2" color="textSecondary">
                                ফোন নম্বর
                              </Typography>
                              <Typography 
                                variant="body1"
                                component="a" 
                                href={`tel:${person.phone}`}
                                sx={{ 
                                  textDecoration: 'none',
                                  color: 'inherit',
                                  '&:hover': { color: theme.palette.primary.main }
                                }}
                              >
                                {person.phone}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1.5,
                            gridColumn: { xs: '1 / -1', sm: 'auto' }
                          }}>
                            <EmailIcon 
                              color="primary" 
                              sx={{ fontSize: '1.5rem', opacity: 0.8 }} 
                            />
                            <Box>
                              <Typography variant="body2" color="textSecondary">
                                ইমেইল
                              </Typography>
                              <Typography 
                                variant="body1"
                                component="a" 
                                href={`mailto:${person.email}`}
                                sx={{ 
                                  textDecoration: 'none',
                                  color: 'inherit',
                                  '&:hover': { color: theme.palette.primary.main }
                                }}
                              >
                                {person.email}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </AccordionDetails>
                    </StyledAccordion>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        )}

        {!loading && people.length === 0 && !error && (
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              textAlign: 'center',
              background: 'rgba(245, 249, 255, 0.5)',
              borderRadius: 3
            }}
          >
            <Typography variant="body1" color="textSecondary">
              কোন তথ্য পাওয়া যায়নি
            </Typography>
          </Paper>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default DistrictPage;