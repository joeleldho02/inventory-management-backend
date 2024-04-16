import { Container } from "inversify";
import { INTERFACE_TYPE } from "../utils/interface/interface.types";
import { AdminRepository } from "../libs/repository/admin.repository";
import { UserRepository } from "../libs/repository/user.repository";
import { UserLoginUseCase } from "../libs/usecase/user/user.login.usecase";
import { UserLoginController } from "../libs/controller/user/user.login.controller";
import { UserLogoutController } from "../libs/controller/user/user.logout.controller";
import { AdminLoginUseCase } from "../libs/usecase/admin/admin.login.usecase";
import { AdminLoginController } from "../libs/controller/admin/admin.login.controller";
import { AdminLogoutController } from "../libs/controller/admin/admin.logout.controller";
import { UserResetPassController } from "../libs/controller/user/user.resetPass.controller";
import { AdminResetPassUseCase } from "../libs/usecase/admin/admin.resetPass.usecase";
import { UserResetPassUseCase } from "../libs/usecase/user/user.resetpass.usecase";
import { AdminResetPassController } from "../libs/controller/admin/admin.restPass.controller";

const container = new Container();

container.bind(INTERFACE_TYPE.AdminRepository).to(AdminRepository);
container.bind(INTERFACE_TYPE.UserRepository).to(UserRepository);
container.bind(INTERFACE_TYPE.UserLoginUseCase).to(UserLoginUseCase);
container.bind(INTERFACE_TYPE.UserLoginController).to(UserLoginController);
container.bind(INTERFACE_TYPE.UserLogoutController).to(UserLogoutController);
container.bind(INTERFACE_TYPE.AdminLoginUseCase).to(AdminLoginUseCase);
container.bind(INTERFACE_TYPE.AdminLoginController).to(AdminLoginController);
container.bind(INTERFACE_TYPE.AdminLogoutController).to(AdminLogoutController);
container.bind(INTERFACE_TYPE.UserResetPassUseCase).to(UserResetPassUseCase);
container.bind(INTERFACE_TYPE.UserResetPassController).to(UserResetPassController);
container.bind(INTERFACE_TYPE.AdminResetPassUseCase).to(AdminResetPassUseCase);
container.bind(INTERFACE_TYPE.AdminResetPassController).to(AdminResetPassController);

const adminLoginController = container.get<AdminLoginController>(INTERFACE_TYPE.AdminLoginController);
const adminLogoutController = container.get<AdminLogoutController>(INTERFACE_TYPE.AdminLogoutController);
const userLoginController = container.get<UserLoginController>(INTERFACE_TYPE.UserLoginController);
const userLogoutController = container.get<UserLogoutController>(INTERFACE_TYPE.UserLogoutController);
const userResetPassController = container.get<UserResetPassController>(INTERFACE_TYPE.UserResetPassController);
const adminResetPassController = container.get<AdminResetPassController>(INTERFACE_TYPE.AdminResetPassController);

export {
    adminLoginController,
    adminLogoutController,
    userLoginController,
    userLogoutController,
    adminResetPassController,
    userResetPassController,
}