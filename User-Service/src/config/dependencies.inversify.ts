import { Container } from "inversify";
import { UserRepository } from "../libs/repository/user.repository";
import { INTERFACE_TYPE } from "../utils/interface/interface.types";
import { IUserController } from "../libs/controller/IUserController";
import { UserController } from "../libs/controller/user.controller";
import { IUserRepository } from "../libs/repository/IUserRepository";
import { IUserUsecase } from "../libs/usecase/IUserUsecase";
import { UserUseCase } from "../libs/usecase/user.usecase";

const container = new Container();

container.bind<IUserRepository>(INTERFACE_TYPE.UserRepository).to(UserRepository);
container.bind<IUserUsecase>(INTERFACE_TYPE.UserUseCase).to(UserUseCase);
container.bind<IUserController>(INTERFACE_TYPE.UserController).to(UserController);

const userController = container.get<UserController>(INTERFACE_TYPE.UserController);

export { userController };