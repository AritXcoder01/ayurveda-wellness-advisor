// Client email dispatcher connecting to backend email server & local directory cache

export const saveLocalDirectoryLog = (email, name, otp, purpose, isRealInboxSent = false, previewUrl = null) => {
  try {
    const existing = JSON.parse(localStorage.getItem('ayurveda_email_directory') || '[]');
    const newLog = {
      id: 'dir_' + Date.now(),
      email,
      name: name || 'User',
      otp,
      purpose: purpose || 'Verification',
      timestamp: new Date().toISOString(),
      status: isRealInboxSent ? 'SENT_GMAIL_SMTP' : 'DISPATCHED_DIRECTORY',
      isRealInboxSent,
      previewUrl
    };
    existing.unshift(newLog);
    // Keep last 30 logs
    const trimmed = existing.slice(0, 30);
    localStorage.setItem('ayurveda_email_directory', JSON.stringify(trimmed));
    return trimmed;
  } catch (e) {
    console.error('Error saving local directory log:', e);
    return [];
  }
};

export const fetchEmailDirectory = async () => {
  let localLogs = [];
  try {
    localLogs = JSON.parse(localStorage.getItem('ayurveda_email_directory') || '[]');
  } catch (e) {}

  try {
    // Try local node server port 5000 or Vercel serverless api
    const apiEndpoint = window.location.hostname === 'localhost' 
      ? 'http://localhost:5000/api/email-directory' 
      : '/api/email-directory';

    const response = await fetch(apiEndpoint);
    const data = await response.json();
    if (data.success && Array.isArray(data.directory) && data.directory.length > 0) {
      // Merge server directory with local directory logs without duplicates
      const mergedMap = new Map();
      [...data.directory, ...localLogs].forEach(item => {
        if (item.otp && item.email) {
          mergedMap.set(`${item.email}_${item.otp}`, item);
        }
      });
      return Array.from(mergedMap.values());
    }
  } catch (e) {
    // Graceful fallback to local logs if backend is unreachable
  }

  return localLogs;
};

export const sendOtpEmail = async (email, name, otp, purpose = 'Verification') => {
  // Always save to local directory immediately so user never sees Email Directory (0)
  saveLocalDirectoryLog(email, name, otp, purpose);

  const apiEndpoint = window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api/send-otp'
    : '/api/send-otp';

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, name, otp, purpose })
    });

    const data = await response.json();
    if (data.success) {
      saveLocalDirectoryLog(email, name, otp, purpose, data.isRealInboxSent, data.previewUrl);
    }
    return data;
  } catch (error) {
    console.warn('[EMAIL SERVICE WARNING] Backend mail server endpoint unreachable. Using local directory code.', error);
    return {
      success: true,
      isFallback: true,
      otp,
      message: `Code generated: ${otp} (Directory Dispatched)`,
      error: 'Backend email server offline. Code logged to Directory.'
    };
  }
};
