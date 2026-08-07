export default function handler(req, res) {
  return res.status(200).json({
    success: true,
    message: 'Email Directory API active',
    directory: []
  });
}
