import React from 'react';
import { Link } from 'react-router-dom';

const Project = ({ project }) => {
    
    return(
        <Link to={`/projects/${project.id}`} className='link'>
        <div className='project'>
            <h4>{project.name}</h4>
            
        </div>
        </Link>
    );
}
export default Project;

