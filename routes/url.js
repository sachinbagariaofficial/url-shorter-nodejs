const express = require("express");
const Router = express.Router();
const shortid = require("shortid");
const URL = require("../models/urlSchema");

const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

Router.post("/", async (req, res) => {
  const data = req.body;
  console.log("data", data);
  if (!data?.url) {
    return res.status(400).json({
      message: "Please enter the URL",
      statusCode: 400,
    });
  }
  if (!urlRegex.test(data.url)) {
    return res.status(400).json({
      message: "Please enter a valid URL",
      statusCode: 400,
    });
  }

  const urlID = shortid();

  await URL.create({
    shortId: urlID,
    url: data?.url,
  });

  return res.status(200).json({
    urlID: urlID,
    statusCode: 200,
  });
});
Router.get("/:urlId", async (req, res) => {
  const { urlId } = req.params;
  console.log("data", urlId);
  if (!urlId) {
    return res.status(400).json({
      message: "Please enter the url-ID",
      statusCode: 400,
    });
  }

  const urlData = await URL.findOneAndUpdate(
    {
      shortId: urlId,
    },
    {
      $push: {
        urlTimestamp: {
          timestamps: Date.now(),
        },
      },
    }
  );

  if (!urlData.url) {
    return res.status(400).json({
      message: "Please enter correct ID",
      statusCode: 400,
    });
  }

  return res.redirect(urlData.url);
});
module.exports = Router;
