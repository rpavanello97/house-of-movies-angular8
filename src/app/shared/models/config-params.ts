import { NameValue } from "./name-value";

export interface ConfigParams {
    page?: number,
    numberOfRegisters?: number,
    fullTextSearch?: string,
    field?: NameValue,
}