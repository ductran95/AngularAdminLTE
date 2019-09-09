import {ID} from '@datorama/akita';
import {UserResponseData} from '@app/core/stores/user/user.api-model';

export interface UserModel {
    id: ID;
    userName: string;
    fullName: string;
    password: string;
    email: string;
    address: string;
    phoneNumber: string;
}

/**
 * A factory function that creates User
 */
export function createUser(params: Partial<UserModel>) {
    return {} as UserModel;
}

export function createUserFromResponse(params: UserResponseData) {
    return {
        id: params.id,
        userName: params.userName,
        fullName: params.fullName,
        email: params.email,
        address: params.address,
        phoneNumber: params.phoneNumber,
    } as UserModel;
}
