import { ReaccionAbonadoModel } from "./reaccion-abonado.model";

export class ReaccionRegistroModel {
    id                  :number;
    evento              :string;
    evento_codigo       :string;
    evento_descripcion  :string;
    fecha               :string;
    hora                :string;
    estado_reaccion     :string;
    cc_motorizado       :string;
    num_solicitud       :string;
    abonado_id          :number;
    abonado             :ReaccionAbonadoModel;
    usuario             :any[];
    user_id             :number;
    estado              :string;
}

