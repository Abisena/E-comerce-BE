export const handleError = (err, res) => {
  console.error(err);
  res.status(500).json({ msg: "Internal Server Error", error: err.message });
};
