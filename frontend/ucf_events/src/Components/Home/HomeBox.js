import React from 'react';
import './homebox.css';
import ucfCampus from '../../Images/ucf-center-campus.jpg'

export class HomeBox extends React.Component {
    constructor(props) {
        super (props);
    }

    render() {
        return (
            <div id='home-box'>
                <div className='background-image-container'>
                    <picture className='background-image'>
                        <img
                        id='ucf-campus'
                        className='background-media-fit' src={ucfCampus}
                        alt='UCF campus fountain'
                        />
                    </picture>
                </div>
            </div>
        );
    }
}

export default HomeBox;