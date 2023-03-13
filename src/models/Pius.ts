import { v4 } from 'uuid';

class Piu {
    id: string;

    user_id: string;

    text: string;

    created_at: Date;

    updated_at: Date;

    constructor({
        user_id,
        text,
    }: Omit<Piu, 'id' | 'created_at' | 'updated_at'>) {
        this.id = v4();
        this.user_id = user_id;
        this.text = text;
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}

export default Piu;
