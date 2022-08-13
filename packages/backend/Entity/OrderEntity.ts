import {v4} from "uuid";
import {Field, ID, ObjectType} from "type-graphql";
import Order from "common/Klass/Order";
import Merchant from "common/Klass/Merchant";
import Product from "common/Klass/Product";
import MerchantEntity from "./MerchantEntity";
import ProductEntity from "./ProductEntity";
import {Collection, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property} from "@mikro-orm/core";

@ObjectType()
@Entity()
class OrderEntity {
    @Field(type => ID)
    @PrimaryKey()
    id: string

    @Field(()=> (MerchantEntity))
    @ManyToOne(()=> (MerchantEntity))
    merchant: MerchantEntity

    @Field(()=> ([ProductEntity]))
    @ManyToMany(()=> (ProductEntity))
    products: Collection<ProductEntity> = new Collection<ProductEntity>(this)

    @Field()
    @Property()
    name: string

    @Field()
    @Property()
    description: string

    @Field({
        nullable: true,
    })
    @Property({
        nullable: true,
    })
    createDate: Date

    @Field({
        nullable: true,
    })
    @Property({
        nullable: true,
    })
    updateDate: Date

    @Field({
        nullable: true,
    })
    @Property({
        nullable: true,
    })
    deleteDate: Date
}

export default OrderEntity
