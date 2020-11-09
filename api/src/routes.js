const _ = require('lodash');

function validateParameter (req, res, next) {
  // simple request body validation

  const { code } = req.body;

  let error;

  if (!code) {
    return res.status(400).send({
      success: false,
      message: 'Missing Input: Code'
    });
  }

  if (!_.isNumber(Number(code))) {
    return res.status(400).send({
      success: false,
      message: 'Invalid Input: Code - Should be numeric'
    });
  }

  if (String(code).substring(String(code).length - 1) === String(7)) {
    return res.status(400).send({
      success: false,
      message: 'Invalid Input: Code'
    });
  }

  next();
}


function validate (req, res) {
  req.log.info('code is Valid')
  res.status(200).send({
    success: true
  });
}

module.exports = (app) => {
  app.post('/validate',
    validateParameter,
    validate
  );
};
