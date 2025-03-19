export async function profile(req, res) {
  const response = {
    result: 0, // bad if 1, gud if 0
    data: {
      isAdmin: false,
      userid: ''
    },
    message: '',
    error: '',
    received: req.body
  };

  // response.data.isAdmin = req.isAdmin;
  // response.data.userid = req.userid;
  // console.log(req.userid);
  // console.log(req.isAdmin);

  res.json(response);
}