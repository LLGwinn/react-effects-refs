import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './CardPile.css';
import Card from './Card';

function CardPile () {
    const [deck, setDeck] = useState(null);
    const [card, setCard] = useState(null);

    useEffect(function getDeck() {
        async function fetchDeck() {
            const deckResult = await axios.get(
                'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
            );
            setDeck(deckResult.data.deck_id);
        }
        fetchDeck();
    }, []);

    function handleClick() {
        async function fetchCard() {
            const cardResult = await axios.get(
                `http://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`
            );
            cardResult.data.remaining > 0 ?
                setCard(cardResult.data.cards[0])
                :
                alert('Error: No cards remaining!')
        }
        fetchCard(); 
    }

    return(
        <div>
            { card ?
                <Card image={card.image }/> : null
            } 
            <button onClick={handleClick}>Deal Card</button>
        </div>

    )
}

export default CardPile;