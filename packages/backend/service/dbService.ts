import {EntityManager, MikroORM} from "@mikro-orm/core";
import {SqliteDriver} from "@mikro-orm/sqlite";
import MerchantEntity from "../Entity/MerchantEntity";
import OrderEntity from "../Entity/OrderEntity";
import ProductEntity from "../Entity/ProductEntity";
import {v4} from "uuid";
import envStore from "common/store/envStore";
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

        const merchant = this.merchantRepo.create({
            id: v4(),
            name: `Merchant`,
            description: `asd`,
            createDate: null,
            updateDate: null,
            deleteDate: null,
        })
        for(let i=0; i<100; i++) {
            const order = this.orderRepo.create({
                id: v4(),
                name: `Order ${i}`,
                description: `This is dumb order ${i}`,
                merchant: merchant,
                createDate: null,
                updateDate: null,
                deleteDate: null,
            })
            this.orderRepo.persist(order)
        }

        await this.orderRepo.flush()
    }
}

export default new DbService()
