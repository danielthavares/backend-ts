import { inject, injectable } from "inversify";
import { BaseResponse } from "../common/base-response";
import { CreateServiceOrderInput } from "../dtos/CreateServiceOrderInput";
import { ServiceOrder } from "../entities/ServiceOrder";
import { IServiceOrderService } from "../interfaces/services/IServiceOrderService";
import { ICreateServiceOrderUC } from "../interfaces/usecases/ICreateServiceOrderUC";
import { TYPES } from "../../infra/di/types";
import { EnumCategory } from "../common/enumerators";
import { Instalation } from "../entities/Instalation";
import { Maintenance } from "../entities/Maintenance";
import { Repair } from "../entities/Repair";

@injectable()
export class ServiceOrderService implements IServiceOrderService {
  constructor(
    @inject(TYPES.ICreateServiceOrderUC)
    private _createServiceOrderUC: ICreateServiceOrderUC
  ) {}
  async createServiceOrder(
    input: CreateServiceOrderInput
  ): Promise<BaseResponse> {
    let model = new ServiceOrder(
      input.code,
      input.detail,
      input.date
    );
    
    input.itens.forEach((i) => {
      switch (i.category) {
        case EnumCategory.INSTALATION:
          model.addItem(new Instalation(i.description, i.price))
          break;
        case EnumCategory.MAINTENANCE:
          model.addItem(new Maintenance(i.description, i.price))
          break;
        case EnumCategory.REPAIR:
          model.addItem(new Repair(i.description, i.price))
          break;  
        default:
      }
    });

    return await this._createServiceOrderUC.execute(model);
  }
}
