const axios = require("axios");

const auth = {
  username: "bigvu",
  password: "interview",
};

exports.getCourseList = async (req, res) => {
  try {
    const response = await axios.get(
      "https://interviews.bigvu.tv/course/list",
      { auth }
    );
    console.log(response.data.result)
    
    res.status(200).json({
      status: "success",
      data: {
        courses: response.data.result,
      },
    });
  } catch (error) {
    res
      .status(error.response.status || 400)
      .json({ message: "Request Failed" });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const response = await axios.get(
      `https://interviews.bigvu.tv/course/${req.params.id}`,
      { auth }
    );

    res.status(200).json({
      status: "success",
      data: {
        courses: response.data,
      },
    });
  } catch (error) {
    res
      .status(error.response.status || 400)
      .json({ message: "Request Failed" });
  }
};

