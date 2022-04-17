const Express = require('express')
const Fs = require('fs')
const Server = Express()

Server.post('/KillScript', function (Req, Res) {
  const Authorization1 = "Key1"
  const Authorization2 = "Key2"

  if(Req.headers.auth2){
    if(Req.headers.auth2 == Authorization2) {
      if(Req.query.auth1) {
        if(Req.query.auth1 == Authorization1) {
          if(Req.query.time) {
            Fs.writeFile('Status.txt', "True", (err) => {
              if (err) throw err;
            })

            Res.send("Worked!")

            setTimeout(function(){
              Fs.writeFile('Status.txt', "False", (err) => {
                if (err) throw err;
              })
            }, parseInt(`${Req.query.time}000`))
          } else {
            Fs.writeFile('Status.txt', "True", (err) => {
              if (err) throw err;
            })

            Res.send("Worked!")

            setTimeout(function(){
              Fs.writeFile('Status.txt', "False", (err) => {
                if (err) throw err;
              })
            }, 5000)
          }
        } else {
          Res.send("Not Whitelisted")
        }
      } else {
        Res.send("Couldnt GET Check 1")
      }
    } else {
      Res.send("Not Whitelisted")
    }
  } else {
    Res.send("Couldnt GET Check 2")
  }
})


Server.get('/GetStatus', function (Req, Res) {
  Fs.readFile("Status.txt", function (err, data) {
    Res.send(data)
  })
})

Server.listen(2000)
