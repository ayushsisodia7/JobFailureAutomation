function myFunction() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();   // Current sheet of Google Sheets
  var range = sheet.getRange('A1:B1000');        // Range -> A Range object, representing the cell or range of cells that were edited.
  var range = sheet.setActiveRange(range);
  range.clear();
  var row = range.getRow();     // Row of Current Sheet
  var column = range.getColumn();  // Column of Current Sheet
  var messsage,i,j,msg,error,error_date, error_time,messsages,messageDate, body, jobName, date, startTime, endTime, currentDate ;
  const secondsSinceEpoch = (date) => Math.floor(date.getTime() / 1000);
  var today = new Date();  
  const after = new Date();
  const before = new Date();
  var ch = today.getHours();
  var cm = today.getMinutes();
  var cs = today.getSeconds();
  before.setHours(ch,cm ,cs, 0);
  console.log("before");
  console.log(ch,cm,cs);
  console.log(secondsSinceEpoch(before));
  //current_time

  //console.log(ch,cm,cs);

  /*if(cm<30)
  {
    ch=ch-1;
    cm=cm+30;
  }
  else
  {
    cm=cm-30;
  }*/
  console.log("after");
  console.log(ch-2,cm,cs);
  after.setHours(ch-2,cm,cs);
  console.log(secondsSinceEpoch(after));


var fetch = "Subject:(" + '"Job Failed"' + ")" + "after:" + secondsSinceEpoch(after) + " " + "before:" + secondsSinceEpoch(before);
//var email_count = GmailApp.getInboxUnreadCount();
var querry = GmailApp.search(fetch);
console.log(querry.length);
var count=0;
var messageDate, messsages,eh,em,es;

for(j=0;j<querry.length;j++)
{
count=count+1;
messsages = querry[j].getMessages();

body = messsages[0].getPlainBody();
jobName="";
jobName = extractValue(body, "Job Name: ");
if(jobName.includes("gt_lap_rllnach1_gt_picking") || jobName.includes("ccp") || jobName.includes("zmii_bommat") || jobName.includes("ap_sc_cap_rimodac2_smi_ira") || jobName.includes("lap_rimodini_smi_irbr10") || jobName.includes("lap_rimodini_smi_irb"))
{
  continue;
}

error = "";

i=-1;
i = body.indexOf("|E        |");
if(i == -1)
{
  i = body.indexOf("|A        |");
}

error="";

if(i==-1)
{
  i=body.indexOf("|E0 |");
  if(i== -1)
  {
    i=-1;
  }
  else
  {
    i=i+3;
    while(body.charAt(i) != '\n')
    {
    error=error+body.charAt(i);
    i++;
    }
  }
    
  
}
else
{
i=i+11
while(body.charAt(i) != '\n')
{
  error=error+body.charAt(i);
  i++;
}
}

sheet.appendRow([jobName,error]);
console.log(count);
}


removeDuplicates();

/*var targetRange=sheet.getRange('A2:A1000'); 
var target_values=targetRange.getValues();
var job_name="";
for(i=sheet.getLastRow();i>0;i--)
{
  job_name=target_values[i][0];
  console.log(i);
  console.log(job_name);
  if(job_name.includes("eu") || job_name.includes("ccp"))
  {
    console.log("true");
    sheet.deleteRow(i);
  }
}*/
//console.log(messsages);


//const secondsSinceEpoch = (date) => Math.floor(date.getTime() / 1000);

//after.setHours(13, 30, 0, 0);
//before.setHours(14, 0, 0, 0);

//console.log(secondsSinceEpoch(after));
//console.log(secondsSinceEpoch(before));
}


function removeDuplicates() {
var sheet = SpreadsheetApp.getActiveSheet();
var data = sheet.getDataRange().getValues();
var newData = new Array();
for(i in data){
var row = data[i];
var duplicate = false;
for(j in newData){
  if(row.join() == newData[j].join()){
    duplicate = true;
  }
}
if(!duplicate){
  newData.push(row);
}
}
sheet.clearContents();
sheet.getRange(1, 1, newData.length, newData[0].length).setValues(newData);
}


function extractValue(body, keyword) {
  var keywordIndex = body.indexOf(keyword);
  if (keywordIndex == -1) {
    return " ";
  } else {
    var value = body.substring(keywordIndex + keyword.length).split("\n")[0];
    return value;
  }
}
