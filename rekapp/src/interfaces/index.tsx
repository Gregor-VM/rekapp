export interface Card{
    front: string
    back: string
}

export interface Deck {
    name: string | undefined
    color: string
    cards: Card[] | never[]
}

export interface AddCard{
    name: string,
    card: Card
}