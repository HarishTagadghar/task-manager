const sgmail = require('@sendgrid/mail');

sgmail.setApiKey(process.env.SENDGRID_API_KEY)

const welcomeEmail = function(email , name){
    sgmail.send({
        to:email,
        from:'harishtgtg@gmail.com',
        subject: `welcome to the task app ${name} `,
        text:`you can create your task over here`,
        html : '<strong>send  from nodejs</strong>'
    }).then(() => {
        console.log('no error');
    }).catch((e)=>{
        console.log(e);
        if(e.response){
            console.log(e.response.body);
            
        }
        
    })
}

const goodbyeEmail = function(email , name) {
    sgmail.send({
        to:email,
        from:'harishtgtg@gmail.com',
        subject:`your accound is successfully deleted ${name}`,
        text:`we hope you have utilised this app ${name}`
    }).then(() => {
        console.log('no error');
    }).catch((e)=>{
        console.log(e);
        if(e.response){
            console.log(e.response.body);
            
        }
        
    })
}

module.exports = {
    welcomeEmail,
    goodbyeEmail
}