
const UNKNOWN_ERROR = {
  message: "Unknown error",
  errorCode: 9999,
};

exports.statusPage = async (req, res) => {
  let result = UNKNOWN_ERROR;
  const { id } = req.params;

  try {
    const response = await fetch("/heartbeat", {});
    console.log(response);

    if (response.ok) {
      const responseJson = await response.json();
      result = {
        message: "Success",
        errorCode: 0,
        response: responseJson,
      };
    }
  } catch (error) {
    console.error("Error:", error);

    res.status(500);
    result.message = `Error ${id}`;
    result.errorCode = 1002;
  }

  res.formatView(result);
};

exports.heartbeat = async (req, res) => {
  let result = UNKNOWN_ERROR;

  try {
    const response = await fetch("", {});
    console.log(response);

    if (response.ok) {
      const responseJson = await response.json();
      result = {
        message: "Success",
        errorCode: 0,
        response: responseJson,
      };
    }
  } catch (error) {
    console.error("DB error", error);
    result.message = `Database error ${error}`;
    result.errorCode = 1021;
    res.status(500);
  }

  res.formatView(result);
};