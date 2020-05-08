import React from 'react';
import{ Link } from 'react-router-dom';

const Projects = ({ projects }) => {
     
    

  

    

    return(
        <div className='projects'>
            {projects.map(pr =>
            <Link to={`/projects/${pr.id}`} key={pr.id} className='project-name' >

                        <h4 className='title'>{pr.name}</h4>  
                    
            </Link>
            )}
    </div>
    );
}

export default Projects;