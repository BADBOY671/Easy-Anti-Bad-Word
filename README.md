Hi 👋  <br>

Easy Anti Bad Word Pkg<br><br>

How To Install It In Your Project:?<br><br>
`
const word = require('easy-anti-bad-word')
`
<br>
<br>
Basic Settings 🧢

<br><br>

```

const word = require('easy-anti-bad-word')
const antiword = new word({


prefix: "+",
client: client,
permissions: "MANAGE_GUILD",
addcmd: "add",
remove: "remove",
list: "list",
remove_all: "remove-all"
})

    client.on('message', message => {
        antiword.onMessage(message)
    })
client.on('message', message => {
  let data = db.get(`word_${message.guild.id}`)
  if(data) {
    let word = data.find(x => x.word === message.content.toLowerCase())
    if(word){
        message.delete()
        message.channel.send(`${message.author} Dont Say Bad Word`)
    }
  }
    
})

```
<br>
<br>

<h3>Notes 📝: <br> <br>
Make Sure You Have Install Quick.db<br>
`
const db = require('quick.db')
`
<br>
</h3>

Any Bug<br>

Contact With Me Discord: 
`
B A D B O Y #8888
`
<br>
<br>
<a href="">Npm</a>

