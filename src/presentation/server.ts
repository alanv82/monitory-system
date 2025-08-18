import { LogSeverityLevel } from "../domain/entities/log.entity"
import { LogRepository } from "../domain/repository/log.repository"
import { CheckService } from "../domain/use-cases/checks/check-service"
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple"
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource"
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource"
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email-service"

const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDataSource,
)

const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
)

const postgreLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource(),
)

const emailService = new EmailService();

export class Server {

  public static async start() {
    console.log('Server Started...')


              //Emails
    // new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRopository,
    // ).execute(['alan.18mp@gmail.com'])
    
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

    // const logs = await logRepository.getLogs(LogSeverityLevel.high)
    // console.log(logs);

    CronService.createJob(
      '*/5 * * * * *',
      (() => {
        const url = 'https://google.com';
        new CheckServiceMultiple(
          [mongoLogRepository, fsLogRepository, postgreLogRepository],
          () => console.log(`${url} is ok`),
          ( error ) => console.log( error )
        ).execute(url)
        // new CheckService().execute('http://localhost:3000/posts')
      })
    )

  }

}