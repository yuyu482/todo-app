import './App.css';
import React, {useState, useEffect} from 'react';

function App(){
  const [task, setTask] = useState('');
  const [tasks,setTasks] = useState([]);

  useEffect(()=>{
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if(savedTasks){
      setTasks(savedTasks);
    }
  },[]);

  useEffect(()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks));  
  },[tasks]);

  const addTask = () => {
    if(task.trim() !== ''){
      setTasks([...tasks, {text:task, completed:false}]);
      setTask('');
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_,i) => i !== index);
    setTasks(newTasks)
  }
  
  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <h1>ToDoリスト</h1>
      <input 
        type="text"
        placeholder="タスクを追加"
        value={task}
        onChange={(e)=>setTask(e.target.value)}
      />
      <button onClick={addTask}>追加</button>
      <ul>
        {tasks.map((t, index)=>(
          <li 
            key={index}
            onClick={()=>toggleTask(index)}
            style={{
              textDecoration: t.completed ? 'line-through' : 'none'
            }}
          >{t.text}
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(index);
              }}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;