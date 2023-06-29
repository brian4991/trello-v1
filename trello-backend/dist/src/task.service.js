"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const config_1 = require("@nestjs/config");
let TaskService = exports.TaskService = class TaskService {
    constructor(taskModel, configService) {
        this.taskModel = taskModel;
        this.configService = configService;
    }
    async getAllTasks() {
        return this.taskModel.find().exec();
    }
    async getTaskById(_id) {
        return this.taskModel.findById(_id).exec();
    }
    async createTask(title, status) {
        try {
            console.log('Received title:', title);
            console.log('Received status:', status);
            const task = new this.taskModel({ title, status });
            console.log('Task object:', task);
            const createdTask = await task.save();
            return createdTask;
        }
        catch (error) {
            console.error('Error creating task:', error);
            throw error;
        }
    }
    async updateTask(id, title, status) {
        try {
            const task = await this.taskModel.findById(id);
            if (!task) {
                console.log('Received ID:', id);
                throw new common_1.NotFoundException(`Task with id ${id} not found`);
            }
            task.title = title;
            task.status = status;
            const updatedTask = await task.save();
            return updatedTask;
        }
        catch (error) {
            console.log('Received ID:', id);
            throw new common_1.NotFoundException(`Task with id ${id} not found`);
        }
    }
    async deleteTaskById(id) {
        const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();
        if (!deletedTask) {
            throw new common_1.NotFoundException(`Task with id ${id} not found`);
        }
    }
};
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Task')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], TaskService);
//# sourceMappingURL=task.service.js.map