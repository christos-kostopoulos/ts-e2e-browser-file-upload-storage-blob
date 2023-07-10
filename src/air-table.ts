const airTableToken = process.env.REACT_APP_AIRTABLE_API_KEY;
const baseId = process.env.REACT_APP_AIRTABLE_BASE_ID;
const tableId = process.env.REACT_APP_AIRTABLE_TABLE_ID;
const airtableUrl = `https://api.airtable.com/v0/${baseId}/${tableId}`;
//  api post request in airtableUrl to create a new record in the table with the data from the form 


const createRecord = async (comment: string, imageUrl: string) => {

    const data = {
        "records": [
            {
                "fields": {
                    "comment": comment,
                    "image": imageUrl.substring(0, imageUrl.lastIndexOf('?'))
                }
            }
        ]
    };
    const response = await fetch(airtableUrl, {
        method: "POST",
        headers: { Authorization: `Bearer ${airTableToken}`, "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return response.json();


};


export default createRecord;