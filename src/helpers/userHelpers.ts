import validator from 'validator';
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


dotenv.config();

export const validateEmail = (email: string) => {
    return validator.isEmail(email)
 }
 

 export const verifyNameUser = (name : string) => {
        let verifyName = name.length;

        if(verifyName === 4){
            return name;
        }else{
            return new Error("Name lass then 4 characters")
        }
        
        
} 


export const optinEmail = async (email: string, token: string) => {

    
    let transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "674b153952ce85",
          pass: "ef24dd9a75f968"
        }
      });


      let menssage = {
        from: `${process.env.EMAIL_DEFAULT}`,
        to: email,
        replyTo: email,
        subject: "Confirmação de E-mail",
        html: `<h3>Confirmação de E-mail</h3> <a href="http://localhost:4000/optinemail?t=${token}">Confirmar</a>`,
        text: 'Falta pouco para completar seu cadastro!'
      }
      
      let info = await transport.sendMail(menssage);


      console.log(info)

      return info;


}   




export const matchPassword = (password: string, passwordEncrypted: string) => {
    return bcrypt.compareSync(password, passwordEncrypted);
}
