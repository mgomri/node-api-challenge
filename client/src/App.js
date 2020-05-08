import React from 'react';
import Projects from './components/Projects';
import { Route } from 'react-router-dom';
import ProjectCard from './components/ProjectCard';


function App() {
  return (
    <div className="App">
     
     <Route exact path='/' component={Projects} />
     <Route path='/projects/:id' component={ProjectCard} />
    </div>
  );
}

export default App;
