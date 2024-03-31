var express = require('express');
var router = express.Router();
const bodyparser = require('body-parser');
const jsonParser = bodyparser.json()
const sendmail = require('sendmail')();


/* GET home page. */
router.get('/', function(req, res, next) {
  let message = "";
  res.render('kontakt', { message });
});

//POST contact form send to email
router.post('/', jsonParser, async function(req, res, next ) {
    let message = "";
    const { Navn, Epost, Emne, Beskjed } = req.body;
    if( Navn == null || Navn == "" ){
      message = "Navn må fylles ut i skjema."
      res.render('kontakt', { message } );
    }
    if( Epost == null || Epost == "" || !Epost.includes('@') || !Epost.includes('.') ){
      message = "Epost må fylles ut i skjema og må være gyldig epost adresse."
      res.render('kontakt', { message } );
    }
    if( Beskjed == null || Beskjed == "" ){
      message = "Vennligst legg inn hva forespørselen handler om under Beskjed* slik at vi kan svare best mulig."
      res.render('kontakt', { message } )
    }
    try{
        sendmail({
          from : 'no-reply@terapihund.com',
          to : 'karen.beate@outlook.com',
          subject : 'test',
          text : 'Test mail'
        });
        console.log("Email sent.")
    }catch(err){
      console.log(err);
      message = "Kunne ikke sende epost, prøv igjen senere.";
      res.render('kontakt', { message })
     }
    message = "Forespørsel sendt."
    res.render('kontakt', { message } );
});

module.exports = router; 