import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
  execute( url:string ) :Promise<boolean>;
}
type SuccesCallback = () => void | undefined;
type ErrorCallback = (( error:string ) => void | undefined);

export class CheckServiceMultiple implements CheckServiceMultipleUseCase{

  constructor(
    private readonly logRepository: LogRepository[],
    private readonly succesCallback: SuccesCallback,
    private readonly errorCallback: ErrorCallback

  ){}

  private callLogs(log: LogEntity){
    this.logRepository.forEach( logRepository => logRepository.saveLog(log))
  }

  public async execute( url:string ){
    const origin = 'check-service.ts'

    try {
      const request = await fetch(url);
      if (!request.ok){
        throw new Error (`Error on service ${url}`)
      }
      const log = new LogEntity({
        message:`Service ${url} working`,
        level: LogSeverityLevel.low,
        origin:origin
      })
      this.callLogs(log);
      this.succesCallback && this.succesCallback()
      return true
    } catch (error) {
      const errorMessage = `${url} is not ok. ${error}`;
      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin:origin
      });
      this.callLogs(log);
      this.errorCallback && this.errorCallback(`${error}`);
      return false
    }
  }
}