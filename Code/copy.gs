function copyAndClearSheet(sheet) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  var range = sheet.getRange("A2:B100");
  range.clear();
  // Replace the IDs below with the IDs of the source and target spreadsheets
  var sourceSpreadsheetId = "1dhxPwlI6vFl4_pz3KWrHkNXVxCnm8-zo6NYFzI-0sqY";
  var targetSpreadsheetId = "1lptn1JVwNGxHiYhZiuBGNXaZ0ph4i7YjFsdxxddE4QU";
  
  // Replace the sheet names below with the names of the source and target sheets
  var sourceSheetName = "Sheet1";
  var targetSheetName = "Target_Sheet1";
  
  // Get the source and target sheets
  var sourceSpreadsheet = SpreadsheetApp.openById(sourceSpreadsheetId);
  var sourceSheet = sourceSpreadsheet.getSheetByName(sourceSheetName);
  var targetSpreadsheet = SpreadsheetApp.openById(targetSpreadsheetId);
  var targetSheet = targetSpreadsheet.getSheetByName(targetSheetName);
  
  // Check that the source and target sheets were found
  if (sourceSheet == null) {
    Logger.log("Source sheet not found: " + sourceSheetName);
    return;
  }
  if (targetSheet == null) {
    Logger.log("Target sheet not found: " + targetSheetName);
    return;
  }
  
  // Get the data from the source sheet
  var data = sourceSheet.getDataRange().getDisplayValues();
  
  // Copy the data to the target sheet
  //var range = sheet.getRange('A2:B100');
  //range.activate();
  console.log(data);
  targetSheet.getRange(2,1,data.length, data[0].length ).setValues(data);
  // Clear the data from the source sheet
  //sourceSheet.clearContents();
}
