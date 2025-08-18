import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from "../../generated/prisma";

const prisma = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  high: SeverityLevel.HIGH,
  medium: SeverityLevel.MEDIUM,
}

export class PostgresLogDatasource implements LogDatasource {

  async saveLog(log: LogEntity): Promise<void> {

    const level = severityEnum[log.level];
    const newLog = await prisma.logModel.create({
      data: {
        ...log,
        level: level,
      }
    })
    console.log('Postgres saved')
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    
    const level = severityEnum[severityLevel];

    const dbLogs =  await prisma.logModel.findMany({
      where: {level}
    })

    return dbLogs.map(LogEntity.fromObject);
  }

}