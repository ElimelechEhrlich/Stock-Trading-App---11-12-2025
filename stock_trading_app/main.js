import { menu } from "./userMenu/menu.js"
import { question } from "readline-sync"
import { searchStock, filterStocksByPrice, OperateOnStock } from "./utils/utils.js"
import { stockMarket } from "./db/stockMarketData.js"


function app() {
    var choice = 1
    while (choice !== 4) {
        menu.forEach((operation, i) => console.log(`${i + 1}. ${operation}`))
        let choice = Number(question(`your choice: `))
        switch (choice) {
            case 1:
                var identifier = question(`your search: `)
                searchStock(identifier);
                break;
            case 2:
                const givenPrice = question(`Price: `)
                const above = question(`above (Y/N): `).toUpperCase()
                filterStocksByPrice(givenPrice, above);
                break;
            case 3:
                var identifier = question(`your search: `)
                const operation = question(`operation (buy/sell): `)
                OperateOnStock(operation, identifier);
                break;
            case 4:
                return
        }
    } 
}
app()
