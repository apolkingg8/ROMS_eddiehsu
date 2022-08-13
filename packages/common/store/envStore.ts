import * as process from "process";

export class EnvStore {
    get envName(): string {
        return process.env['NODE_ENV'] ?? 'development'
    }
}

export default new EnvStore()
