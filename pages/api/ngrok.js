export default function handler(req,res) {
  const { ngrokURL } = req.body;
  console.log('Received data:',data);
  res.status(200).json({ message: 'Data received successfully!' });
}