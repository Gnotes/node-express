module.exports = {
  default:function(req, res){
    res
    .status(404)
    .send({
        "code":404,
        "message":"接口不存在！"
    });
  }
}