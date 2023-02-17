import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Connection } from '../../Util/RestApi';
import Util from '../../Util/Util';
import './Skeleton.css';

export default function Skeleton({ children }) {
    const util = new Util();
    return (
        <div id="skeleton">
            <section>
                {children}
            </section>
            <footer></footer>
        </div>
    );
}