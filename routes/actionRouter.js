const express = require('express');
const router = express.Router();
const actions = require('../data/helpers/actionModel');

//Get Actions
router.get('/', (req, res) => {
    actions
    .get(req.params.id)
    .then(pr => {
        res.status(200).json(pr);
    })
    .catch(err => {
        res.status(500).json('unable to retrieve the actions information')
    })
})


//Get Action By ID
router.get('/:id', validateActionId, (req, res) => {
    actions
    .get(req.params.id)
    .then(ac => res.status(200).json(ac))
    .catch(err => res.status(500).json('that action\'s info couldn\'t be retrieved'));
  });
  
  
 
  //Update A Action
  router.put('/:id', validateActionId, validateAction, (req, res) => {
    actions
    .update(req.params.id, req.body)
      .then(ac => {
        res.status(200).json(ac)
      })
      .catch(res =>{
          res.status(500).json('The action info could not be changed')
      })
  });
  

  //Delete An Action
  router.delete('/:id', validateActionId, (req, res) => {
    actions
    .remove(req.params.id)
    .then(ac => {
      res.status(200).json(ac);
    })
    .catch(err => {
      res.status(500)
        .json('An error occured while removing that action')
    });
  });


  // Custom Middleware
  function validateActionId(req, res, next) {
    actions.get(req.params.id)
    .then(ac => {
      if(ac){req.action = ac;}
      else{res.status(400).json('MiddleWare: Invalid action id');}
    });  
  next();
  }
  
  function validateAction(req, res, next) {
    if(!req.body){res.status(400).json('missing action data')}
    else if(!req.body.project_id || !req.body.description || !req.body.notes)
    {res.status(400).json('Middleware: Required information fields are missing')};
    next();
  }
  
  
module.exports = router;