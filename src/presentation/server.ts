import { CheckService } from "../domain/use-cases/checks/check-service"
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email-service"

const fileSystemLogRopository = new LogRepositoryImpl(
  new FileSystemDatasource(),
)

const emailService = new EmailService();

export class Server {

  public static start() {
    console.log('Server Started...')

    new SendEmailLogs(
      emailService,
      fileSystemLogRopository,
    ).execute(['alan.18mp@gmail.com'])
    
    // emailService.sendEmailWithAttachements(['alan.18mp@gmail.com']);


    // const emailService = new EmailService();
    // emailService.sendEmail({
    //   to: 'alan.18mp@gmail.com',
    //   subject: 'logs de sistema',
    //   htmlBody: `
    //     <h3> Logs de sistema - NOC</h3>
    //     <p>loremm velit non venian ullamco</p>
    //     <p>ver logs adjuntos</p>
    //   `
    // });

    

    // CronService.createJob(
    //   '*/5 * * * * *',
    //   (() => {
    //     const url = 'https://google.com';
    //     new CheckService(
    //       fileSystemLogRopository,
    //       () => console.log(`${url} is ok`),
    //       ( error ) => console.log( error )
    //     ).execute(url)
    //     // new CheckService().execute('http://localhost:3000/posts')
    //   })
    // )
  }

}