import Piu from '../../models/Pius';
import PiuRepository from '../../repositories/PiusRepository';

interface Request {
    id: string;
}

class GetPiuService {
    private piusRepository: PiuRepository;

    constructor(piusRepository: PiuRepository) {
        this.piusRepository = piusRepository;
    }

    public execute({ id }: Request): Piu {
        const piuIndex = this.piusRepository.findIndexById(id);

        if (piuIndex < 0) throw Error('Nenhum piu com esse id foi encontrado.');
        
        return this.piusRepository.get({ index: piuIndex });
    }
}

export default GetPiuService;
