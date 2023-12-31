// Function to handle the CSV file once it is loaded
function createGlobalVariableofData(result) {
    // Places the data into a global variable which can be accessed outside of the function
    window.allGHS = result.data;
}

// Function to fetch and parse the CSV file
function readCSVFile() {
    fetch('GHSInfo.csv')
        .then(response => response.text())
        .then(csvData => {
            // Parse CSV data using PapaParse
            Papa.parse(csvData, {
                header: true, // Set to true if your CSV has a header row
                complete: createGlobalVariableofData
            });
        })
        .catch(error => console.error('Error fetching CSV file:', error));
}

function readTextFile(ghs_id) {
    // Specify the path to the server-side text file
    // Make a Fetch API request to the server
    fetch("lyrics/"+ghs_id+".txt")
        .then(response => {
            // Check if the request was successful (status code 200)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Read the response as text
            return response.text();
        })
        .then(textContent => {
            // Handle the text content as needed
            document.getElementById("ghs_lyrics").innerText = textContent;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function ghsSearch() {
    const ghs_id = "GHS " + document.getElementById("ghs_id").value

    for (let i = 0; i < allGHS.length; i++) {
        if (allGHS[i]["GHS Number"] == "GHS " + document.getElementById("ghs_id").value){
            document.getElementById("ghs_title").innerHTML = allGHS[i]["GHS Title"].replace("/",",");
        }
    }
    console.log(readTextFile(ghs_id));
}

function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Copied to clipboard');
      })
      .catch(err => {
        console.error('Unable to copy', err);
      });
  }
  
// Call the function to read the CSV file
readCSVFile();