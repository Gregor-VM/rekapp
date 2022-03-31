export interface Img{
    _id: undefined
    title: string
    data: string
}

export interface Audio{
    _id: undefined
    data: string
}

export interface Card{
    _id: string | undefined
    front: string
    back: string
    frontImg: Img | undefined
    backImg: Img | undefined
    frontAudio: Audio | undefined
    backAudio: Audio | undefined
}

export interface Deck {
    _id: string | undefined
    shared: {value: boolean, author: string} | undefined
    name: string
    backgroundColor: string
    backgroundImage: string
    options: Object | undefined,
    cards: Card[]
}

export interface DeckCards extends Deck {
    currentCard: Card | null,
    progress: {total: number | null, current: number | null}
}

export interface AddCard{
    name: string,
    card: Card
}

export interface User {
    username: string
    email: string
    profileImg: string | undefined
}


