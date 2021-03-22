import {useState} from 'react';
export default function Row({index, data, setData}){
  const [editName, setEditName] = useState(data[index].name);
  const [editDescription, setEditDescription] = useState(data[index].description);
  return (
    <>
      <td>
        {data[index].edit ? <input onChange={(e) => {
          setEditName(e.target.value);
        }} value={editName}/>: data[index].name}
      </td>

      <td>
        {data[index].edit ? <input onChange={(e) => {
          setEditDescription(e.target.value);
        }}value={editDescription}/>: data[index].description}
      </td>
      <td>

        <button onClick={() => {
            let copyData = [...data];
          if(!data[index].edit) {
            copyData[index].edit = !copyData[index].edit;
            setData(copyData);
          } else {
            copyData[index].name = editName;
            copyData[index].description = editDescription
            copyData[index].edit = !copyData[index].edit;
            setData(copyData)
          }
        }}>{data[index].edit ? 'save' : 'edit'}</button>
        <button onClick={() => {
          let copyData = [...data];
          copyData.splice(index,1);
          setData(copyData)
        }}>delete</button>
      </td>

      <td>
        <input type='checkbox' checked={data[index].completed} onChange={(e) => {
          let copyData = [...data];
          copyData[index].completed = e.target.checked;
          setData(copyData);
        }}/>
      </td>
    </>
  )
}