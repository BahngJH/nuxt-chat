import {sql} from '~/server/db/connection';

export type User = {
    id: string;
    password: string;
    name: string;
};

export const read = async () => {
    const result = await sql({
        query: 'select * from user'
    });

    return result as User[];
}

export const add = async (data: Pick<User, 'id' | 'password' | 'name'>) => {
    const result = await sql({
        query: `insert into user (id, password, name) 
                values (?,?,?)`,
        values: [data.id, data.password, data.name]
    }) as any;

    return result.length === 1 ? (result[0] as User) : null;
}

export const detail = async (id: string) => {
    const result = (await sql({
        query: `select 
                    id, 
                    password, 
                    name 
                from user 
                where id = ?`,
        values: [id]
    })) as any;

    return result.length === 1 ? (result[0] as User) : null;
}

export const login = async (data: Pick<User, 'id' | 'password'>) => {
    const result = (await sql({
        query: `select 
                    id,
                    name
                from user 
                where id = ? and password = ?`,
        values: [data.id, data.password]
    })) as any;

    return result.length === 1 ? (result[0] as User) : null;
}

export const update = async (id: string, data: Pick<User, 'name'>) => {
    await sql({
        query: `update user 
                    set name = ?
                where id = ?`,
        values: [data.name, id]
    });

    return await detail(id);
}

export const remove = async(id: string) => {
    await sql({
        query: 'delete from user where id = ?',
        values: [id]
    });
    return true;
}