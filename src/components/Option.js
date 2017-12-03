import React from 'react';

const Option = (props) => (
  <div className="option">
    <p className="option__text">{props.count}. {props.value}</p>
    <button
      className="button button--link"
      onClick={(e) => props.handleDeleteOption(props.value)}
    >Remove</button>
  </div>
);
export default Option;