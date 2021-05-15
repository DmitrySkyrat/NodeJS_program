const db = require('./database/sequelize');

db.sequelize.sync().then(result=>{
  console.log(result);
})
.catch(err=> console.log(err));
