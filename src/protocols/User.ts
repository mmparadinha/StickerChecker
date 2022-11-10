export type UserEntity = {
    id: number,
    username: string,
    email: string,
    password: string
}

export type User = Omit<UserEntity, "id">