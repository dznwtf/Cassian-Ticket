
module.exports = (client) => {
    console.log("Bot on ✅")


    client.user.setStatus('online');

    let activities = [
       'Crie um ticket !'
    ],
        i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "WATCHING"
    }), 5000);
}