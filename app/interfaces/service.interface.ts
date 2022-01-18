
export interface ServiceInterface<T>{
    findAll(): Promise<T[]>;
    find(id: number): Promise<T>;
    create(Object: T): Promise<T>;
    update(object: T): Promise<T>;
    delete(object: T): Promise<T>;
}