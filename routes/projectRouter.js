const express = require('express');
const router = express.Router();
const projects = require('../data/helpers/projectModel');
const actions = require('../data/helpers/actionModel');


//Get Projects
router.get('/', (req, res) => {
    projects
    .get(req.params.id)
    .then(pr => {
        res.status(200).json(pr);
    })
    .catch(err => {
        res.status(500).json('unable to retrieve the projects information')
    })
});

//Get Project By Id
router.get('/:id', validateProjectId, (req, res) => {
    projects.get(req.params.id)
         .then(pr => res.status(200).json(pr))
        .catch(err => {
          res.status(500).json('the project info could not be retrieved')
        });
  });


//Add a New Proj
router.post('/', validateProject, (req, res) => {
    projects
    .insert(req.body)
    .then(us => {
      res.status(201).json(us);
    })
    .catch(err => {
      res.status(500).json('An error occured while saving the user')
    })
  });

  //Update Project
router.put('/:id', validateProjectId, validateProject, (req, res) => {
    projects
      .update(req.params.id, req.body)
      .then(pr => {
        res.status(200).json(pr)
      })
      .catch(res =>{
          res.status(500).json('The project info could not be changed')
      })
  });


  //Delete Project
  router.delete('/:id', validateProjectId, (req, res) => {
    projects
    .remove(req.params.id)
    .then(pr => {
      res.status(200).json(pr);
    })
    .catch(err => {
      res.status(500)
        .json('An error occured while removing that project')
    });
  });


//Get Project's Actions
router.get('/:id/actions', validateProjectId, (req, res) => {
    projects
    .getProjectActions(req.params.id)
    .then(pr => {
      if(pr){res.status(200).json(pr);}
      else{res.status(404).json('this user has no posts')}
    })
    .catch(err => {
      res.status(500).json('Unable to retrieve actions');
    });
  });

//Add a New Action to A Project
router.post('/:id/actions', validateProjectId, validateAction, (req, res) => {
  let newAction = {description: req.body.description, notes: req.body.notes, project_id: req.params.id}
  
  projects.get(req.params.id)
  .then(pr => {
    actions.insert(newAction)
    .then(action => res.status(201).json('action added successfully'))
    .catch(err => console.log(err));
  })
  .catch(err => {
    res.status(500).json('An error occured while trying to save the new post');
  })

});

  //Middleware
function validateProjectId(req, res, next) {
    projects.get(req.params.id)
    .then(pr => {
      if(pr){req.post = pr;}
      else{res.status(400).json('MiddleWare: Invalid post id');}
    });  
  next();
}
  
function validateProject(req, res, next) {
    if(!req.body){res.status(400).json('MiddleWare: Missing project data')}
    else if(!req.body.name || !req.body.description)
    {res.status(400).json('MiddleWare: Missing required information fields')};
    next();
  };

function validateAction(req, res, next) {
  if(!req.body){res.status(400).json('missing action data')}
  else if(!req.body.project_id || !req.body.description || !req.body.notes)
  {res.status(400).json('Middleware: Required information fields are missing')};
  next();
}


module.exports = router;