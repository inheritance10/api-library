import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
  Req
} from "@nestjs/common";
import { Book } from './schemas/book.schema';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Response } from 'express';
import { UpdateBookDto } from './dto/update-book.dto';
import {Query as ExpressQuery} from  'express-serve-static-core';
import { AuthGuard } from "@nestjs/passport";
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}
  @Get()
  async getAllBook(@Query() query : ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query);
  }

    @Post()
    @UseGuards(AuthGuard())
    async createBook(
      @Body() book: CreateBookDto,
      @Req() req
    ): Promise<Book> {
        return this.bookService.create(book, req.user);
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

    @Delete(':id')
    async deleteBook(
        @Param('id')
        id: string
    ): Promise<Book>{
        return this.bookService.destroy(id);
    }
}
