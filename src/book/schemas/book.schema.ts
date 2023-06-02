import {Prop ,Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Category{
    ADVENTURE = "Adventure",
    CLASSIC = "Classic",
    CRIME = "Crime",
    FANTASTY = "Fantasty"
}

@Schema({
    timestamps: false
})
export class Book{
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    author: string;

    @Prop()
    price: number;

    @Prop()
    category: Category;
}

export const BookSchema =  SchemaFactory.createForClass(Book);