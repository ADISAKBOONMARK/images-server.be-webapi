import { VALIDATION } from '../../MainProperty';

import ResultDataProperty from '../../BusinessData/Result/ResultData/ResultDataProperty';

import Service from '../../Services/Image/ImageService';

class ImagesModel {
    async import(log, params) {
        const rules = {
            group: 'required|string',
            base64: 'required|string',
        };

        const resultValidate = await VALIDATION.compare(params, rules);

        const resultData = new ResultDataProperty();

        if (resultValidate.status === true) {
            const service = new Service();
            const result = await service.import(log, params);
            await resultData.set(result);
        } else {
            await resultData.badRequest({ developerMoreInfo: resultValidate.message });
        }

        return resultData;
    }

    async remove(log, params) {
        const rules = {
            group: 'required|string',
            id: 'required|string',
        };

        const resultValidate = await VALIDATION.compare(params, rules);

        const resultData = new ResultDataProperty();

        if (resultValidate.status === true) {
            const service = new Service();
            const result = await service.remove(log, params);
            await resultData.set(result);
        } else {
            await resultData.badRequest({ developerMoreInfo: resultValidate.message });
        }

        return resultData;
    }
}

export default ImagesModel;
