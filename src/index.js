const random = require('random-password-pkg')
const db = require('quick.db')
const Discord = require('discord.js')
const client = new Discord.Client()
class badword {
  constructor(options) {
    if (!options.client) {
      throw new Error('The Discord.Client() integration is required.');
    };

    if(!options.addcmd){
        throw new Error(`I Can't Found Add Command`)
    }

      if(!options.list){
        throw new Error(`I Can't Found List Command`)
    }
      if(!options.remove){
        throw new Error(`I Can't Found Remove Command`)
    }

      if(!options.remove_all){
        throw new Error(`I Can't Found Remove All Command`)
    }
      
    if (!options.prefix) {
      throw new Error('The bot prefix is required.');
    };

      if(!options.permissions){
          throw new Error('User Permissions Required')
      }
      
    this.prefix = options.prefix || options.prefix;

    this.client = options.client || options.client;


    this.permissions = options.permissions || options.permissions;

          this.addcmd = options.addcmd || options.addcmd;
this.list = options.list || options.list;
              
      this.remove = options.remove || options.remove;

    this.remove_all = options.remove_all || options.remove_all;
      
  }

    

      async onMessage(message) {
    if (!message) {
      throw new Error('The message is required on the onMessage function.');
    };

          const args = message.content.split(' ')
          const command = args[0]
          if(command === this.prefix + this.addcmd){
                        if(!message.member.hasPermission(this.permissions)) return message.channel.send(`You Dont Have Permissions To Use This ${command} Command`)
              const aa = message.content.split(' ').slice(1).join(' ')
              const id = random(8)
if(!aa) return message.channel.send(`I Can't Found AnyThing?!`)      
              const data = {
                  word: aa.toLowerCase(),
                  id: id.toLowerCase(),
                  by: message.author.tag
                  
              }
              let database = db.fetch(`word_${message.guild.id}`)
 if(database && database.find(x => x.word === aa.toLowerCase())) return message.channel.send(`This Word it's already on database.`)
              
         var embed = new Discord.MessageEmbed()  
              .setAuthor(message.author.tag, message.author.avatarURL({dynimc: true}))
             .setTitle(`New Word Add To The List`)
              .setDescription(`
Word: ${aa} \n ID: ${id.toLowerCase()} \n By: <@${message.author.id}>

`)
              .setTimestamp()
              .setFooter(`By: ${message.author.tag}`)
              
message.channel.send(embed).then(() => {
    db.push(`word_${message.guild.id}`, data)
})
              
     } else {
              if(command === this.prefix + this.remove){
                  if(!message.member.hasPermission(this.permissions)) return message.channel.send(`You Dont Have Permissions To Use This ${command} Command`)

          const args = message.content.split(' ')

                  
                  const wid = args[1]

                  let database = db.get(`word_${message.guild.id}`)
if(database) {
    let data = database.find(x => x.id === wid.toLowerCase())
   if(!data) return message.channel.send(`That's on invaild  ID`) 
   let value = database.indexOf(data)
   delete database[value]
 
   var filter = database.filter(x => {
     return x != null && x != ''
   })
 
   db.set(`word_${message.guild.id}`, filter)
   
 return message.channel.send("\`1\` Word has been removed ✅")
    
}
    
                  
                      } else {
                  if(
                    command === this.prefix +this.list){

                      let database = db.get(`word_${message.guild.id}`) 
  if(database === null) return message.channel.send(`It's looks ur auto delete bad word it's empty`)
  let list = []
  if(database && database.length) {
      database.forEach(x => {
list.push(`Word: ${x.word}
> By: ${x.by}
> ID: ${x.id}
`)
      })
  if(list.length === 0) return message.channel.send(`it's looks ur auto delete bad word it's empty`)
  let embed = new Discord.MessageEmbed()
  .setAuthor(message.author.username , message.author.displayAvatarURL())
  .setDescription(list.join("\n"))
  .setFooter(message.guild.name , message.guild.iconURL())
  .setTimestamp()
  return message.channel.send(embed)
    }
                      
                      
                    } else {
                      if(command === this.prefix + this.remove_all){
                          if(!message.member.hasPermission(this.permissions)) return message.channel.send(`You Dont Have Permissions To Use This ${command} Command`)
                          const data = await db.fetch(`word_${message.guild.id}`)
                          if(data === null) return message.channel.send(`it's looks ur auto delete bad word it's empty`)
                          
message.channel.send(`Dont Remove ${data.length} Words`).then(() => {
    db.delete(`word_${message.guild.id}`)
    
})
                      }
                    }
                      }
     }
}
    
        
    
    
    
    
      }




module.exports = badword
