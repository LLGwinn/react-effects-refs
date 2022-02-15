import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import './CardPile.css';
import Card from './Card';

function CardPile () {
    const [deck, setDeck] = useState(null);
    const [card, setCard] = useState(null);
    const [autoDeal, setAutoDeal] = useState(false);
    const intervalId = useRef();

    // Gets a new shuffled deck one time
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
        setAutoDeal(autoDeal => !autoDeal);
    }

    useEffect(function startAutoDeal() {
        // Gets a new card every time autoDeal state changes to true, every 1000 ms
        if (autoDeal === true) {
            intervalId.current = setInterval( () => {

                async function fetchCard() {
                        const cardResult = await axios.get(
                            `http://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`
                        );
                        
                        if (cardResult.data.remaining >= 0 && !cardResult.data.error) {
                            setCard(cardResult.data.cards[0])
                        } else {
                            alert('Error: no cards remaining!');
                            setAutoDeal(false); 
                        }            
                }

                fetchCard();
            }, 1000);
        }

        return function cleanUpInterval() {
            clearInterval(intervalId.current);
        };

    }, [autoDeal]);

    return(
        <div>
            { card ?
                <Card image={card.image }/> : null
            }
            { autoDeal ?
                <button onClick={handleClick}>Stop!</button>
                :
                <button onClick={handleClick}>Start Dealing!</button>
            }
        </div>

    )
}

export default CardPile;