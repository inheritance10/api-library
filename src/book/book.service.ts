import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Book } from './schemas/book.schema';
import * as mongoose from 'mongoose';
import { response } from 'express';
import { json } from 'stream/consumers';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>
    ) { }


    async findAll(): Promise<Book[]> {
        const books = await this.bookModel.find();
        return books;
    }

    async create(book: Book): Promise<Book> {
        const res = await this.bookModel.create(book);
        return res;
    }

    async findById(id: string): Promise<Book> {
        const book = await this.bookModel.findById(id);
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        return book;
    }

    async update(id: string, book: Book): Promise<{ success: boolean; message: string; book?: Book }> {
        const existingBook = await this.bookModel.findById(id);

        if (!existingBook) {
            throw new NotFoundException('Kitap bulunamadı');
        }

        try {
            const updatedBook = await this.bookModel.findByIdAndUpdate(id, book, {
                new: true,
                runValidators: true,
            });

            return {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                success: true,
                message: 'Kitap güncellendi',
                book: updatedBook,
            };
        } catch (error) {
            return {
                success: false,
                message: 'Kitap güncelleme işlemi başarısız',
            };
        }
    }

    async destroy (id:string) : Promise<Book>{
        const existingBook = await this.bookModel.findByIdAndDelete(id);
        return existingBook;
    }


}
