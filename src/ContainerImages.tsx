import useAuthState from "./hooks/useAuth";
import { auth } from "./firebase";
import { getRecordsByUserId } from "./air-table";
import { useEffect, useState } from "react";

const DisplayImagesFromContainer = ({ blobList }: any) => {
  const [groupedRecords, setGroupedRecords] = useState<any[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    getList();
  }, [])

  const getList = async () => {
    const { records } = await getRecordsByUserId(user?.uid || '');

    // Group the records by the "comment" field
    const groupedRecords = records.reduce((groups: any, record: any) => {
      const comment = record.fields.comment;
      if (groups[comment]) {
        groups[comment].push(record);
      } else {
        groups[comment] = [record];
      }
      return groups;
    }, {});

    setGroupedRecords(groupedRecords);
  }




  return (
    <div className="container">
      <h2 style={{ color: '#2580e8', textAlign: 'center', paddingBottom: 10, borderBottom: '2px solid #2580e866' }}>Image gallery</h2>
      {groupedRecords && Object.keys(groupedRecords).map((comment: any, index: number) => {

        return <div key={index}>
          <h2 style={{ color: '#555' }}>{comment}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {groupedRecords[comment].map((record: any) => {
              return <img key={record?.id} style={{ width: 200, height: 200, marginRight: 10, marginBottom: 10, objectFit: 'contain', }} src={record.fields.image} />
            })}

          </div>
         
        </div>
      })}

    </div>
  );
}

export default DisplayImagesFromContainer;