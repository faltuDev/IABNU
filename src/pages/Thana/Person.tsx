import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Skeleton,
  useTheme,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  LocalHospital as LocalHospitalIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

interface Person {
  id: string;
  title: string;
  name: string;
  bloodGroup: string;
  phone: string;
  email: string;
}

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  borderRadius: "8px",
  boxShadow: theme.shadows[1],
  "&:before": { display: "none" },
  "&.Mui-expanded": { margin: "16px 0" },
}));

const PersonPage: React.FC = () => {
    const { thanaId } = useParams<{ thanaId: string }>();
    const navigate = useNavigate();
    const theme = useTheme();
    const [people, setPeople] = useState<Person[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [thanaName, setThanaName] = useState('');

  useEffect(() => {
    if (!thanaId) {
      navigate("/thana"); // Redirect to thana list instead of home
      return;
    }

    const thanaRef = ref(db, `thana/${thanaId}`);

    try {
      onValue(thanaRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setThanaName(data.name || "");
          const persons = data.persons
            ? Object.keys(data.persons).map((key) => ({
                id: key,
                ...data.persons[key],
              }))
            : [];
          setPeople(persons);
        } else {
          setError("থানা খুঁজে পাওয়া যায়নি");
          setTimeout(() => navigate("/thana"), 3000); // Redirect after 3 seconds
        }
        setLoading(false);
      });
    } catch (err) {
      setError("ডেটা লোড করতে সমস্যা হয়েছে");
      setLoading(false);
    }
  }, [thanaId, navigate]);
  if (!thanaId) return null;

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 700,
          color: "primary.main",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <LocalHospitalIcon fontSize="large" />
        {thanaName || "থানা সদস্যদের তালিকা"}
      </Typography>

      {loading ? (
        <Grid container spacing={2}>
          {[...Array(4)].map((_, idx) => (
            <Grid item xs={12} key={idx}>
              <Skeleton variant="rounded" height={80} animation="wave" />
            </Grid>
          ))}
        </Grid>
      ) : error ? (
        <Box textAlign="center" py={4}>
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "8px 16px",
              backgroundColor: theme.palette.primary.main,
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            আবার চেষ্টা করুন
          </button>
        </Box>
      ) : people.length > 0 ? (
        <Grid container spacing={2}>
          {people.map((person, idx) => (
            <Grid item xs={12} key={person.id}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.05,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <StyledAccordion>
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        color="primary"
                        sx={{
                          transform: "rotate(0deg)",
                          transition: "transform 0.2s",
                          "&.Mui-expanded": {
                            transform: "rotate(180deg)",
                          },
                        }}
                      />
                    }
                    sx={{
                      "& .MuiAccordionSummary-content": {
                        alignItems: "flex-start",
                        gap: 1.5,
                      },
                    }}
                  >
                    <LocalHospitalIcon
                      color="primary"
                      sx={{
                        fontSize: "1.8rem",
                        opacity: 0.8,
                        flexShrink: 0,
                        mt: 0.5,
                      }}
                    />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          lineHeight: 1.2,
                          fontSize: "0.875rem",
                          mb: 0.5,
                        }}
                      >
                        {person.title}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          lineHeight: 1.3,
                          fontSize: "1.1rem",
                        }}
                      >
                        {person.name}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      background: "rgba(245, 249, 255, 0.5)",
                      borderTop: "1px solid rgba(25, 118, 210, 0.1)",
                    }}
                  >
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "1fr",
                          sm: "repeat(2, 1fr)",
                        },
                        gap: 2,
                        p: 1,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <LocalHospitalIcon
                          color="primary"
                          sx={{ fontSize: "1.5rem", opacity: 0.8 }}
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
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <PhoneIcon
                          color="primary"
                          sx={{ fontSize: "1.5rem", opacity: 0.8 }}
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
                              textDecoration: "none",
                              color: "inherit",
                              "&:hover": { color: theme.palette.primary.main },
                            }}
                          >
                            {person.phone}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          gridColumn: { xs: "1 / -1", sm: "auto" },
                        }}
                      >
                        <EmailIcon
                          color="primary"
                          sx={{ fontSize: "1.5rem", opacity: 0.8 }}
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
                              textDecoration: "none",
                              color: "inherit",
                              "&:hover": { color: theme.palette.primary.main },
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
      ) : (
        <Box textAlign="center" py={4}>
          <LocalHospitalIcon
            sx={{ fontSize: 48, color: "text.disabled", mb: 2 }}
          />
          <Typography variant="h6" color="textSecondary">
            কোনো সদস্য পাওয়া যায়নি
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PersonPage;