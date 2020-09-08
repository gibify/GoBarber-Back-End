import { Generated } from "typeorm"

import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUsersTokensRepository {
    Generated(user_id: string): Promise<UserToken>;
}
