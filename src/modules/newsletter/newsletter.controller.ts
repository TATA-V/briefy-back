import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Request } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { IsPublic, Roles } from 'src/decorator/roles.decorator';
import { InsertOne, UpdateOne } from 'src/dto/newsletter.dto';
import { RolesEnum } from 'src/types/user';
import { Category } from 'src/types/category';
import { BasePaginate } from 'src/dto/base-paginate.dto';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Get()
  @IsPublic()
  getAll(@Query() query?: BasePaginate) {
    return this.newsletterService.getAll(query);
  }

  @Get()
  @IsPublic()
  getByCategory(@Query('category') category?: Category, @Query() query?: BasePaginate) {
    return this.newsletterService.getByCategory(category, query);
  }

  @Get(':id')
  @IsPublic()
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.newsletterService.getOne(id);
  }

  @Post()
  @Roles(RolesEnum.ADMIN)
  insertOne(@Body() body: InsertOne) {
    return this.newsletterService.insertOne(body);
  }

  @Patch(':id')
  @Roles(RolesEnum.ADMIN)
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateOne) {
    return this.newsletterService.updateOne(id, body);
  }

  @Delete(':id')
  @Roles(RolesEnum.ADMIN)
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.newsletterService.deleteOne(id);
  }

  @Get(':id/favorite')
  getFavorite(@Request() req) {
    return this.newsletterService.getFavorite(req.user.id);
  }

  @Post(':id/favorite')
  addFavorite(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.newsletterService.addFavorite(id, req.user.id);
  }

  @Delete(':id/favorite')
  deleteFavorite(@Param('id') id: number, @Request() req) {
    return this.newsletterService.deleteFavorite(id, req.user.id);
  }
}
