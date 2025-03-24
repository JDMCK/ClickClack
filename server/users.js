export async function profile(req, res) {
  const response = {
    result: 0, // bad if 1, gud if 0
    data: {
      role: '',
      userid: ''
    },
    message: '',
    error: '',
    received: req.body
  };

  response.data.role = req.role;
  response.data.userid = req.userid;
  // console.log(req.userid);
  // console.log(req.role);

  res.json(response);
}