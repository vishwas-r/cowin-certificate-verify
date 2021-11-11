import ZBar from './ZBar';
export declare class CppObject {
    protected ptr: number;
    protected inst: ZBar;
    protected constructor(ptr: number, inst: ZBar);
    protected checkAlive(): void;
    getPointer(): number;
}
