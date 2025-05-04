import { useState } from 'react';
import { motion } from 'framer-motion';
import { TextField, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import { LocationOn, Category, Description } from '@mui/icons-material';
import { db } from '../firebase.ts';
import { ref, push } from 'firebase/database';
import { Storage } from '@capacitor/storage';

const ReportForm = () => {
  const [branch, setBranch] = useState('');
  const [district, setDistrict] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [filteredWordsCount, setFilteredWordsCount] = useState(0);

  // Enhanced text filter with banned words list
  const filterText = (text: string) => {
    const bannedWords = ['অপশব্দ', 'অশ্লীল', 'গালি']; // Add more banned words
    let filteredCount = 0;
    
    const filteredText = text
      .replace(/[^a-zA-Z0-9\u0980-\u09FF\s]/g, '')
      .split(' ')
      .map(word => {
        if (bannedWords.includes(word.toLowerCase())) {
          filteredCount++;
          return '*'.repeat(word.length);
        }
        return word;
      }).join(' ');

    setFilteredWordsCount(filteredCount);
    return filteredText;
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredText = filterText(e.target.value);
    setDescription(filteredText);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const { value: userId } = await Storage.get({ key: 'userId' });
      
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const timestamp = Date.now();
      const date = new Date(timestamp);
      const reportData = {
        branch,
        district,
        type,
        description,
        timestamp,
        dd: date.getDate(),
        mm: date.getMonth() + 1,
        yy: date.getFullYear(),
        userId
      };

      const reportsRef = ref(db, 'reports');
      await push(reportsRef, reportData);
      
      setBranch('');
      setDistrict('');
      setType('');
      setDescription('');
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit report');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Branch Input */}
          <TextField
            fullWidth
            label="শাখা"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            InputProps={{
              startAdornment: <LocationOn className="mr-2 text-gray-500" />
            }}
            required
          />

          {/* District Input */}
          <TextField
            fullWidth
            label="জেলা"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            InputProps={{
              startAdornment: <LocationOn className="mr-2 text-gray-500" />
            }}
            required
          />

          {/* Type Input */}
          <TextField
            fullWidth
            label="ধরন"
            value={type}
            onChange={(e) => setType(e.target.value)}
            InputProps={{
              startAdornment: <Category className="mr-2 text-gray-500" />
            }}
            required
          />

          {/* Description Textarea */}
          <div className="relative">
            <TextField
              fullWidth
              label="প্রতিবেদনের বিবরণ"
              multiline
              rows={4}
              value={description}
              onChange={handleDescriptionChange}
              InputProps={{
                startAdornment: <Description className="mr-2 text-gray-500" />
              }}
              variant="outlined"
              required
            />
            {filteredWordsCount > 0 && (
              <div className="absolute bottom-2 right-2 text-sm text-red-500">
                Filtered {filteredWordsCount} words
              </div>
            )}
          </div>

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="bg-blue-600 hover:bg-blue-700 h-12"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={24} className="text-white" />
              ) : (
                'Submit Report'
              )}
            </Button>
          </motion.div>
        </div>
      </form>

      {/* Success Message */}
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" className="w-full">
          Report submitted successfully!
        </Alert>
      </Snackbar>

      {/* Error Message */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert severity="error" className="w-full">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ReportForm;