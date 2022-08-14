import {Field, ID, ObjectType} from "type-graphql";
import OrderEntity from "./OrderEntity";
import {Collection, Entity, ManyToMany, PrimaryKey, Property} from "@mikro-orm/core";

@ObjectType()
@Entity({
    tableName: 'product',
})
class ProductEntity {
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
    @ManyToMany(()=> (OrderEntity))
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

export default ProductEntity
