export interface Card{
    _id: string | undefined
    front: string
    back: string
}

export interface Deck {
    //name: string | undefined
    //color: string
    //cards: Card[] | never[]
    _id: string | undefined
    name: string
    backgroundColor: string
    backgroundImage: string
    cards: Card[] | never
}

export interface DeckCards extends Deck {
    currentCard: Card | null,
    progress: {total: number | null, current: number | null}
}

export interface AddCard{
    name: string,
    card: Card
}