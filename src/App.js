import './App.css';
import Styles from './styes/style.module.css';
import Row from './components/Row';
import {useState, useCallback} from 'react';
import { nanoid } from 'nanoid'; //for uniq key


function App() {
  const [dataState, setData] = useState([]);
  const [filterBy, setFilterBy] = useState('all');
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');


  const manageFilter = useCallback((type) => {
    setFilterBy(type)
  },[]);
  return (
    <div className={Styles.container}>
      <h1>Welcome</h1>
      <h3>{!dataState.length ? 'Your List of Todo is empty create one play with it. If you find some bugs feel to free to inform Ando about it. Thank you for attention.' : 'Great job continue play with it.'}</h3>

      <div className={Styles.tableContainer}>

          <table className={Styles.rowsContainer}>
              <tr>
                <th>name</th>
                <th>description</th>
                <th>edit and delete buttons</th>
                <th>completed</th>
              </tr>

              {dataState.map((elem, index) => {

                let result =  <tr key={nanoid()}>
                    <Row
                    index={index}
                    data={dataState}
                    setData={setData}
                    />
                </tr>;

                if(filterBy === 'all') {
                  return result
                } else if(filterBy === 'completed') {
                  return dataState[index].completed ? result : null
                } else if(filterBy === 'uncompleted') {
                  return dataState[index].completed ? null : result
                }
              })}
          </table>

          <div className={Styles.btnsContainer}>
            <button onClick={() => manageFilter('uncompleted')}>show only active</button>
            <button onClick={() => manageFilter('completed')}>show only completed</button>
            <button onClick={() => manageFilter('all')}>show all</button>
          </div>
              <br/>
          <div>
              <h2>name</h2>
              <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
              <h2>description</h2>
              <input value={newDescription} onChange={(e) => setNewDescription(e.target.value)}/>
              <br/>

              {/* button add todo bellow */}
              <button onClick={() => {
                if(newName === '') {
                  return
                }
                let copyData = [...dataState];
                copyData.push({name: newName, description: newDescription, completed: false, edit: false});
                setData(copyData);
                setNewName('');
                setNewDescription('')
              }}>
                Add
              </button>
          </div>
      </div>

    </div>
  );
}

export default App;
