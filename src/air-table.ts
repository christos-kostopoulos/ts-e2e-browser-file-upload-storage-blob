const airTableToken = process.env.REACT_APP_AIRTABLE_API_KEY;
const baseId = process.env.REACT_APP_AIRTABLE_BASE_ID;
const tableId = process.env.REACT_APP_AIRTABLE_TABLE_ID;
const airtableUrl = `https://api.airtable.com/v0/${baseId}/${tableId}`;
//  api post request in airtableUrl to create a new record in the table with the data from the form 


const createRecord = async (comment: string, imageUrl: string, user_id: string) => {

    const data = {
        "records": [
            {
                "fields": {
                    "comment": comment,
                    "image": imageUrl.substring(0, imageUrl.lastIndexOf('?')),
                    "user_id": user_id,
                    "vessel": 7,
                    "project": 1
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

const getRecordsByUserId = async (user_id: string) => {
    const response = await fetch(`${airtableUrl}?filterByFormula=user_id="${user_id}"`, {
        headers: { Authorization: `Bearer ${airTableToken}` }
    });
    return response.json();
};
export { createRecord, getRecordsByUserId };