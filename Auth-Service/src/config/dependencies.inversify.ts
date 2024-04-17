import { Container } from "inversify";
import { INTERFACE_TYPE } from "../utils/interface/interface.types";
import { AdminRepository } from "../libs/repository/admin/admin.repository";
import { UserRepository } from "../libs/repository/user/user.repository";
import { AdminUseCase } from "../libs/usecase/admin/admin.usecase";
import { UserUseCase } from "../libs/usecase/user/user.usecase";
import { IAdminRepository } from "../libs/repository/admin/IAdminRepository";
import { AdminController } from "../libs/controller/admin/admin.controller";
import { UserController } from "../libs/controller/user/user.controller";
import { IAdminController } from "../libs/controller/admin/IAdminController";
import { IUserController } from "../libs/controller/user/IUserController";
import { IAdminUseCase } from "../libs/usecase/admin/IAdminUsecase";
import { IUserUsecase } from "../libs/usecase/user/IUserUsecase";
import { IUserRepository } from "../libs/repository/user/IUserRepository";

const container = new Container();

container.bind<IAdminRepository>(INTERFACE_TYPE.AdminRepository).to(AdminRepository);
container.bind<IUserRepository>(INTERFACE_TYPE.UserRepository).to(UserRepository);
container.bind<IUserUsecase>(INTERFACE_TYPE.UserUseCase).to(UserUseCase);
container.bind<IAdminUseCase>(INTERFACE_TYPE.AdminUseCase).to(AdminUseCase);
container.bind<IAdminController>(INTERFACE_TYPE.AdminController).to(AdminController);
container.bind<IUserController>(INTERFACE_TYPE.UserController).to(UserController);

const adminController = container.get<AdminController>(INTERFACE_TYPE.AdminController);
const userController = container.get<UserController>(INTERFACE_TYPE.UserController);

export {
    adminController,
    userController
}