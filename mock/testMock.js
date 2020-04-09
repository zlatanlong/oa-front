// 还要去dva-quickstart/.roadhogrc.mock.js注册
module.export={
  "Get /api/testMock": (req,res) => {
    console.log(req)
    res.send({
      name: 'immock',
      code: '200'
    })
  }
}