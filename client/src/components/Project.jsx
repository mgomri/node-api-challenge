import React from 'react';

const Project = ({ project }) => {
    const projectStatus = (project.completed === false? 'Not completed': 'Completed');
    return(
        <div className='project'>
            <h4>{project.name}</h4>
            <p>{project.description}</p>
            <p>{projectStatus}</p>
            
        </div>
    );
}
export default Project;

