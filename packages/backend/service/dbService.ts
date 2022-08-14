import {MikroORM} from "@mikro-orm/core";
import {SqliteDriver} from "@mikro-orm/sqlite";
import MerchantEntity from "../Entity/MerchantEntity";
import OrderEntity from "../Entity/OrderEntity";
import ProductEntity from "../Entity/ProductEntity";
import {v4} from "uuid";
import envStore from "common/store/envStore";
import dateHelper from "common/helper/dateHelper";
import Merchant from "common/Klass/Merchant";
import Order from "common/Klass/Order";
import EnumOrderStatus from "common/Enum/EnumOrderStatus";
import Product from "common/Klass/Product";

export class DbService {
    orm: MikroORM<SqliteDriver> = null

    get merchantRepo() {
        return this.orm.em.getRepository(MerchantEntity)
    }
    get orderRepo() {
        return this.orm.em.getRepository(OrderEntity)
    }
    get productRepo() {
        return this.orm.em.getRepository(ProductEntity)
    }

    init = async ()=> {
        this.orm = await MikroORM.init<SqliteDriver>({
            entities: [MerchantEntity, OrderEntity, ProductEntity],
            dbName: `${envStore.envName}.db`,
            type: 'sqlite',
            allowGlobalContext: true,
        })
    }

    reset = async ()=> {
        const schemaGenerator = this.orm.getSchemaGenerator()
        await schemaGenerator.dropSchema()
        await schemaGenerator.createSchema()
    }

    generateDumbData = async ()=> {
        await this.reset()
        const merchantEntities: MerchantEntity[] = []
        const orderEntities: OrderEntity[] = []
        const productEntities: ProductEntity[] = []

        for(let i=0; i<10; i++) {
            const merchant = new Merchant({
                name: `Merchant #${i}`,
                description: `This is dumb merchant #${i}`,
                createDate: dateHelper.getRandomDate('2022-01-01', '2022-03-01'),
                updateDate: dateHelper.getRandomDate('2022-03-02', '2022-04-01'),
            })
            const merchantEntity = this.merchantRepo.create(merchant)
            merchantEntities.push(merchantEntity)
        }

        for(let i=0; i<1000; i++) {
            const product = new Product({
                name: `Product #${i}`,
                description: `This is dumb product #${i}`,
                createDate: dateHelper.getRandomDate('2022-01-01', '2022-05-01'),
                updateDate: dateHelper.getRandomDate('2022-05-02', '2022-08-01'),
            })
            const productEntity = this.productRepo.create(product)
            productEntities.push(productEntity)
        }

        for(let i=0; i<100; i++) {
            const order = new Order({
                id: v4(),
                name: `Order #${i}`,
                description: `This is dumb order #${i}`,
                createDate: dateHelper.getRandomDate('2022-04-02', '2022-07-01'),
                updateDate: dateHelper.getRandomDate('2022-07-02', '2022-08-01'),
                deleteDate: null,
            })
            const isCompleted = (Math.random() * 10) > 7
            const isCanceled = (Math.random() * 10) > 7

            if(isCompleted) {
                order.status = EnumOrderStatus.completed
                order.completeDate = dateHelper.getRandomDate('2022-08-01', '2022-08-15')
            }
            if(isCanceled) {
                order.status = EnumOrderStatus.canceled
                order.cancelDate = dateHelper.getRandomDate('2022-08-01', '2022-08-15')
            }

            const dumbProducts: ProductEntity[] = []
            const dumbProductCount = Math.floor(Math.random() * 100)

            for(let i=0; i<dumbProductCount; i++) {
                const dumbIndex = Math.floor(Math.random() * productEntities.length)
                dumbProducts.push(productEntities[dumbIndex])
            }

            const orderEntity = this.orderRepo.create({
                ...order,
                merchant: merchantEntities[Math.floor(Math.random() * merchantEntities.length)],
                products: dumbProducts,
            })
            orderEntities.push(orderEntity)
        }

        await this.orderRepo.persistAndFlush(orderEntities)
    }
}

export default new DbService()
