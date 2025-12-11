import { stockMarket } from "../db/stockMarketData.js"

export function searchStock(identifier) {
    const filtered_stocks = stockMarket.stocks.filter(stock => stock.id === identifier || stock.name === identifier)
    return get_filtered_stock(filtered_stocks)
}

// console.table(searchStock(`WindCore Solutions`))
// console.table(searchStock(`gtytrhy`))

export function get_filtered_stock(filtered_stocks) {
        if (filtered_stocks.length > 0) {
        return filtered_stocks
    }
    else {
        console.log(`No stock matches your search.`);
        return filtered_stocks
    }
}

export function filterStocksByPrice(givenPrice, above) {
    if (above) {
        var filtered_stocks = stockMarket.stocks.filter(stock => stock.currentPrice > Number(givenPrice))
    }
    else if (!above) {
        var filtered_stocks = stockMarket.stocks.filter(stock => stock.currentPrice < Number(givenPrice))
    }
    return get_filtered_stock(filtered_stocks)
}

// console.log(filterStocksByPrice(`38`, 0));


export function OperateOnStock(operation, identifier) {

}

