import React, { useState, useEffect } from 'react';
import Projects from './components/Projects';
import { Route } from 'react-router-dom';
import Project from './components/Project';
import axios from 'axios';


function App() {

  const [projects, setProjects] = useState([]);

  const fetchProjects = () => {
    axios.get('http://localhost:8000/projects')
         .then(res => {
             setProjects(res.data);
             console.log(res.data);
         })
         .catch(err => console.log(err));
};

useEffect(() => {
  fetchProjects();
}, []);

  return (
    <div className="App">
     <h1 className='title'>Welcome to react App</h1>
     <Projects projects={projects}/>
     <Route path='/projects/:id'>
       <Project projects={projects} />
     </Route> 
    </div>
  );
}

export default App;
