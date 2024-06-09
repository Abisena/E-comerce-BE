export const successResponse = (res, message, data) => {
  res.status(200).json({
    status: "success",
    message,
    data,
  });
};

export const errorResponse = (res, message, error) => {
  res.status(500).json({
    status: "error",
    message,
    error,
  });
};
