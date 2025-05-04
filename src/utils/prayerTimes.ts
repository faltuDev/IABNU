// This is a sample data function that would normally fetch from an API
// In a real app, you would use a proper prayer times calculation library

interface PrayerTime {
  name: string;
  time: string;
  current: boolean;
}

export const getSamplePrayerTimes = (): PrayerTime[] => {
  // Bengali digits
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  
  // Convert time to Bengali digits
  const convertToBengali = (time: string): string => {
    return time
      .split('')
      .map(char => {
        if (char >= '0' && char <= '9') {
          return bengaliDigits[parseInt(char)];
        }
        return char;
      })
      .join('');
  };
  
  // Get current hour to determine current prayer
  const currentHour = new Date().getHours();
  
  // Sample prayer times
  const prayers: PrayerTime[] = [
    { 
      name: 'ফজর', 
      time: convertToBengali('4:30'), 
      current: currentHour >= 4 && currentHour < 6 
    },
    { 
      name: 'সূর্যোদয়', 
      time: convertToBengali('5:54'), 
      current: false 
    },
    { 
      name: 'যোহর', 
      time: convertToBengali('12:10'), 
      current: currentHour >= 12 && currentHour < 15 
    },
    { 
      name: 'আসর', 
      time: convertToBengali('3:45'), 
      current: currentHour >= 15 && currentHour < 18 
    },
    { 
      name: 'মাগরিব', 
      time: convertToBengali('6:15'), 
      current: currentHour >= 18 && currentHour < 19 
    },
    { 
      name: 'ইশা', 
      time: convertToBengali('7:30'), 
      current: currentHour >= 19 || currentHour < 4 
    }
  ];
  
  return prayers;
};