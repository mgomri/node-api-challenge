import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Project from './Project';


const Projects = () => {
     
    const [projects, setProjects] = useState([]);

    const fetchProjects = () => {
        axios.get('http://localhost:8000/projects')
             .then(res => {
                 setProjects(res.data);
                
             })
             .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return(
        <div className='projects'>
            <h1 className='title'>Welcome to React App</h1>
            {projects.map(pr => <Project key={pr.id} project={pr} /> )}
        </div>
    );
}

export default Projects;