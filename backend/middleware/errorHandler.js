const errorHandler = (error, req, res, next) => {
  const status = res.statusCode == 200 ? 500 : res.statusCode;
  res.statusCode = status;
  res.json({
    message: error.message,
    stack: process.env.NODE_MODE == "development" ? error.stack : [],
  });
};

export default errorHandler;
