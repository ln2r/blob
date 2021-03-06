const bossData = require('../data/bosses.json');
const config = require('../../config.json');

module.exports = function(time, clientData){  
  const t = new Date();
  const day = t.getUTCDay();
  let boss;

  console.log(`It's now: ${t.getUTCDay()}, sending notification.`);

  switch(time){
    // 12 AM PST
    case 6:
      // Saturday
      if(day === 6) boss = [bossData[2]];
      // Sunday
      if(day === 0) boss = [bossData[1]];
      // Monday
      if(day === 1) boss = [bossData[0]];
      // Tuesday
      if(day === 2) boss = [bossData[3]];
      // Wednesday
      if(day === 3) boss = [bossData[0]];
      // Thursday
      if(day === 4) boss = [bossData[3]];
      // Friday
      if(day === 5) boss = [bossData[4]];
    break;
    // 3 AM PST
    case 9:
      if(day === 6) boss = [bossData[4]];
      if(day === 0) boss = [bossData[3]];
      if(day === 1) boss = [bossData[1]];
      if(day === 2) boss = [bossData[1]];
      if(day === 3) boss = null;
      if(day === 4) boss = [bossData[1]];
      if(day === 5) boss = [bossData[0]];
    break;
    // 7 AM PST
    case 13:
      if(day === 6) boss = [bossData[3]];
      if(day === 0) boss = [bossData[4]];
      if(day === 1) boss = [bossData[1]];
      if(day === 2) boss = [bossData[4]];
      if(day === 3) boss = [bossData[0]];
      if(day === 4) boss = [bossData[3]];
      if(day === 5) boss = [bossData[3]];
    break;
    // 10 AM PST
    case 16:
      if(day === 6) boss = [bossData[4]];
      if(day === 0) boss = [bossData[1]];
      if(day === 1) boss = [bossData[2]];
      if(day === 2) boss = [bossData[3]];
      if(day === 3) boss = [bossData[4]];
      if(day === 4) boss = [bossData[4]];
      if(day === 5) boss = [bossData[0]];
    break;
    // 2 PM PST
    case 20:
      if(day === 6) boss = [bossData[6], bossData[7]];
      if(day === 0) boss = [bossData[8]];
      if(day === 1) boss = [bossData[3]];
      if(day === 2) boss = [bossData[4]];
      if(day === 3) boss = [bossData[3]];
      if(day === 4) boss = [bossData[1]];
      if(day === 5) boss = [bossData[4]];
    break;
    // 5 PM PST
    case 23:
      if(day === 6) boss = [bossData[0], bossData[1]];
      if(day === 0) boss = [bossData[5]];
      if(day === 1) boss = [bossData[4]];
      if(day === 2) boss = [bossData[0]];
      if(day === 3) boss = [bossData[2]];
      if(day === 4) boss = [bossData[3]];
      if(day === 5) boss = [bossData[1]];
    break;
    // 8.15 PM PST
    case 3:
      if(day === 6) boss = null;
      if(day === 0) boss = [bossData[1], bossData[4]];
      if(day === 1) boss = [bossData[1]];
      if(day === 2) boss = [bossData[5]];
      if(day === 3) boss = [bossData[0], bossData[1]];
      if(day === 4) boss = [bossData[5]];
      if(day === 5) boss = [bossData[3], bossData[1]];
    break;
    // 9.15 PM PST
    case 4:
      if(day === 6) boss = null;
      if(day === 0) boss = null;
      if(day === 1) boss = null;
      if(day === 2) boss = null;
      if(day === 3) boss = [bossData[6], bossData[7]];
      if(day === 4) boss = null;
      if(day === 5) boss = null;
    break;
    // 10.15 PM PST
    case 5:
      if(day === 6) boss = [bossData[4], bossData[3]];
      if(day === 0) boss = [bossData[0], bossData[3]];
      if(day === 1) boss = [bossData[0]];
      if(day === 2) boss = [bossData[3], bossData[1]];
      if(day === 3) boss = [bossData[4]];
      if(day === 4) boss = [bossData[1], bossData[0]];
      if(day === 5) boss = [bossData[0]];
    break;
  }

  let fieldsData = [];
  if(boss){
    boss.map(d => {
      fieldsData.push({
        'name': d.name,
        'value': `Location: ${d.location}\nHP: ${d.hp}\nDefense: ${d.dp} Evasion: ${d.eva}\nDamage Reduction: ${d.damage_reduction}\nEXP: ${d.exp} Skill EXP: ${d.skill_xp}\nKarma: ${d.karma}\nRecommended AP/DP: ${d.rec.ap}/${d.rec.dp}`
      })
    })  

    const messageData = 'Incoming Boss Spawn in 30 Minutes!';
    const embedData = {
      'embed': {
        'color': 1879160,
        'footer': {
          'text': 'Boss Notfication',
        },
        'fields': fieldsData,
      },
    };

    clientData.guilds.cache.map(async function(guild) {  
      if (guild.available) {
        let found = 0;
        guild.channels.cache.map((ch) => {
          if (found === 0) {
            if (ch.id === config.channel.boss) {
              found = 1;
              if (ch.permissionsFor(clientData.user).has('EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL')) {
                ch.send(messageData, embedData);
              }
            }
          }
        });
      }
    });

    console.log(`Boss notification sent`);
  }else{
    console.log(`No Boss at this time`);
  }
}