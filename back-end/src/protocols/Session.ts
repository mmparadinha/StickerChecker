export type SessionEntity = {
    id: number,
    userId: number,
    token: string
}

export type Session = Omit<SessionEntity, "id">