module.exports = async (req, res, next) => {
  try {
     let data = await global.cache.get('chatrooms');
     if(data){
        res.json(data);
     }else{
        next();
     }
  } catch (err) {
    next();
  }
};