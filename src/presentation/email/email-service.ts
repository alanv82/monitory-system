import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/env.plugins';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
  to: string | string[],
  subject: string,
  htmlBody: string,
  attachements?: Attachement[]
}

interface Attachement {
  filename: string,
  path: string
}

export class EmailService {

  private transporter = nodemailer.createTransport({

    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_KEY
    }
  });

  constructor(
    // private readonly logRepository: LogRepository,
  ){}

  async sendEmail(options: SendMailOptions):Promise<boolean> {

    const { to, subject, htmlBody, attachements = [] } = options 

    try {
      
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        attachments:attachements,
        html: htmlBody,
      })

      // console.log(sentInformation)
      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'Email Sent',
        origin: 'email-service.ts'
      })
      // this.logRepository.saveLog(log)

      return true
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: 'Email not Sent',
        origin: 'email-service.ts'
      })
      // this.logRepository.saveLog(log)
      return false
    }

  }
  
  async sendEmailWithAttachements (to: string | string[] ){
    const subject = 'Logs del Servicio'
    const htmlBody = `
      <h3> Logs de sistema - NOC</h3>
      <p>loremm velit non venian ullamco</p>
      <p>ver logs adjuntos</p>
    `
    const attachements:Attachement[] = [
      {filename: 'logs-all.log', path: './logs/logs-all.log'},
      {filename: 'logs-medium.log', path: './logs/logs-medium.log'},
      {filename: 'logs-high.log', path: './logs/logs-high.log'},
    ];
    return this.sendEmail({
      to,
      subject,
      attachements,
      htmlBody
    })
  }

}