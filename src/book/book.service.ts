import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import {Query} from 'express-serve-static-core';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private readonly bookModel: Model<Book>) {}

  async findAll(query: Query): Promise<Book[]> {
    //pagination
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword ? {
      title:{
        $regex : query.keyword,
        $options: 'i'
      }
    } : {}
    const books = await this.bookModel.find({...keyword}).limit(resPerPage).skip(skip);
    return books;
  }

  async create(book: Book): Promise<Book> {
    const createdBook = await this.bookModel.create(book);
    return createdBook;
  }

  async findById(id: string): Promise<Book> {

    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter correct id');
    }

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
      };
    } catch (error) {
      return {
        success: false,
        message: 'Kitap güncelleme işlemi başarısız',
     
      };
    }
  }

  async destroy(id: string): Promise<Book> {
    const existingBook = await this.bookModel.findByIdAndDelete(id);
    return existingBook;
  }
}
