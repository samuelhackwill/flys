import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

Meteor.startup(() => {
  // code to run on server at startup
  scoreArray = []
});

Meteor.methods({


  logScore(raceTimes){
    score = raceTimes.finish - raceTimes.start

    // add score
    _totalVisits = scoreArray.push(score)

    // rearrange array
    scoreArray = scoreArray.sort((a, b) => a - b);

    // find position
    _position = (scoreArray.indexOf(score))+1

    console.log(scoreArray)

    return {totalVisits : _totalVisits, position : _position}
  },

  returnPosition(who){
  },

  removeScore(){
    scoreArray = []
  }

})

const serverRendering = (req, res, next) => 
{

  rootUrl = "https://le.tiretdusix.art"
  timestamp = new Date()
    try 
    {
      const ua = req.headers['user-agent'];

      if (/bot|whatsapp|facebook|twitter|pinterest|google|baidu|bing|msn|duckduckgo|teoma|slurp|yandex/i.test(ua)) 
      {

          const html = `
            <!html>
            <head>
              <title>Le tiret du six aux Subs 24-25/11/21</title>
              <meta property="og:image" content="${rootUrl}/preview.jpg"/>
              <meta property="og:image:url" content="${rootUrl}/preview.jpg"/>
              <meta property="og:image:secure_url" content="${rootUrl}/preview.jpg"/>
              <meta property="og:image:type" content="image/jpeg"/>
              <meta property="og:image:width" content="643" />
          <meta property="og:image:height" content="643" />
              <meta property="og:url" content=${rootUrl}/>
              <meta property="og:type" content="website"/>
              <meta property="og:description" content="Du 24 au 26 Novembre, la pièce de Samuel joue aux Subsistances, Lyon."/>
              <meta property="og:title" content="Le tiret du six aux Subs 11/21"/>
          `;


          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          res.end(html);
      } else {
        console.log("not a bot, carry on")
        next();
      }
  } catch (err) {
    console.log(err);
  }
}

WebApp.connectHandlers.use(serverRendering);