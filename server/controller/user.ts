import { H3Event } from 'h3';
import * as userModel from '~/server/model/user';

export const read = async () => {
    try {
        const result = await userModel.read();
        
        return {
            data: result
        }
    } catch {
        throw createError ({
            statusCode: 500,
            statusMessage: 'something went wrong'
        });
    }
}

export const add = async (evt: H3Event) => {
    try {
        const body = await readBody(evt);
        const result = await userModel.add({
            id: body.id,
            name: body.name,
            password: body.password
        });
        
        return {
            data: result
        }
    } catch {
        throw createError ({
            statusCode: 500,
            statusMessage: 'something went wrong'
        });
    }
}

export const detail = async (evt: H3Event) => {
    try {
        const result = await userModel.detail(evt.context.params?.id as string);
        
        return {
            data: result
        }
    } catch {
        throw createError ({
            statusCode: 500,
            statusMessage: 'something went wrong'
        });
    }
}

export const update = async (evt: H3Event) => {
    try {
        const body = await readBody(evt);
        const result = await userModel.update(evt.context.params?.id as string, {
            name: body.name
        });
        
        return {
            data: result
        }
    } catch {
        throw createError ({
            statusCode: 500,
            statusMessage: 'something went wrong'
        });
    }
}

export const remove = async (evt: H3Event) => {
    try {
        const result = await userModel.remove(evt.context.params?.id as string);
        
        return {
            data: result
        }
    } catch {
        throw createError ({
            statusCode: 500,
            statusMessage: 'something went wrong'
        });
    }
}