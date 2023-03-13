import Piu from '../../models/Pius';
import PiuRepository from '../../repositories/PiusRepository';

interface Request {
    id: string;
    data: {
        text: string;
    };
}

class UpdatePiuService {
    private piusRepository: PiuRepository;

    constructor(piusRepository: PiuRepository) {
        this.piusRepository = piusRepository;
    }

    public execute({ id, data }: Request): Piu {
        const piuIndex = this.piusRepository.findIndexById(id);

        if (piuIndex < 0)
            throw Error('Nenhum piu com esse id foi encontrado.');
        
        const piuChars = data.text.length;
    
        if (piuChars === 0) throw Error('Não é possível enviar pius vazios.');
        
        if (piuChars > 140)
            throw Error(
                'Não é possível enviar pius com mais de 140 caracteres.'
            );

        const piu = this.piusRepository.update({
            index: piuIndex,
            data,
        });

        return piu;
    }
}

export default UpdatePiuService;
