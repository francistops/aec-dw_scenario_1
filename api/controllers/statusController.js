
const UNKNOWN_ERROR = {
  message: "Unknown error",
  errorCode: 9999,
};

export function heartbeat(req, res) {
  let result = UNKNOWN_ERROR;

  try {
      result = {
        message: "Success",
        errorCode: 0,
      };
    } catch (error) {
    console.error("DB error", error);
    result.message = `Database error ${error}`;
    result.errorCode = 1021;
    res.status(500);
  }

  res.formatView(result);
}