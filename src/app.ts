import { envs } from './config/plugins/env.plugins';
import { LogModel, MongoDatabase } from './data/mongo';
import { PrismaClient } from './generated/prisma';
import { Server } from './presentation/server';

(async() => {

  main();

})()

async function main(){

  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  })

  // const prisma = new PrismaClient();
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: 'HIGH',
  //     message: 'Test message',
  //     origin: 'App.ts'
  //   }
  // })

  // const logs = await prisma.logModel.findMany({
  //   where:{
  //     level: 'HIGH'
  //   }
  // });

  // console.log(logs)

  //crear una coleccion y documento
  // const newLog = await LogModel.create({
  //   message: 'Test message desde Mongo',
  //   origin: 'app.ts',
  //   level: 'low', 
  // })

  // await newLog.save();

  // console.log(newLog)

  // const logs = await LogModel.find()

  // console.log(logs[0]?.message);

  Server.start()
  // console.log(envs)
}