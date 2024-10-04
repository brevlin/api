import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '../supabase/supabaseClient';
import { SupabaseClient as SupabaseClientType } from "@supabase/supabase-js";

@Injectable()
export class DatabaseService {
    private readonly supabase: SupabaseClientType;

    constructor(private readonly supabaseClient: SupabaseClient) {
        this.supabase = supabaseClient.getInstance();
    }

    async findUserByEmail(email: string) {
        const { data, error } = await this.supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error) {
            return error;
        }

        return data;
    }

    async findUserById(id: string) {
        const { data, error } = await this.supabase
            .from('users')
            .select('*')
            .eq('uid', id)
            .single();

        if (error) {
            return error;
        }

        return data;
    }

    async findUserByPhone(phone: string) {
        const { data, error } = await this.supabase
            .from('users')
            .select('*')
            .eq('phone', phone)
            .single();

        if (error) {
            return error;
        }

        return data;
    }

    // ! ___

    async selectAll(tableName: string) {
        const { data, error } = await this.supabase
            .from(tableName)
            .select('*');

        if (error) {
            return error;
        }

        return data;
    }

    async selectSpecificColumn(tableName: string, column: string) {
        const { data, error } = await this.supabase
            .from(tableName)
            .select(column);

        if (error) {
            return error;
        }

        return data;
    }

    async selectSpecificRow(tableName: string, columnName: string, rowName: string, rowValue: string) {
        const { data, error } = await this.supabase
            .from(tableName)
            .select(columnName)
            .eq(rowName, rowValue)
            .single()
            .throwOnError();

        if (error) {
            return error;
        }

        return data;
    }

    async insert(tableName: string, data: any) {
        const { error } = await this.supabase
            .from(tableName)
            .insert(data);

        if (error) {
            console.log('Error inserting data', error)
            return false;
        }

        return true
    }

    async insertAndSelect(tableName: string, query: any) {
        const session = await this.supabase.auth.getSession()
        console.log(session);

        const { data, error } = await this.supabase
            .from(tableName)
            .insert(query)
            .select();

        if (error) {
            console.log('Error inserting data', error)
            return false;
        }

        return data;
    }

    async insertBulk(tableName: string, data: any[]) {
        const { error } = await this.supabase
            .from(tableName)
            .insert(data);

        if (error) {
            console.log('Error inserting data', error)
            return false;
        }

        return true;
    }

    async update(tableName: string, data: any, columnName: string, columnValue: string) {
        const { error } = await this.supabase
            .from(tableName)
            .update(data)
            .eq(columnName, columnValue);

        if (error) {
            console.log('Error updating data', error)
            return false;
        }

        return true;
    }

    async updateAndSelect(tableName: string, data: any, columnName: string, columnValue: string) {
        const { data: updatedData, error } = await this.supabase
            .from(tableName)
            .update(data)
            .eq(columnName, columnValue)
            .select();

        if (error) {
            console.log('Error updating data', error)
            return false;
        }

        return updatedData;
    }

    async delete(tableName: string, columnName: string, columnValue: string) {
        const { error } = await this.supabase
            .from(tableName)
            .delete()
            .eq(columnName, columnValue);

        if (error) {
            console.log('Error deleting data', error)
            return false;
        }

        return true;
    }

    async deleteAndSelect(tableName: string, columnName: string, columnValue: string) {
        const { data, error } = await this.supabase
            .from(tableName)
            .delete()
            .eq(columnName, columnValue)
            .select();

        if (error) {
            console.log('Error deleting data', error)
            return false;
        }

        return data;
    }

    async deleteMultipleRecords(tableName: string, columnName: string, columnValues: string[]) {
        const { error } = await this.supabase
            .from(tableName)
            .delete()
            .in(columnName, columnValues);

        if (error) {
            console.log('Error deleting data', error)
            return false;
        }

        return true;
    }
}
