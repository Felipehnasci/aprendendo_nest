
export abstract class HashingServiceProtocol {
    abstract hashPassword(password: string): Promise<string>;

    abstract comparePassword(password: string, hashedPassword: string): Promise<boolean>;
} 
