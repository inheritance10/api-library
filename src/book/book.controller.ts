import { Controller, Get, Post, Body, Param, Put, Res, NotFoundException } from '@nestjs/common';
import { Book } from './schemas/book.schema';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Response } from 'express';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BookController {
    constructor(private bookService: BookService) { }
    @Get()
    async getAllBook(): Promise<Book[]> {
        return this.bookService.findAll();
    }

    @Post()
    async createBook(@Body() book: CreateBookDto): Promise<Book> {
        return this.bookService.create(book);
    }

    @Get(':id')
    async findBook(
        @Param('id')
        id: string
    ): Promise<Book> {

        return this.bookService.findById(id);
    }

    @Put(':id')
    async updateBook(
        @Param('id') id: string,
        @Body() book: UpdateBookDto
    ): Promise<{ success: boolean; message: string; book?: Book }> {
        try {
            const updatedBook = await this.bookService.update(id, book);
            return {
                success: true,
                message: 'Kitap güncellendi',
                book: updatedBook.book,
            };
        } catch (error) {
            return {
                success: false,
                message: 'Kitap güncelleme işlemi başarısız',
            };
        }
    }


}
