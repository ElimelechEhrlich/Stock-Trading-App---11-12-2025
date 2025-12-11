import { searchStock, filterStocksByPrice, OperateOnStock } from "../utils/utils.js"

export const features = [searchStock, filterStocksByPrice, OperateOnStock]
export const menu = [`Search for a stock by name or id.`, `Show all stocks above or below a given price.`, `Buy or sell a stock`, `Exit`]
