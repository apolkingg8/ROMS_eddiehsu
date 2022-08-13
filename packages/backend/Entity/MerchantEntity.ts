import Merchant from "common/Klass/Merchant";
import {v4} from "uuid";
import Order from "common/Klass/Order";
import {Field, ID, ObjectType} from "type-graphql";
import OrderEntity from "./OrderEntity";
import {Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property} from "@mikro-orm/core";

@ObjectType()
@Entity()
class MerchantEntity {
    @Field(type => ID)
    @PrimaryKey()
    id: string

    @Field()
    @Property()
    name: string

    @Field()
    @Property()
    description: string

    @Field(()=> ([OrderEntity]))
    @OneToMany(()=> (OrderEntity), (order)=> (order.merchant))
    orders: Collection<OrderEntity> = new Collection<OrderEntity>(this)

    @Field()
    @Property({
        nullable: true,
    })
    createDate: Date

    @Field()
    @Property({
        nullable: true,
    })
    updateDate: Date

    @Field()
    @Property({
        nullable: true,
    })
    deleteDate: Date
}

export default MerchantEntity
