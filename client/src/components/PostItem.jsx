import React from 'react';
import PropTypes from 'prop-types';
import {
    Tooltip
} from 'reactstrap';
import moment from 'moment';

import {getMoodIcon} from 'utilities/weather.js';

import './PostItem.css';

export default class PostItem extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        mood: PropTypes.string,
        text: PropTypes.string,
        clearVotes: PropTypes.number,
        cloudsVotes: PropTypes.number,
        drizzleVotes: PropTypes.number,
        rainVotes: PropTypes.number,
        thunderVotes: PropTypes.number,
        snowVotes: PropTypes.number,
        windyVotes: PropTypes.number,
        onVote: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            tooltipOpen: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleTooltipToggle = this.handleTooltipToggle.bind(this);
        this.handleVote = this.handleVote.bind(this);
    }

    render() {
        const {id, mood, text, title, ts, clearVotes, cloudsVotes, drizzleVotes, rainVotes, thunderVotes, snowVotes, windyVotes} = this.props;
        const {tooltipOpen} = this.state;

        return (
            // <div className='post-item d-flex flex-column' onClick={this.handleClick}>
            <div className='post-item d-flex flex-column' onClick={this.handleClick}>
                {/* <div className='post d-flex'> */}
                <div className='post d-flex'>
                    <div className='mood'><i className={getMoodIcon(mood)}></i></div>
                    <div className='wrap'>
                    {/* <div className='wrap'> */}
                        <div className='title'>{title}</div>
                        <div className='text'>{text}</div>
                        <div className='ts'>{moment(ts * 1000).calendar()}</div>
                    </div>
                </div>
                <div className='vote d-flex justify-content-end'>
                    <div className='vote-results'>
                        {clearVotes > 0 && (<span><i className={"fa fa-thumbs-up"}></i>&nbsp;{clearVotes}&nbsp;&nbsp;</span>)}
                        {cloudsVotes > 0 && <span><i className={"fa fa-thumbs-down"}></i>&nbsp;{cloudsVotes}&nbsp;&nbsp;</span>}
                        {/* {drizzleVotes > 0 && <span><i className={getMoodIcon('Drizzle')}></i>&nbsp;{drizzleVotes}&nbsp;&nbsp;</span>}
                        {rainVotes > 0 && <span><i className={getMoodIcon('Rain')}></i>&nbsp;{rainVotes}&nbsp;&nbsp;</span>}
                        {thunderVotes > 0 && <span><i className={getMoodIcon('Thunder')}></i>&nbsp;{thunderVotes}&nbsp;&nbsp;</span>}
                        {snowVotes > 0 && <span><i className={getMoodIcon('Snow')}></i>&nbsp;{snowVotes}&nbsp;&nbsp;</span>}
                        {windyVotes > 0 && <span><i className={getMoodIcon('Windy')}></i>&nbsp;{windyVotes}&nbsp;&nbsp;</span>} */}
                    </div>
                    <div className='vote-plus'>
                        <i id={`post-item-vote-${id}`} className='fa fa-plus'></i>
                    </div>
                </div>
                <Tooltip placement='left' isOpen={tooltipOpen} autohide={false} target={`post-item-vote-${id}`} toggle={this.handleTooltipToggle}>
                    <i className={`vote-tooltip fa fa-thumbs-up`} onClick={() => this.handleVote('Clear')}></i>&nbsp;
                    <i className={`vote-tooltip fa fa-thumbs-down`} onClick={() => this.handleVote('Clouds')}></i>&nbsp;
                    {/* <i className={`vote-tooltip ${getMoodIcon('Drizzle')}`} onClick={() => this.handleVote('Drizzle')}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Rain')}`} onClick={() => this.handleVote('Rain')}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Thunder')}`} onClick={() => this.handleVote('Thunder')}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Snow')}`} onClick={() => this.handleVote('Snow')}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Windy')}`} onClick={() => this.handleVote('Windy')}></i> */}
                </Tooltip>
            </div>
        );
    }

    handleClick() {
        this.setState({
          tooltipOpen: true
        });
    }

    handleTooltipToggle() {
        this.setState((prevState, props) => ({
            tooltipOpen: !prevState.tooltipOpen
        }));
    }

    handleVote(vote) {
        this.props.onVote(this.props.id, vote);
        this.setState({
          tooltipOpen: false
        });
    }
}
