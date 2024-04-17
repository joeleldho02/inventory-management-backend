import { Container } from "inversify";
import { GetUsersController } from "../libs/controller/get.users.controller";
import { UserRepository } from "../libs/repository/user.repository";
import { GetUsersUseCase } from "../libs/usecase/get.users.usecase";
import { INTERFACE_TYPE } from "../utils/interface/interface.types";
import { IUserRepository } from "../utils/interface/IUserRepository";
import { AddUserUseCase } from "../libs/usecase/add.user.usecase";
import { AddUserController } from "../libs/controller/add.user.controller";
import { DeleteUserController } from "../libs/controller/delete.user.controller";
import { DeleteUserUseCase } from "../libs/usecase/delete.user.usecase";
import { GetUserUseCase } from "../libs/usecase/get.user.useCase";
import { GetUserController } from "../libs/controller/get.user.controller";
import { UpdateUserUseCase } from "../libs/usecase/update.user.usecase";
import { UpdateUserController } from "../libs/controller/update.user.controller";
import { UpdateStatusController } from "../libs/controller/update.status.controller";

const container = new Container();

container.bind<IUserRepository>(INTERFACE_TYPE.UserRepository).to(UserRepository);
container.bind(INTERFACE_TYPE.AddUserController).to(AddUserController);
container.bind(INTERFACE_TYPE.AddUserUseCase).to(AddUserUseCase);
container.bind(INTERFACE_TYPE.GetUsersController).to(GetUsersController);
container.bind(INTERFACE_TYPE.GetUsersUseCase).to(GetUsersUseCase);
container.bind(INTERFACE_TYPE.DeleteUserController).to(DeleteUserController);
container.bind(INTERFACE_TYPE.DeleteUserUseCase).to(DeleteUserUseCase);
container.bind(INTERFACE_TYPE.GetUserController).to(GetUserController);
container.bind(INTERFACE_TYPE.GetUserUseCase).to(GetUserUseCase);
container.bind(INTERFACE_TYPE.UpdateUserController).to(UpdateUserController);
container.bind(INTERFACE_TYPE.UpdateUserUseCase).to(UpdateUserUseCase);
container.bind(INTERFACE_TYPE.UpdateStatusController).to(UpdateStatusController);

const addUserController = container.get<AddUserController>(INTERFACE_TYPE.AddUserController);
const getUsersController = container.get<GetUsersController>(INTERFACE_TYPE.GetUsersController);
const deleteUserController = container.get<DeleteUserController>(INTERFACE_TYPE.DeleteUserController);
const getUserController = container.get<GetUserController>(INTERFACE_TYPE.GetUserController);
const updateUserController = container.get<UpdateUserController>(INTERFACE_TYPE.UpdateUserController);
const updateStatusController = container.get<UpdateStatusController>(INTERFACE_TYPE.UpdateStatusController);

export { 
    getUsersController,
    addUserController,
    deleteUserController,
    getUserController,
    updateUserController,
    updateStatusController,
};