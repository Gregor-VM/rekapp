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
    shared: {value: boolean, author: string}
    name: string
    backgroundColor: string
    backgroundImage: string
    options: Object,
    cards: Card[]
}