import {Field, ID, ObjectType} from "type-graphql";
import MerchantEntity from "./MerchantEntity";
import ProductEntity from "./ProductEntity";
import {Collection, Entity, Enum, ManyToMany, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import EnumOrderStatus from "common/Enum/EnumOrderStatus";

@ObjectType()
@Entity({
    tableName: 'order',
})
class OrderEntity {
    @Field(type => ID)
    @PrimaryKey()
    id: string

    @Field()
    @Property()
    name: string

    @Field()
    @Property()
    description: string

    @Field(()=> (EnumOrderStatus))
    @Enum(()=> (EnumOrderStatus))
    status: EnumOrderStatus

    @Field(()=> (MerchantEntity))
    @ManyToOne(()=> (MerchantEntity))
    merchant: MerchantEntity

    @Field(()=> ([ProductEntity]))
    @ManyToMany(()=> (ProductEntity))
    products: Collection<ProductEntity> = new Collection<ProductEntity>(this)

    @Field()
    @Property({persist: true})
    get productsCount(): number {
        return this.products.count()
    }

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
    completeDate: Date

    @Field({
        nullable: true,
    })
    @Property({
        nullable: true,
    })
    cancelDate: Date

    @Field({
        nullable: true,
    })
    @Property({
        nullable: true,
    })
    deleteDate: Date
}

export default OrderEntity
