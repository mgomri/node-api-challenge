import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectCard = () => {

        const [project, setProject] = useState([]);
        const projectStatus = (project.completed === false? 'Not completed': 'Completed');
        const { id } = useParams();
        useEffect(() => {
            axios.get(`http://localhost:8000/projects/${id}`)
                 .then(res => {
                     setProject(res.data);
                     console.log(res.data);
                 })
                 .catch(err => console.log(err));
        }, []);


    return(
        <div className='project-card'>
            <h4>{project.name}</h4>
            <p>{project.description}</p>
            <p>{projectStatus}</p>
        </div>
    )
};

export default ProjectCard;