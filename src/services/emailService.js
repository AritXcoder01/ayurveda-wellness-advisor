// Client email dispatcher connecting to local backend email directory server
export const sendOtpEmail = async (email, name, otp, purpose = 'Verification') => {
  try {
    const response = await fetch('http://localhost:5000/api/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, name, otp, purpose })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('[EMAIL SERVICE WARNING] Backend mail server unreachable on http://localhost:5000.', error);
    return {
      success: true,
      isFallback: true,
      otp,
      message: `Code generated: ${otp} (Local Directory Backup)`,
      error: 'Backend email server offline. Using local directory code.'
    };
  }
};

export const fetchEmailDirectory = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/email-directory');
    const data = await response.json();
    return data.directory || [];
  } catch (e) {
    return [];
  }
};
