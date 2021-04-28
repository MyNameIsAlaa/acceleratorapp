const express = require("express");
const { check, validationResult } = require('express-validator');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = 8080;
const HOST = '0.0.0.0'
const utils = require('./utils');
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.status(200).json('Welcome!')
});


/**
 * @api {POST} / 
 * @apiVersion 0.1.0
 * @apiName List Directory
 *
 * @apiParam (path) {String} relative path to directoy in serve 
 * @apiSuccess {JSON} files and folders in directory
 *
 */
app.post('/', [
    check('path').notEmpty()
    ], (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      }
    
    
    
    const resfiles = [];
    const pathdir = path.resolve(__dirname, req.body.path);
   fs.readdir(pathdir,async (err, files) => {
    if (err) throw err;
    
      for (let file of files) {
          const stats = await fs.statSync(path.resolve(pathdir, file))
          resfiles.push({
              Title: file,
              isFolder: stats.isDirectory(),
              isFile: stats.isFile(),
              size: utils.bytesToSize(stats['size']),
              mode: stats["mode"],
          })
      }
  
    res.status(200).json(resfiles)
  }
);
    

    }
)


app.all('*', (req, res) => {
    res.status(404).json({"error": "requested endoint not found!"})
})



app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);