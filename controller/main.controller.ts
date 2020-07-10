import { Application } from 'express';
// import {HijabenkaService} from '../service/hijabenkaservice';
// import {Ilotteservice} from '../service/ilotte.service';
// import {Zaloraservice} from '../service/zalora.service';
// import cron from 'node-cron';
export class Controller {
//   private hijabbenka: HijabenkaService;
//   private zalora:Zaloraservice;
//   private ilotte:Ilotteservice;
  constructor(private app: Application) {
    // this.hijabbenka = new HijabenkaService();
    // this.ilotte = new Ilotteservice();
    // this.zalora = new Zaloraservice();
    this.routes();
    this.cronjob()
  }
  public routes() {
    //this.app.route('/').get(this.ilotte.crawling);
  }
  public cronjob(){
    // cron.schedule("* * * * *", async() =>{
    //   //  await this.hijabbenka.crawling()
    //   //  await this.zalora.crawling()
    //   //  await this.ilotte.crawling()
    // });
  }
}