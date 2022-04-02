import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {

    return (
        <div>
            <h3>The Official Pizza of Odin!</h3>

            <Link to='/pizza'>
                <button id='order-pizza'>Click to Order!</button>
            </Link>
        </div>
    )
}

export default Home;