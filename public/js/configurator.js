const checkSumRange = "M28";
const matchDataRanges = [
  "C3:C6", //Metadata
  "C8:C10", //Cast
  "F4:G6", //Blue Team
  "F8:G10", //Orange Team
];
const teamDataRanges = [
  "I5:N5", //Blue Team
  "I9:N9", //Orange Team
];
const matchHistoryRanges = ["B13:E26"];
const settingsRanges = [
  "G14:G15", //Szene
  "G20:G21", //Updaterate
  "G23:G24", //Emergency
];

let intervalID;
let prev = "---";
let interval = 5000;

const getEnv = async () => {
  const res = await fetch('http://localhost:3000/env');
  const json = res.json();

  return json;
}

(async () => {
  const config = await getEnv();
  const key = config.gapi;
  const spreadsheetId = config.sid;

  gapi.load("client", () => {
    // now we can use gapi.client

    // Set API KEY
    gapi.client.setApiKey(key);

    gapi.client.load("sheets", "v4", () => {
      startInterval(interval, spreadsheetId);
    });
  });
})();



async function readMultipleRanges(ranges, sheetID, majDim) {
  let request = await gapi.client.sheets.spreadsheets.values.batchGet({
    spreadsheetId: sheetID,
    ranges: ranges,
    majorDimension: majDim,
  });

  return request.result.valueRanges;
}

async function readRange(range, sheetID, majDim) {
  let request = await gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: sheetID,
    range: range,
    majorDimension: majDim,
  });

  return request.result.values;
}

async function collectData(spreadsheetId) {
  let matchData = await this.readMultipleRanges(
    matchDataRanges,
    spreadsheetId,
    "COLUMNS"
  );
  let teamData = await this.readMultipleRanges(
    matchHistoryRanges,
    spreadsheetId,
    "ROWS"
  );
  let matchHistory = await this.readMultipleRanges(
    teamDataRanges,
    spreadsheetId,
    "ROWS"
  );

  $(".teamname#blue").text(
    matchData[2].values[0][0] !== "---" ? matchData[2].values[0][0] : "BLUE"
  );
  $(".teamname#orange").text(
    matchData[3].values[0][0] !== "---" ? matchData[3].values[0][0] : "ORANGE"
  );

  $(".matchinfo#title").text(matchData[0].values[0][2]);
  $(".matchinfo#format").text(matchData[0].values[0][3]);
  $(".matchinfo#week").text(matchData[0].values[0][1]);

  $(".series#blue").text(matchData[2].values[1][1]);
  $(".series#orange").text(matchData[3].values[1][1]);
}

function startInterval(_interval, spreadsheetId) {
  intervalID = setInterval(async () => {
    let checkSum = await readRange(checkSumRange, spreadsheetId, "COLUMNS");

    if (checkSum[0][0] !== prev) {
      let settings = await readMultipleRanges(
        settingsRanges,
        spreadsheetId,
        "COLUMNS"
      );

      collectData(spreadsheetId);

      if (interval !== settings[1].values[0][1] * 1000) {
        interval = settings[1].values[0][1] * 1000;
        clearInterval(intervalID);
        startInterval(settings[1].values[0][1] * 1000, spreadsheetId);
      }

      if (settings[0].values[0][1].toLowerCase() === "ingame") {
        $(".overlay#ingame").css("display", "block");
        $(".overlay#moderation").css("display", "none");
        $(".overlay#postgame").css("display", "none");
      }

      if (settings[0].values[0][1].toLowerCase() === "moderation") {
        $(".overlay#moderation").css("display", "block");
        $(".overlay#ingame").css("display", "none");
        $(".overlay#postgame").css("display", "none");
      }

      if (settings[0].values[0][1].toLowerCase() === "postgame") {
        $(".overlay#postgame").css("display", "block");
        $(".overlay#moderation").css("display", "none");
        $(".overlay#ingame").css("display", "none");
      }
    }
    prev = checkSum[0][0];
  }, _interval);
}