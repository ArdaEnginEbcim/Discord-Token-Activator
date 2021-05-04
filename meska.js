const Discord = require("discord.js");
const fs = require("fs");
const Meska = require("meska.js");
const Logger = new Meska.Logger();

fs.readFile(
  "tokens.txt",
  { encoding: "utf8", flag: "r" },
  async function (err, data) {
    if (err) {
      Logger.error("FILE", err + "!", true);
    } else if (data == "") {
      Logger.error("FILE", "tokens.txt file is empty!", true);
    } else {
      let msg = 1;
      let connected = 0;
      let logined = 0;
      let tokens = data.split("\n");
      tokens.forEach(async (token) => {
        const client = new Discord.Client();
        await client
          .login(token)
          .then(() => {
            client.on("message", async (message) => {
              if (msg == 1) {
                if (message.channel.type == "dm") {
                  let DM = new Meska.Logger({
                    basePath: "logs/MESSAGE/DM",
                    name: message.author.id,
                  });
                  DM.info(
                    "MESSAGE",
                    message.author.tag +
                      " (" +
                      message.author.id +
                      ")" +
                      ":" +
                      " " +
                      message.content,
                    true
                  );
                  return;
                } else {
                  let GUILD = new Meska.Logger({
                    basePath: "logs/MESSAGE/GUILD",
                    name: message.guild.id,
                  });
                  GUILD.info(
                    "MESSAGE",
                    message.guild.name +
                      " (" +
                      message.guild.id +
                      ")" +
                      " " +
                      "/" +
                      " " +
                      message.channel.name +
                      " (" +
                      message.channel.id +
                      ")" +
                      " " +
                      "/" +
                      " " +
                      message.author.tag +
                      " (" +
                      message.author.id +
                      ")" +
                      ":" +
                      " " +
                      message.content,
                    true
                  );
                  return;
                }
              } else return
            });
            Logger.info("LOGIN", client.user.tag + " is Connected!", true);
            msg += 1;
            connected += 1;
          })
          .catch((err) => {
            Logger.error("LOGIN", err + "!", true);
          });
        logined += 1;
        if (logined == tokens.length) {
          Logger.success(
            "LOGIN",
            connected + " out of " + logined + " tokens work.",
            true
          );
        }
      });
    }
  }
);
