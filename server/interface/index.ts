export interface Img{
    _id: undefined
    title: string
    data: string
}

export interface Card{
    _id: string | undefined
    front: string
    back: string
    img: Img | undefined
}

export interface Deck {
    _id: string | undefined
    name: string
    backgroundColor: string
    backgroundImage: string
    options: Object,
    cards: Card[]
}