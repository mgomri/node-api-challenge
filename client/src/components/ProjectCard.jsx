import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectCard = () => {

        const [project, setProject] = useState([]);
        const [actions, setActions] = useState([]); 
        const projectStatus = (project.completed === false? 'Not completed': 'Completed');
        const { id } = useParams();
        useEffect(() => {
            axios.get(`http://localhost:8000/projects/${id}`)
                 .then(res => {
                     setProject(res.data);
                     
                 })
                 .catch(err => console.log(err));

            axios.get(`http://localhost:8000/projects/${id}/actions`)
                 .then(res =>{
                     setActions(res.data);
                     console.log(res)
                 })
                 .catch(err => console.log(err))
                
        }, []);


    return(
        <div className='project-card'>
            <span className='title is-4'>{project.name}</span>
            <div className='vertical-spacer'/>
            <p>{project.description}</p>
            <p>{projectStatus}</p>
            <div className='vertical-spacer'/>
            <span className='title is-6'>Actions</span>
                {actions.map(ac =>
                <div key={actions.id}> 
                    <p>{ac.description}</p>
                    <p>{ac.notes}</p>
                    <p>{ac.completed}</p>
                </div>
                )}
            
            
            <div className='vertical-spacer'/>
            <button className='button'>Edit</button>
            {'  '}
            <button className='button'>Delete</button>
        </div>
    )
};

export default ProjectCard;