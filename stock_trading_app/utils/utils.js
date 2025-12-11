import { question } from "readline-sync"
import { stockMarket } from "../db/stockMarketData.js"

export function searchStock(identifier) {
    const filtered_stock = stockMarket.stocks.filter(stock => stock.id === identifier || stock.name === identifier)
    console.log(` `);
    return get_filtered_stock(filtered_stock)
}

export function get_filtered_stock(filtered_stocks) {
    if (filtered_stocks.length > 0) {
        console.log(`the stocks matches your search are:` )
        console.table(filtered_stocks);
        return filtered_stocks
    }
    else {
        console.log(`No stock matches your search.`);
        console.table(filtered_stocks)
        return filtered_stocks
    }
}

export function filterStocksByPrice(givenPrice, above) {
    if (input_validation(above, `Y`, `N`)) {
        if (above_validation(above)) {
            var filtered_stocks = stockMarket.stocks.filter(stock => stock.currentPrice > Number(givenPrice))
        }
        else if (!above_validation(above)) {
            var filtered_stocks = stockMarket.stocks.filter(stock => stock.currentPrice < Number(givenPrice))
        }
        return get_filtered_stock(filtered_stocks)
    }
    else {
        console.log(`your 'above' choice is not match.`)
    }
}

export function input_validation(input, option1, option2){
    return input === option1 || input === option2
}

export function above_validation(above) {
    return above === `Y`
}

export function buy_operation(desired_stock) {
    const quantity = question("How many units? ")
    if (Number(quantity) <= desired_stock.availableStocks) {
        desired_stock.availableStocks -= quantity
        desired_stock.previousPrices.push(desired_stock.currentPrice)
        desired_stock.currentPrice = desired_stock.currentPrice * 1.05
        const stocks_in_same_category = stockMarket.stocks.filter(stock => stock.category === desired_stock.category && !desired_stock)
        stocks_in_same_category.forEach(stock => stock.currentPrice = stock.currentPrice * 1.01);
        stockMarket.lastUpdated = new Date
        console.log(`A stock purchase transaction was performed on a stock in the name of ${desired_stock.name}. ${quantity} units`);
    }
    else {
        console.log(`Please enter a valid number.`);
        return buy_operation(desired_stock)
    }
}

export function sell_operation(desired_stock) {
    const quantity = question("How many units? ")
    try {
        desired_stock.availableStocks += Number(quantity)
        desired_stock.previousPrices.push(desired_stock.currentPrice)
        desired_stock.currentPrice = desired_stock.currentPrice * 0.95
        const stocks_in_same_category = stockMarket.stocks.filter(stock => stock.category === desired_stock.category && !desired_stock)
        stocks_in_same_category.forEach(stock => stock.currentPrice = stock.currentPrice * 0.99);
        stockMarket.lastUpdated = new Date
        console.log(`A stock sale transaction was performed on a stock in the name of ${desired_stock.name}. ${quantity} units`);
    }
    catch {
        console.log(`Please enter a valid number.`);
        return sell_operation(desired_stock)
    }
}

export function OperateOnStock(operation, identifier) {
    if (input_validation(operation, `buy`, `sell`)) {  
        const filtered_stock = searchStock(identifier)
        if (filtered_stock.length > 0) {
            const desired_stock = filtered_stock[0]
            if (operation === `buy`) {
                return buy_operation(desired_stock);
            } 
            else if (operation === `sell`) {
                return sell_operation(desired_stock);
            }
            else {
                return `The operation does not match the possible operations.`;
            }
        }
        else {
            return `No stock matches the identifier.`
        }
    }
    else {
        return `your 'operation' choice is not match.`
    }
}

