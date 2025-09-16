import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { CreateCurrencyDto } from "src/Dto/create-currency-dto";
import * as cheerio from 'cheerio';
import { Cron, CronExpression } from "@nestjs/schedule";


@Injectable()
export class CurrnecyService{
    constructor(private prisma: PrismaService){}

    async currencyById(id: number){
        return this.prisma.currency.findUnique({where: {id}});
    }

    async currencyByName(name: string){
        return this.prisma.currency.findUnique({where: {name}});
    }
    
    async allCurrencies(){
        return this.prisma.currency.findMany();
    }

    async createCurrency(data: CreateCurrencyDto){
        const currency = await this.currencyByName("");
        if(currency === null){
            return this.prisma.currency.create({
                data
            })
        }else{
            throw new ConflictException(`Waluta już istnieje`)
        }
    }

    async updateCurrency(parameters: {
        name: string,
        rate: number,
    }){
        const {name, rate} = parameters;
        const currency = await this.currencyByName(name);
        if(currency === null){
            throw new NotFoundException('Nie znaleziono waluty')
        }else{
            return this.prisma.currency.update({
                data: {
                    rate
                },
                where: {name}
            })
        }
    }

    @Cron(CronExpression.EVERY_2_HOURS)
    async downloadCurrencies(){
        const currienciesToDownload = [
            {
                name: "#js-currency-rates-container > table > tbody > tr.row-2 > td.rate-border-right.uk-text-bold.uk-text-center.uk-text-primary",
                rate: "#js-currency-rates-container > table > tbody > tr.row-2 > td:nth-child(3)",
            },
            {
                name: "#js-currency-rates-container > table > tbody > tr.row-1 > td.rate-border-right.uk-text-bold.uk-text-center.uk-text-primary",
                rate: "#js-currency-rates-container > table > tbody > tr.row-1 > td:nth-child(3)",
            },
            {
                name: "#js-currency-rates-container > table > tbody > tr.row-6 > td.rate-border-right.uk-text-bold.uk-text-center.uk-text-primary",
                rate: "#js-currency-rates-container > table > tbody > tr.row-6 > td:nth-child(3)",
            }
        ]

        try{
            const response = await fetch('https://www.bankbps.pl/kursy-walut?view=currencies');
            if(!response.ok){
                throw new Error(`Błąd HTTP! status: ${response.status.toString()}`)
            }

            const html = await response.text();
            const $ = cheerio.load(html);

            for (const currencyDownload of currienciesToDownload) {
                const name = $(currencyDownload.name).text().split(" ")[1];
                const rate = Number.parseFloat($(currencyDownload.rate).text());
                const currency = await this.currencyByName(name);
                await (currency === null ? this.createCurrency({name,rate}) : this.updateCurrency({name: currency.name, rate}));
            }
            
        }catch(error){
            console.error(error);
        }

    }
}