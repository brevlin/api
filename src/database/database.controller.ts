import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { DatabaseService } from "./database.service";

@Controller('database')
export class DatabaseController {
    constructor(private readonly databaseService: DatabaseService) {}

    @Post('select-all')
    async selectAll(@Body('tableName') tableName: string) {
        return this.databaseService.selectAll(tableName);
    }

    @Post('select-specific-column')
    async selectSpecificColumn(@Body('tableName') tableName: string, @Body('column') column: string) {
        return this.databaseService.selectSpecificColumn(tableName, column);
    }

    @Post('select-specific-row')
    async selectSpecificRow(@Body('tableName') tableName: string, @Body('columnName') columnName: string, @Body('rowName') rowName: string, @Body('rowValue') rowValue: string) {
        return this.databaseService.selectSpecificRow(tableName, columnName, rowName, rowValue);
    }

    @Post('insert')
    @HttpCode(204)
    async insert(@Body('tableName') tableName: string, @Body('data') data: any) {
        return this.databaseService.insert(tableName, data);
    }

    @Post('update')
    @HttpCode(204)
    async update(@Body('tableName') tableName: string, @Body('data') data: any, @Body('rowName') rowName: string, @Body('rowValue') rowValue: string) {
        return this.databaseService.update(tableName, data, rowName, rowValue);
    }

    @Post('delete')
    @HttpCode(204)
    async delete(@Body('tableName') tableName: string, @Body('rowName') rowName: string, @Body('rowValue') rowValue: string) {
        return this.databaseService.delete(tableName, rowName, rowValue);
    }

    @Post('insert-and-select')
    async insertAndSelect(@Body('tableName') tableName: string, @Body('data') data: any) {
        return this.databaseService.insertAndSelect(tableName, data);
    }

    @Post('insert-bulk')
    @HttpCode(204)
    async insertBulk(@Body('tableName') tableName: string, @Body('data') data: any) {
        return this.databaseService.insertBulk(tableName, data);
    }

    @Post('update-and-select')
    async updateAndSelect(@Body('tableName') tableName: string, @Body('data') data: any, @Body('rowName') rowName: string, @Body('rowValue') rowValue: string) {
        return this.databaseService.updateAndSelect(tableName, data, rowName, rowValue);
    }

    @Post('delete-and-select')
    async deleteAndSelect(@Body('tableName') tableName: string, @Body('rowName') rowName: string, @Body('rowValue') rowValue: string) {
        return this.databaseService.deleteAndSelect(tableName, rowName, rowValue);
    }

    @Post('delete-multiple-records')
    @HttpCode(204)
    async deleteMultipleRecords(@Body('tableName') tableName: string, @Body('rowName') rowName: string, @Body('rowValues') rowValues: string[]) {
        return this.databaseService.deleteMultipleRecords(tableName, rowName, rowValues);
    }
}