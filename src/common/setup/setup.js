import { AuthController } from '../../app/auth';
import { ExampleController } from '../../app/example';
import { databaseService } from '../database';

const registerControllers = app => {
    AuthController(app);
    ExampleController(app);
};

export const setupApp = async app => {
    await databaseService();

    registerControllers(app);
}
